import React, { Suspense, useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { Outlet } from "react-router-dom";

// hooks
import { useRedux } from "../hooks";

// constants
import { LayoutTypes, SideBarTypes } from "../constants";

// utils
import { changeBodyAttribute } from "../utils";

const Topbar = React.lazy(() => import("./Topbar"));
const TeamMemberSidebar = React.lazy(() => import("./TeamMemberSidebar"));

const loading = () => <div className=""></div>;

const TeamMemberVerticalLayout = () => {
  const { appSelector } = useRedux();

  const {
    layoutColor,
    layoutWidth,
    menuPosition,
    leftSideBarTheme,
    leftSideBarType,
    showSidebarUserInfo,
    topbarTheme,
  } = appSelector((state) => ({
    layoutColor: state.Layout.layoutColor,
    layoutWidth: state.Layout.layoutWidth,
    menuPosition: state.Layout.menuPosition,
    leftSideBarTheme: state.Layout.leftSideBarTheme,
    leftSideBarType: state.Layout.leftSideBarType,
    showSidebarUserInfo: state.Layout.showSidebarUserInfo,
    topbarTheme: state.Layout.topbarTheme,
  }));

  const [isMenuOpened, setIsMenuOpened] = useState(false);

  /*
  layout defaults
  */
  useEffect(() => {
    changeBodyAttribute("data-layout-mode", LayoutTypes.LAYOUT_VERTICAL);
  }, []);

  useEffect(() => {
    changeBodyAttribute("data-layout-color", layoutColor);
  }, [layoutColor]);

  useEffect(() => {
    changeBodyAttribute("data-layout-size", layoutWidth);
  }, [layoutWidth]);

  useEffect(() => {
    changeBodyAttribute("data-leftbar-position", menuPosition);
  }, [menuPosition]);

  useEffect(() => {
    changeBodyAttribute("data-leftbar-color", leftSideBarTheme);
  }, [leftSideBarTheme]);

  useEffect(() => {
    changeBodyAttribute("data-leftbar-size", leftSideBarType);
  }, [leftSideBarType]);

  useEffect(() => {
    changeBodyAttribute("data-topbar-color", topbarTheme);
  }, [topbarTheme]);

  useEffect(() => {
    changeBodyAttribute("data-sidebar-user", showSidebarUserInfo);
  }, [showSidebarUserInfo]);

  /**
   * Open the menu when having mobile screen
   */
  const openMenu = () => {
    setIsMenuOpened((prevState) => !prevState);

    if (document.body) {
      if (isMenuOpened) {
        document.body.classList.remove("sidebar-enable");
      } else {
        document.body.classList.add("sidebar-enable");
      }
    }
  };

  const isCondensed =
    leftSideBarType === SideBarTypes.LEFT_SIDEBAR_TYPE_CONDENSED;

  return (
    <div className="min-h-screen ">
      <div className="flex h-screen overflow-hidden">
        {/* Sidebar */}
        <Suspense fallback={loading()}>
          <TeamMemberSidebar
            isCondensed={isCondensed}
            className={`transform transition-transform duration-300 ease-in-out
              ${
                isMenuOpened
                  ? "translate-x-0"
                  : "-translate-x-full lg:translate-x-0"
              }
            `}
          />
        </Suspense>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          <Suspense fallback={loading()}>
            <Topbar
              openLeftMenuCallBack={openMenu}
              className="sticky top-0 bg-gray-100"
            />
          </Suspense>

          <main className="flex-1 overflow-y-auto bg-gray-100 ">
            <div className="container mx-auto">
              <div className="">
                <Outlet />
              </div>
            </div>
          </main>
        </div>

        {/* Right Sidebar */}
        {/** <Suspense fallback={loading()}>
          <RightSidebar className="transform transition-transform duration-300 ease-in-out" />
        </Suspense>
         */}
      </div>
    </div>
  );
};

export default TeamMemberVerticalLayout;
