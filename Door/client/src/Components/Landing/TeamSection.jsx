import React from "react";
import Teams from "../../api/team";
import { Link } from "react-router-dom";
import { Facebook, Instagram, LinkedIn, Twitter } from "@mui/icons-material";
import { FaInstagram } from "react-icons/fa";

const TeamSection = (props) => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <section className="volunteersSection pb-120 pt-120">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="sectionTitle text-center mb-70">
              <span className="sectionTitle__small justify-content-center">
                <i className="fa-solid fa-heart btn__icon"></i>
                Tell us anything!
              </span>
              <h2 className="sectionTitle__big">Meet Our Team</h2>
            </div>
          </div>
        </div>
        <div className="row">
          {Teams.slice(0, 4).map((team, tm) => (
            <div className="col-lg-3 col-md-6 mb-45" key={tm}>
              <div className="volunteerBlock text-center">
                <figure className="volunteerBlock__figure">
                  <img
                    className="volunteerBlock__figure__thumb"
                    src={team.tImg}
                    alt="Gainioz Volunteers"
                  />
                </figure>
                <div className="volunteerBlock__content">
                  <h3 className="volunteerBlock__name text-uppercase text-center">
                    <Link
                      onClick={ClickHandler}
                      to={`/team-single/${team.slug}`}
                    >
                      {team.name}
                    </Link>
                  </h3>
                  <div className="itSocial itSocial--volunteer">
                    <ul>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          to={`/team-single/${team.slug}`}
                        >
                          <Facebook />
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          to={`/team-single/${team.slug}`}
                        >
                          <Twitter />
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          to={`/team-single/${team.slug}`}
                        >
                          <Instagram />
                        </Link>
                      </li>
                      <li>
                        <Link
                          onClick={ClickHandler}
                          to={`/team-single/${team.slug}`}
                        >
                          <LinkedIn />
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
