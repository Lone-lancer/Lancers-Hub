import React, { useState } from "react";
import { TabContent, TabPane, Nav, NavItem, NavLink } from "reactstrap";
import classnames from "classnames";
import { aImg1, aImg2, aImg3 } from "../../assets/images";

const AboutTab = (props) => {
  const [activeTab, setActiveTab] = useState("1");

  const toggle = (tab) => {
    if (activeTab !== tab) setActiveTab(tab);
  };

  return (
    <div className="about position-relative">
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="featureTab">
              <Nav tabs className="nav justify-content-center">
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "1" })}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                    About Lancer's Hub
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "2" })}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                    our mission
                  </NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    className={classnames({ active: activeTab === "3" })}
                    onClick={() => {
                      toggle("3");
                    }}
                  >
                    our vission
                  </NavLink>
                </NavItem>
              </Nav>
              <TabContent activeTab={activeTab} className="pt-55">
                <TabPane tabId="1">
                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="aboutDetails text-center">
                        <p className="aboutDetailsText mb-20">
                          Lancer's Hub is a cutting-edge virtual office platform
                          designed to bridge the gap between remote teams and
                          help them thrive in a digital-first world.
                        </p>
                        <p className="aboutDetailsText mb-20">
                          We provide an immersive workspace where teams can
                          collaborate seamlessly, hold meetings, share ideas,
                          and stay connected regardless of location. By
                          combining state-of-the-art technology with
                          user-friendly interfaces, Lancer's Hub aims to
                          redefine the remote work experience and provide a
                          dynamic, engaging environment where creativity and
                          productivity flourish.
                        </p>
                      </div>
                      <div className="aboutDetailsThumbs pt-100">
                        <div className="row g-0 align-items-center">
                          <div className="col-lg-4">
                            <div className="aboutDetailsThumb">
                              <img src={aImg1} alt="About Gainioz" />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="aboutDetailsThumb aboutDetailsThumb--big">
                              <img src={aImg2} alt="About Gainioz" />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="aboutDetailsThumb">
                              <img src={aImg3} alt="About Gainioz" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="2">
                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="aboutDetailsThumbs">
                        <div className="row g-0 align-items-center">
                          <div className="col-lg-4">
                            <div className="aboutDetailsThumb">
                              <img src={aImg1} alt="About Gainioz" />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="aboutDetailsThumb aboutDetailsThumb--big">
                              <img src={aImg2} alt="About Gainioz" />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="aboutDetailsThumb">
                              <img src={aImg3} alt="About Gainioz" />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="aboutDetails text-center  pt-100">
                        <p className="aboutDetailsText mb-20">
                          At Lancer's Hub, our mission is to empower remote
                          teams with an innovative virtual workspace that
                          enhances communication, collaboration, and
                          productivity.
                        </p>
                        <p className="aboutDetailsText mb-20">
                          {" "}
                          We strive to eliminate the barriers that come with
                          remote work, providing organizations with the tools
                          they need to operate effectively and efficiently in a
                          digital world. Our goal is to foster a culture of
                          inclusivity and teamwork, allowing teams to connect,
                          innovate, and achieve their fullest potential, no
                          matter where they are.
                        </p>
                      </div>
                    </div>
                  </div>
                </TabPane>
                <TabPane tabId="3">
                  <div className="row">
                    <div className="col-lg-10 mx-auto">
                      <div className="aboutDetails text-center">
                        <p className="aboutDetailsText mb-20">
                          Our vision at Lancer's Hub is to be the leading
                          platform for virtual office solutions, transforming
                          how teams work together in the digital age.
                        </p>
                        <p className="aboutDetailsText mb-20">
                          We envision a future where businesses and individuals
                          no longer face the challenges of distance and
                          disconnectedness, where collaboration is limitless,
                          and productivity is at its peak. Lancer's Hub aims to
                          be a space that empowers creativity, drives
                          innovation, and helps organizations of all sizes reach
                          their goals with ease, all within a fully immersive
                          and engaging virtual environment.
                        </p>
                      </div>
                      <div className="aboutDetailsThumbs pt-100">
                        <div className="row g-0 align-items-center">
                          <div className="col-lg-4">
                            <div className="aboutDetailsThumb">
                              <img src={aImg1} alt="About Gainioz" />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="aboutDetailsThumb aboutDetailsThumb--big">
                              <img src={aImg2} alt="About Gainioz" />
                            </div>
                          </div>
                          <div className="col-lg-4">
                            <div className="aboutDetailsThumb">
                              <img src={aImg3} alt="About Gainioz" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </TabPane>
              </TabContent>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutTab;
