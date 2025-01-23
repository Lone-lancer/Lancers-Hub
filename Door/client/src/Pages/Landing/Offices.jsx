import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import offices from "../../api/events";
import Header from "../../Components/Landing/Header";
import Scrollbar from "../../Components/Landing/Scrollbar";

const Offices = () => {
  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <Fragment>
      <Header hclass={"header--styleFour"} />
      <main className="main">
        <section className="events pt-130 pb-80">
          <div className="container">
            <div className="row">
              <div className="col-12">
                <div className="sectionTitle text-center mb-30">
                  <span className="sectionTitle__small justify-content-center">
                    <i className="fa-solid fa-heart btn__icon"></i>
                    choose your office
                  </span>
                  <h2 className="sectionTitle__big">
                    build your office from your home
                  </h2>
                </div>
              </div>
            </div>
            <br></br>
            <br></br>
            <br></br>

            <div className="row">
              {offices.map((events, et) => (
                <div className="col-12 mb-30" key={et}>
                  <div className="eventsBlock">
                    <figure className="eventsBlock__thumb">
                      <Link
                        onClick={ClickHandler}
                        to={`/event-single/${events.slug}`}
                        className="eventsBlock__thumb__link"
                      >
                        <img
                          src={events.eImg}
                          alt="Gainioz Events"
                          className="eventsBlock__thumb__image"
                        />
                      </Link>
                    </figure>
                    <div className="eventsBlock__content">
                      <h3 className="eventsBlock__heading text-uppercase">
                        <Link
                          onClick={ClickHandler}
                          to={`/event-single/${events.slug}`}
                        >
                          {events.title}
                        </Link>
                      </h3>
                      <div className="eventsBlock__meta">
                        <ul>

                          <li>
                            <span className="eventsBlock__meta__title">
                              Price :
                            </span>
                            <span className="eventsBlock__meta__text">
                              {events.address}
                            </span>
                          </li>
                        </ul>
                      </div>
                      <p className="eventsBlock__text">{events.description}</p>
                      <button
                        onClick={() => (window.location.href = "/Purchase")}
                        className="eventsBlock__detailsLink"
                      >
                        Rent office
                        <svg
                          width="61"
                          height="12"
                          viewBox="0 0 61 12"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            d="M60.5303 6.53033C60.8232 6.23744 60.8232 5.76256 60.5303 5.46967L55.7574 0.696699C55.4645 0.403806 54.9896 0.403806 54.6967 0.696699C54.4038 0.989593 54.4038 1.46447 54.6967 1.75736L58.9393 6L54.6967 10.2426C54.4038 10.5355 54.4038 11.0104 54.6967 11.3033C54.9896 11.5962 55.4645 11.5962 55.7574 11.3033L60.5303 6.53033ZM0 6.75H60V5.25H0V6.75Z"
                            fill="#0D0D0D"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Scrollbar />
    </Fragment>
  );
};

export default Offices;
