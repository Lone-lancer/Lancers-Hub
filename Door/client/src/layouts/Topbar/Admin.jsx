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

const AdminTopbar = ({ openLeftMenuCallBack, containerClass }) => {
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
      await navigator.clipboard.writeText(profile?.RoomId);
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

export default AdminTopbar;
