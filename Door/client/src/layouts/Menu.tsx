import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Collapse } from 'react-bootstrap';
import classNames from 'classnames';

//helpers
import { findAllParent, findMenuItem } from '../helpers/menu';

// constants
import { MenuItemTypes } from '../constants/menu';

type SubMenus = {
    item: MenuItemTypes;
    linkClassName?: string;
    subMenuClassNames?: string;
    activeMenuItems?: Array<string>;
    toggleMenu?: (item: MenuItemTypes, status: boolean) => void;
    className?: string;
};

const MenuItemWithChildren = ({ item, linkClassName, subMenuClassNames, activeMenuItems, toggleMenu }: SubMenus) => {
    const [open, setOpen] = useState<boolean>(activeMenuItems!.includes(item.key));

    useEffect(() => {
        setOpen(activeMenuItems!.includes(item.key));
    }, [activeMenuItems, item]);

    const toggleMenuItem = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        e.preventDefault();
        const status = !open;
        setOpen(status);
        if (toggleMenu) toggleMenu(item, status);
        return false;
    };

    return (
        <li className={classNames('side-nav-item', { 'menuitem-active': open })}>
            <Link
                to="#"
                onClick={toggleMenuItem}
                data-menu-key={item.key}
                aria-expanded={open}
                className={classNames(
                    'has-arrow',
                    'side-sub-nav-link',
                    'transition-all duration-200',
                    'flex items-center gap-2 py-2 px-4 rounded-lg',
                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                    linkClassName,
                    {
                        'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300': 
                            activeMenuItems!.includes(item.key),
                    }
                )}
            >
                {item.icon && <i className={classNames(item.icon, 'text-lg')} />}
                <span className="flex-grow">{item.label}</span>
                {item.badge ? (
                    <span className={classNames(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        `bg-${item.badge.variant}-100 text-${item.badge.variant}-600`,
                        'dark:bg-${item.badge.variant}-900 dark:text-${item.badge.variant}-300'
                    )}>
                        {item.badge.text}
                    </span>
                ) : (
                    <span className={classNames(
                        'transform transition-transform duration-200',
                        { 'rotate-90': open }
                    )}>
                        <i className="uil-angle-right text-lg" />
                    </span>
                )}
            </Link>
            <Collapse in={open}>
                <div className="pl-4">
                    <ul className={classNames(
                        subMenuClassNames,
                        'space-y-1 py-2'
                    )}>
                        {(item.children || []).map((child, i) => {
                            return (
                                <React.Fragment key={i}>
                                    {child.children ? (
                                        <>
                                            {/* parent */}
                                            <MenuItemWithChildren
                                                item={child}
                                                linkClassName={activeMenuItems!.includes(child.key) ? 'active' : ''}
                                                activeMenuItems={activeMenuItems}
                                                subMenuClassNames="side-nav-third-level"
                                                toggleMenu={toggleMenu}
                                            />
                                        </>
                                    ) : (
                                        <>
                                            {/* child */}
                                            <MenuItem
                                                item={child}
                                                className={
                                                    activeMenuItems!.includes(child.key) ? 'menuitem-active' : ''
                                                }
                                                linkClassName={activeMenuItems!.includes(child.key) ? 'active' : ''}
                                            />
                                        </>
                                    )}
                                </React.Fragment>
                            );
                        })}
                    </ul>
                </div>
            </Collapse>
        </li>
    );
};

const MenuItem = ({ item, className, linkClassName }: SubMenus) => {
    return (
        <li className={classNames('side-nav-item', className)}>
            <Link
                to={item.url!}
                target={item.target}
                className={classNames(
                    'flex items-center gap-2 py-2 px-4 rounded-lg',
                    'transition-all duration-200',
                    'hover:bg-gray-100 dark:hover:bg-gray-800',
                    {
                        'bg-primary-50 dark:bg-primary-900 text-primary-600 dark:text-primary-300': className?.includes('menuitem-active')
                    },
                    linkClassName
                )}
                data-menu-key={item.key}
            >
                {item.icon && <i className={classNames(item.icon, 'text-lg')} />}
                <span className="flex-grow">{item.label}</span>
                {item.badge && (
                    <span className={classNames(
                        'px-2 py-1 text-xs font-medium rounded-full',
                        `bg-${item.badge.variant}-100 text-${item.badge.variant}-600`,
                        'dark:bg-${item.badge.variant}-900 dark:text-${item.badge.variant}-300'
                    )}>
                        {item.badge.text}
                    </span>
                )}
            </Link>
        </li>
    );
};

/**
 * Renders the application menu
 */
type AppMenuProps = {
    menuItems: MenuItemTypes[];
};

const AppMenu = ({ menuItems }: AppMenuProps) => {
    let location = useLocation();

    const menuRef: any = useRef(null);

    const [activeMenuItems, setActiveMenuItems] = useState<Array<string>>([]);

    /*
     * toggle the menus
     */
    const toggleMenu = (menuItem: MenuItemTypes, show: boolean) => {
        if (show) setActiveMenuItems([menuItem['key'], ...findAllParent(menuItems, menuItem)]);
    };

    /**
     * activate the menuitems
     */
    const activeMenu = useCallback(() => {
        const div = document.getElementById('side-menu');
        let matchingMenuItem = null;

        if (div) {
            let items: any = div.getElementsByClassName('side-nav-link-ref');
            for (let i = 0; i < items.length; ++i) {
                if (location.pathname === items[i].pathname) {
                    matchingMenuItem = items[i];
                    break;
                }
            }

            if (matchingMenuItem) {
                const mid = matchingMenuItem.getAttribute('data-menu-key');
                const activeMt = findMenuItem(menuItems, mid);
                if (activeMt) {
                    setActiveMenuItems([activeMt['key'], ...findAllParent(menuItems, activeMt)]);
                }
            }
        }
    }, [location, menuItems]);

    useEffect(() => {
        activeMenu();
    }, [activeMenu]);

    return (
        <ul className="space-y-2 py-4 px-3" ref={menuRef} id="side-menu">
            {(menuItems || []).map((item, idx) => {
                return (
                    <React.Fragment key={idx}>
                        {item.isTitle ? (
                            <li
                                className={classNames('menu-title', {
                                    'mt-2': idx !== 0,
                                })}
                            >
                                {item.label}
                            </li>
                        ) : (
                            <>
                                {item.children ? (
                                    <MenuItemWithChildren
                                        item={item}
                                        toggleMenu={toggleMenu}
                                        subMenuClassNames="nav-second-level"
                                        activeMenuItems={activeMenuItems}
                                        linkClassName="side-nav-link"
                                    />
                                ) : (
                                    <MenuItem
                                        item={item}
                                        linkClassName="side-nav-link"
                                        className={activeMenuItems!.includes(item.key) ? 'menuitem-active' : ''}
                                    />
                                )}
                            </>
                        )}
                    </React.Fragment>
                );
            })}
        </ul>
    );
};

export default AppMenu;
