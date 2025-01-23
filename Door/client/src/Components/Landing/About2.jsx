import React from "react";
import { Link } from "react-router-dom";
import { about1 } from "../../assets/images";

const About2 = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="about" id="about">
      <div className="container">
        <div className="row align-items-center justify-content-between">
          <div className="col-lg-6 mb-30">
            <div className="aboutContent aboutContent--style2">
              <div className="sectionTitle mb-20">
                <span className="sectionTitle__small">
                  <i className="fa-solid fa-heart btn__icon"></i>
                  about lancer's hub
                </span>
                <h2 className="sectionTitle__big">
                  Welcome to our Virtual Office,
                </h2>
              </div>
              <p className="aboutContent__text">
                A dynamic and interactive digital workspace designed to bring
                teams together, no matter where they are. With intuitive
                navigation and immersive environments, our platform allows you
                to collaborate, hold meetings, and work efficiently, all in real
                time. Whether you're a small team or a large organization, our
                virtual office enhances communication, fosters creativity, and
                boosts productivity by offering a seamless, engaging experience.
                Step into the future of remote work and connect with your team
                like never before.
              </p>
            </div>
          </div>
          <div className="col-lg-5">
            <div className="aboutThumb">
              <div className="aboutThumb__text">
                <span className="aboutThumb__text__title">..Since..</span>
                <span className="aboutThumb__text__year">2024</span>
              </div>
              <figure className="aboutThumb__figure m-0">
                <img src={about1} alt="Gainioz About" />
              </figure>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About2;
