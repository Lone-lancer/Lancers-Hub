import { useEffect, useRef, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import classNames from "classnames";

// helpers
import { getManagerMenuItems } from "../helpers/menu";

// components
import Scrollbar from "../Components/Dashboard/Scrollbar";

import AppMenu from "./Menu";

// images
import profileImg from "../assets/images/users/user-1.jpg";
import { logo } from "../assets/images";

/* user box */
const UserBox = () => {
  // get the profilemenu
  const ProfileMenus = [
    {
      label: "My Account",
      icon: "fe-user",
      redirectTo: "/apps/contacts/profile",
    },
    {
      label: "Settings",
      icon: "fe-settings",
      redirectTo: "#",
    },
    {
      label: "Lock Screen",
      icon: "fe-lock",
      redirectTo: "/auth/lock-screen",
    },
  ];

  const [dropdownOpen, setDropdownOpen] = useState(false);

  /*
   * toggle dropdown
   */
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="user-box flex px-5 py-4 flex-col justify-center items-center text-center">
      <Link to={"/"}>
        <img src={logo} />
      </Link>
      <Dropdown show={dropdownOpen} onToggle={toggleDropdown}>
        <Dropdown.Toggle
          id="dropdown-notification"
          to="#"
          as={Link}
          onClick={toggleDropdown}
          className="user-name text-lg font-semibold mt-2 mb-1 block"
        >
          Manager
        </Dropdown.Toggle>
        <Dropdown.Menu className="user-pro-dropdown">
          <div onClick={toggleDropdown}>
            {(ProfileMenus || []).map((item, index) => {
              return (
                <Link
                  to={item.redirectTo}
                  className="dropdown-item notify-item flex items-center"
                  key={index + "-profile-menu"}
                >
                  <i className={classNames(item.icon, "me-2")}></i>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>
        </Dropdown.Menu>
      </Dropdown>
      <p className="text-gray-600 left-user-info">Manager</p>

      <ul className="flex space-x-4">
        <li>
          <Link to="#" className="text-gray-600 left-user-info">
            <i className="mdi mdi-cog"></i>
          </Link>
        </li>

        <li>
          <Link to="#">
            <i className="mdi mdi-power"></i>
          </Link>
        </li>
      </ul>
    </div>
  );
};

/* sidebar content */
const SideBarContent = () => {
  return (
    <>
      <UserBox />

      <div id="sidebar-menu">
        <AppMenu menuItems={getManagerMenuItems()} />
      </div>

      <div className="clearfix" />
    </>
  );
};

const ManagerSidebar = ({ isCondensed }) => {
  const menuNodeRef = useRef(null);

  const handleOtherClick = (e) => {
    if (
      menuNodeRef &&
      menuNodeRef.current &&
      menuNodeRef.current.contains(e.target)
    )
      return;
    // else hide the menubar
    if (document.body) {
      document.body.classList.remove("sidebar-enable");
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOtherClick, false);

    return () => {
      document.removeEventListener("mousedown", handleOtherClick, false);
    };
  }, []);

  return (
    <div className="left-side-menu" ref={menuNodeRef}>
      {!isCondensed && (
        <Scrollbar style={{ maxHeight: "100%" }}>
          <SideBarContent />
        </Scrollbar>
      )}
      {isCondensed && <SideBarContent />}
    </div>
  );
};

ManagerSidebar.defaultProps = {
  isCondensed: false,
};

export default ManagerSidebar;
