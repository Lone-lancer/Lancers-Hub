import List from "@mui/material/List";
import ListItem from "@mui/material/List";
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
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <ul
      style={{
        listStyle: "none", // Remove bullet points
        padding: "20px", // Add padding around the menu
        margin: "0", // Remove default margin
        backgroundColor: "#333", // Dark background for visibility
        color: "#fff", // White text
        height: "100vh", // Full height of the screen
        overflowY: "auto", // Scrollable if content exceeds height
      }}
    >
      {menus.map((item, mn) => (
        <ListItem
          key={mn}
          style={{
            padding: "15px 0", // Add space between items
            borderBottom: "1px solid rgba(255, 255, 255, 0.2)", // Subtle separator
          }}
        >
          <Link
            onClick={ClickHandler}
            to={item.link}
            style={{
              color: "#fff", // White text
              textDecoration: "none", // Remove underline
              fontSize: "16px", // Font size for readability
              fontWeight: "bold", // Bold text
              display: "block", // Make the link occupy full width
              transition: "color 0.3s ease", // Smooth hover effect
            }}
          >
            {item.title}
          </Link>
        </ListItem>
      ))}
    </ul>
  );
};

export default MobileMenu;
