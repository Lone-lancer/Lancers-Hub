import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import classNames from "classnames";
import config from "../../config";

// actions
import { showRightSidebar } from "../../redux/actions";

// constants
import { LayoutTypes } from "../../constants";

// hooks
import { useRedux } from "../../hooks";

// components
import SearchDropdown from "../../Components/Dashboard/topbar/SearchDropdown";
import ThemeSetting from "../../Components/Dashboard/topbar/ThemeSetting";
import TopbarSearch from "../../Components/Dashboard/topbar/TopbarSearch";
import NotificationDropdown from "../../Components/Dashboard/topbar/NotificationDropdown";
import ProfileDropdown from "../../Components/Dashboard/topbar/ProfileDropdown";

// dummy data
import { notifications, profileMenus, searchOptions } from "./data";

// images
import logoSm from "../../assets/images/logo-sm.png";
import avatar1 from "../../assets/images/users/user-1.jpg";
import logoDark from "../../assets/images/logo-dark.png";
import logoLight from "../../assets/images/logo-light.png";

const Topbar = ({ openLeftMenuCallBack, containerClass }) => {
  const [profile, setProfile] = useState(null);
  const { dispatch, appSelector } = useRedux();
  const [isopen, setIsopen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await fetch(`${config.API_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch profile");
      }

      const data = await response.json();
      setProfile(data.user);
    } catch (error) {
      console.error("Error fetching profile:", error);
    }
  };

  const { layout, pageTitle } = appSelector((state) => ({
    layout: state.Layout.layoutType,
    pageTitle: state.PageTitle.pageTitle,
  }));

  /**
   * Toggle the leftmenu when having mobile screen
   */
  const handleLeftMenuCallBack = () => {
    setIsopen(!isopen);
    if (openLeftMenuCallBack) openLeftMenuCallBack();
  };

  /**
   * Toggles the right sidebar
   */
  const handleRightSideBar = () => {
    dispatch(showRightSidebar());
  };

  const handleCopyRoomId = async () => {
    try {
      await navigator.clipboard.writeText(profile?.roomId);
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(false), 2000); // Reset after 2 seconds
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <nav className="bg-slate-50">
      <div className={`px-4 py-2.5 ${containerClass}`}>
        <div className="flex items-center justify-between">
          {/* Logo Section */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <h1 className="text-[20px]">Dashboard</h1>
            </Link>
          </div>

          {/* Center Section - Page Title (Only for Vertical Layout) */}
          {layout === LayoutTypes.LAYOUT_VERTICAL && (
            <h1 className="hidden md:block text-xl font-semibold text-gray-800 dark:text-white">
              {pageTitle.title}
            </h1>
          )}

          {/* Room ID and Button Section */}
          <div className="flex items-center gap-4">
            {profile?.roomId && (
              <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-gray-200">
                <span className="text-gray-500 text-sm">Room ID:</span>
                <code className="font-mono bg-gray-50 px-2 py-0.5 rounded text-blue-600 select-all">
                  {profile?.roomId}
                </code>
                <button
                  onClick={handleCopyRoomId}
                  className="ml-2 text-gray-400 hover:text-gray-600 transition-colors duration-200"
                  title={copySuccess ? "Copied!" : "Copy Room ID"}
                >
                  {copySuccess ? (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="20 6 9 17 4 12"></polyline>
                    </svg>
                  ) : (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect
                        x="9"
                        y="9"
                        width="13"
                        height="13"
                        rx="2"
                        ry="2"
                      ></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
            )}
            <button
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors duration-200"
                onClick={() => {
                  const roomId = profile?.roomId; // Assume `roomId` is fetched from user profile
                  const token = localStorage.getItem("token"); // JWT stored in local storage
                  const fullName = encodeURIComponent(profile?.fullName); // Get and encode the user's full name
                  const OfficeUrl = `http://localhost:3001?roomId=${roomId}&token=${encodeURIComponent(
                    token
                  )}&fullName=${fullName}`; // Include full name in the URL
                  window.open(OfficeUrl, "_blank"); // Open SkyOffice in a new tab
                }}
              >
                <i className="fe-home text-sm" />
                <span>Go to My Room</span>
            </button>

          </div>

          {/* Right Section */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative">
              <NotificationDropdown notifications={notifications} />
            </div>

            {/* Profile */}
            <div className="relative">
              <ProfileDropdown
                userImage={profile?.avatar || avatar1}
                username={profile?.fullName || "Nowak"}
                menuItems={profileMenus}
              />
            </div>

            {/* Theme Settings */}
            <div className="relative">
              <ThemeSetting handleRightSideBar={handleRightSideBar} />
            </div>

            {/* Mobile Menu Toggle */}
            {layout === LayoutTypes.LAYOUT_VERTICAL ? (
              <button
                onClick={handleLeftMenuCallBack}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                <i className="fe-menu text-gray-600 dark:text-gray-200" />
              </button>
            ) : (
              <Link
                to="#"
                className={classNames(
                  "lg:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700",
                  { "bg-gray-100 dark:bg-gray-700": isopen }
                )}
                onClick={handleLeftMenuCallBack}
              >
                <div className="space-y-1">
                  <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-200"></span>
                  <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-200"></span>
                  <span className="block w-6 h-0.5 bg-gray-600 dark:bg-gray-200"></span>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Topbar;
