import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logo } from "../../assets/images";
import MobileMenu from "./MobileMenu";
import { ArrowRight } from "@mui/icons-material";

const Header = (props) => {
  const [mobailActive, setMobailState] = useState(false);
  const [isSticky, setSticky] = useState(false);

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 80) {
        setSticky(true);
      } else {
        setSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div>
      <header
        className={`header header--styleOne sticky-on  ${
          isSticky ? "sticky" : ""
        }  ${props.hclass}`}
      >
        <div id="sticky-placeholder"></div>
        <div className="container container--custom">
          <div className="row">
            <div className="col-12">
              <div className="header__wrapper">
                <div className="header__logo">
                  <Link
                    onClick={ClickHandler}
                    to="/"
                    className="header__logo__link"
                  >
                    <img
                      src={logo}
                      alt="Gainioz"
                      className="header__logo__image"
                    />
                  </Link>
                </div>
                <div className="header__menu">
                  <nav className="mainMenu">
                    <ul>
                      <li className="dropdown">
                        <Link onClick={ClickHandler}>
                          Lancer's Hub - Virtual Office
                        </Link>
                      </li>
                    </ul>
                  </nav>
                </div>
                <div className="header__right">
                  <Link
                    to={"/login"}
                    className="bg-gray-900 text-white px-5 py-2 shadow-lg rounded-full"
                  >
                    Login
                  </Link>
                  <Link
                    to={"/register"}
                    className="bg-gray-900 text-white px-5 py-2 shadow-lg rounded-full"
                  >
                    Register
                  </Link>
                  <div className="header__button">
                    <Link
                      onClick={ClickHandler}
                      to="/offices"
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "10px 20px",
                        backgroundColor: "#4CAF50",
                        color: "#fff",
                        fontSize: "16px",
                        fontWeight: "bold",
                        textDecoration: "none",
                        borderRadius: "20px",
                        transition: "transform 0.3s ease",
                        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.transform = "scale(1.05)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.transform = "scale(1)")
                      }
                    >
                      Get started
                      <ArrowRight />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      {/* header--mobile */}
      <div
        className="header header--mobile cc-header-menu mean-container position-relative"
        id="meanmenu"
      >
        <div className="mean-bar headerBurgerMenu">
          <Link onClick={ClickHandler} to="/">
            <img className="mean-bar__logo" alt="Techkit" src={logo} />
          </Link>
          <div className="header__right">
            <ul>
              <li>
                <button
                  className={`headerBurgerMenu__button sidebarBtn ${
                    mobailActive ? "opened" : ""
                  }`}
                  aria-label="Main Menu"
                  onClick={() => setMobailState(!mobailActive)}
                >
                  <svg width="50" height="50" viewBox="0 0 100 100">
                    <path className="line line1" d="..." />
                    <path className="line line2" d="..." />
                    <path className="line line3" d="..." />
                  </svg>
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* mobail-left */}
      <div className={`cc cc--slideNav ${mobailActive ? "show" : ""}`}>
        <div className="cc__logo mb-40">
          <Link onClick={ClickHandler} to="/">
            <img className="mean-bar__logo" alt="Techkit" src={logo} />
          </Link>
        </div>
        <div className="offscreen-navigation mb-40">
          <nav className="menu-main-primary-container">
            <MobileMenu />
          </nav>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    carts: state?.cartList?.cart,
  };
};

export default connect(mapStateToProps)(Header);
