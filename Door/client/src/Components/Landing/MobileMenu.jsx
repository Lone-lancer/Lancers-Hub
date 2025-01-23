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
    <div
      style={{
        display: "flex", // Align items in a row
        justifyContent: "space-around", // Equal spacing between items
        alignItems: "center", // Center vertically
        padding: "10px 0", // Padding for spacing
        backgroundColor: "#fff", // White background
        position: "fixed", // Fix it at the top of the page
        width: "100%", // Full width
        zIndex: 1000, // Ensure it's above other elements
        boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)", // Subtle shadow
      }}
    >
      {menus.map((item, index) => (
        <Link
          key={index}
          onClick={ClickHandler}
          to={item.link}
          style={{
            textDecoration: "none", // Remove underline
            padding: "8px 12px", // Padding inside the buttons
            backgroundColor: "#4CAF50", // Green background
            color: "#fff", // White text
            borderRadius: "5px", // Rounded corners
            fontSize: "12px", // Smaller font size for mobile
            fontWeight: "bold", // Bold text
            textAlign: "center",
            boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)", // Button shadow
            minWidth: "80px", // Ensure minimum width for tap area
            margin: "0 5px", // Spacing between buttons
          }}
        >
          {item.title}
        </Link>
      ))}
    </div>
  );
};

export default MobileMenu;
