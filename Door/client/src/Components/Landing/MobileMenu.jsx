import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logo } from "../../assets/images";
import MobileMenu from "./MobileMenu";

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
      {/* Desktop Header */}
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
                  <Link onClick={ClickHandler} to="/">
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
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Header */}
      <div
        className="header header--mobile cc-header-menu mean-container position-relative"
        id="meanmenu"
        style={{
          backgroundColor: "#333",
          color: "#fff",
          padding: "10px 20px",
          position: "fixed",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <div className="mean-bar headerBurgerMenu">
          <Link onClick={ClickHandler} to="/">
            <img
              className="mean-bar__logo"
              alt="Techkit"
              src={logo}
              style={{
                height: "40px",
                width: "auto",
              }}
            />
          </Link>
          <div className="header__right">
            <button
              className={`headerBurgerMenu__button sidebarBtn ${
                mobailActive ? "opened" : ""
              }`}
              aria-label="Main Menu"
              onClick={() => setMobailState(!mobailActive)}
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                color: "#fff",
                fontSize: "24px",
              }}
            >
              <svg width="30" height="30" viewBox="0 0 100 100">
                <path
                  className="line line1"
                  d="M 20,29 H 80"
                  style={{ stroke: "white", strokeWidth: 5 }}
                />
                <path
                  className="line line2"
                  d="M 20,50 H 80"
                  style={{ stroke: "white", strokeWidth: 5 }}
                />
                <path
                  className="line line3"
                  d="M 20,71 H 80"
                  style={{ stroke: "white", strokeWidth: 5 }}
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`cc cc--slideNav ${mobailActive ? "show" : ""}`}>
        <div className="offscreen-navigation mb-40">
          <nav className="menu-main-primary-container">
            <MobileMenu />
          </nav>
        </div>
      </div>
    </div>
  );
};

export default connect()(Header);
