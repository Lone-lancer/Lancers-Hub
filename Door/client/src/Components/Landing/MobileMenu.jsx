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
        padding: "10px 20px",
        backgroundColor: "#fff", // Optional: Set a white background
      }}
    >
      <Link to="/">
        <img
          src="logo.png" // Replace with your logo URL
          alt="Logo"
          style={{
            height: "40px",
            width: "auto",
          }}
        />
      </Link>
      <button
        style={{
          background: "none",
          border: "none",
          cursor: "pointer",
          color: "black", // Set the burger menu icon color to black
          fontSize: "24px", // Adjust the size as needed
        }}
        aria-label="Main Menu"
      >
        <svg width="30" height="30" viewBox="0 0 100 100">
          <path
            className="line line1"
            d="M 20,29 H 80"
            style={{ stroke: "black", strokeWidth: 5 }} // Black color for the top line
          />
          <path
            className="line line2"
            d="M 20,50 H 80"
            style={{ stroke: "black", strokeWidth: 5 }} // Black color for the middle line
          />
          <path
            className="line line3"
            d="M 20,71 H 80"
            style={{ stroke: "black", strokeWidth: 5 }} // Black color for the bottom line
          />
        </svg>
      </button>
    </div>
  );
};

export default MobileMenu;
