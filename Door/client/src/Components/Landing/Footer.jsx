import React from "react";
import { Link } from "react-router-dom";
import { logo, shape } from "../../assets/images";
import { FacebookOutlined } from "@mui/icons-material";
import {
  FaInstagramSquare,
  FaLinkedinIn,
  FaPinterestSquare,
  FaTwitterSquare,
} from "react-icons/fa";

const ClickHandler = () => {
  window.scrollTo(10, 0);
};

const SubmitHandler = (e) => {
  e.preventDefault();
};

const Footer = (props) => {
  return (
    <footer className="footer footer--bg footer--styleOne pt-70 pb-40">
      <img src={shape} alt="Gainioz Shape" className="footer__shape" />
      <div className="container">
        <div className="row align-items-center">
          <div className="col">
            <div className="footer__logo">
              <img
                src={logo}
                alt="Gainioz Logo"
                className="footer__logo__image"
              />
            </div>
          </div>
          <div className="col">
            <div className="footer__social itSocial">
              <ul>
                <li>
                  <Link
                    onClick={ClickHandler}
                    className="facebook"
                    to="/"
                    rel="nofollow"
                  >
                    <FacebookOutlined />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={ClickHandler}
                    className="twitter"
                    to="/"
                    rel="nofollow"
                  >
                    <FaTwitterSquare />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={ClickHandler}
                    className="instagram"
                    to="/"
                    rel="nofollow"
                  >
                    <FaInstagramSquare />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={ClickHandler}
                    className="linkedin"
                    to="/"
                    rel="nofollow"
                  >
                    <FaLinkedinIn />
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={ClickHandler}
                    className="pinterest"
                    to="/"
                    rel="nofollow"
                  >
                    <FaPinterestSquare />
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-12">
            <hr className="footer__line" />
          </div>
        </div>
        <div className="row">
          <div className="footer__bottom">
            <div className="row">
              <div className="col-12">
                <hr className="footer__line" />
              </div>
              <div className="col mb-20">
                <div className="footer__copyright pt-20">
                  <p className="footer__copyright__text mb-0">
                    Copyright@example 2024 all right receved
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
