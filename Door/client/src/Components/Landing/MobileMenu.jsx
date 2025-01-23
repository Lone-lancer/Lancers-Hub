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
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px 10px", // Padding around the menu
        backgroundColor: "#fff", // White background
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow for better visibility
        position: "fixed", // Fix it at the top
        width: "100%", // Full width
        zIndex: 1000, // Ensure it's above other elements
      }}
    >
      {menus.map((item, index) => (
        <Link
          key={index}
          onClick={ClickHandler}
          to={item.link}
          style={{
            textDecoration: "none", // Remove underline
            padding: "5px 10px", // Add padding to buttons
            margin: "0 5px", // Space between buttons
            backgroundColor: "#4CAF50", // Green background
            color: "#fff", // White text
            borderRadius: "5px", // Rounded corners
            fontSize: "14px", // Small size for mobile
            fontWeight: "bold", // Bold text
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Add shadow for button depth
            display: "inline-block",
            minWidth: "70px", // Ensure buttons are wide enough
          }}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
