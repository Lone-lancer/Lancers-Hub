import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/List";

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
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <ul className="main_menu_list clearfix">
      {menus.map((item, mn) => (
        <ListItem key={mn}>
          <Link onClick={ClickHandler} to={item.link}>
            {item.title}
          </Link>
        </ListItem>
      ))}
    </ul>
  );
};

export default MobileMenu;
