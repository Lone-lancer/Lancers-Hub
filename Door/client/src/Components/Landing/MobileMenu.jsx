import { Fragment, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/List";
import Collapse from "@mui/material/Collapse";
import { Link } from "react-router-dom";

const menus = [
  {
    id: 1,
    title: "Login",
    link: "/login",
  },
  {
    id: 2,
    title: "Register",
    link: "/register",
  },
  {
    id: 3,
    title: "Get Started",
    link: "/offices",
  },
];

const MobileMenu = () => {
  const [openId, setOpenId] = useState(0);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <ul className="main_menu_list clearfix">
      {menus.map((item, mn) => {
        return (
          <ListItem className={item.id === openId ? "active" : null} key={mn}>
            {item.submenu ? (
              <Fragment>
                <p onClick={() => setOpenId(item.id === openId ? 0 : item.id)}>
                  {item.title}
                  <i
                    className={item.id === openId ? "ti-minus" : "ti-plus"}
                  ></i>
                </p>
                <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                  <List className="subMenu">
                    <Fragment>
                      {item.submenu.map((submenu, i) => {
                        return (
                          <ListItem key={i}>
                            <Link
                              onClick={ClickHandler}
                              className="active"
                              to={submenu.link}
                            >
                              {submenu.title}
                            </Link>
                          </ListItem>
                        );
                      })}
                    </Fragment>
                  </List>
                </Collapse>
              </Fragment>
            ) : (
              <Link className="active" to={item.link}>
                {item.title}
              </Link>
            )}
          </ListItem>
        );
      })}
    </ul>
  );
};

export default MobileMenu;
