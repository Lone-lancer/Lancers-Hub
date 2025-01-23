import { Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useToggle } from "../../../hooks";
import Scrollbar from "../Scrollbar";

const NotificationDropdown = ({ notifications = [] }) => {
  const [isOpen, show, hide] = useToggle();

  const toggleDropdown = () => {
    isOpen ? hide() : show();
  };

  return (
    <Dropdown show={isOpen} onToggle={toggleDropdown}>
      <Dropdown.Toggle
        variant=""
        as="a"
        className="relative inline-flex items-center p-2 text-gray-600 hover:text-gray-800 transition-colors duration-200"
        onClick={toggleDropdown}
      >
        <i className="fe-bell text-xl"></i>
        {notifications.length > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-red-500 flex items-center justify-center">
            <span className="text-xs text-white font-medium">
              {notifications.length}
            </span>
          </span>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="w-80 sm:w-96 p-0 border-0 shadow-lg rounded-lg">
        <div onClick={toggleDropdown} className="divide-y divide-gray-100">
          {/* Header */}
          <div className="px-4 py-3 flex items-center justify-between bg-gray-50 rounded-t-lg">
            <h5 className="text-lg font-semibold text-gray-800">
              Notifications
            </h5>
            <Link
              to="#"
              className="text-sm text-gray-500 hover:text-gray-700 transition-colors duration-200"
            >
              Clear All
            </Link>
          </div>

          {/* Notification List */}
          <Scrollbar className="max-h-[400px]">
            {notifications.map((item, index) => (
              <Dropdown.Item
                key={index.toString()}
                className="px-4 py-3 hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start gap-3">
                  {item.avatar ? (
                    <>
                      <img
                        src={item.avatar}
                        alt=""
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div>
                        <p className="text-sm text-gray-800 font-medium">
                          {item.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.subText}
                        </p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div
                        className={`w-10 h-10 rounded-full flex items-center justify-center bg-${item.bgColor}-100`}
                      >
                        <i
                          className={`${item.icon} text-${item.bgColor}-500 text-lg`}
                        ></i>
                      </div>
                      <div>
                        <p className="text-sm text-gray-800 font-medium">
                          {item.text}
                        </p>
                        <p className="text-xs text-gray-500 mt-0.5">
                          {item.subText}
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </Dropdown.Item>
            ))}
          </Scrollbar>

          {/* Footer */}
          <Link
            to="#"
            className="block px-4 py-3 text-sm text-center text-blue-600 hover:text-blue-700 font-medium transition-colors duration-200 bg-gray-50 rounded-b-lg"
          >
            View All
            <i className="fe-arrow-right ml-2"></i>
          </Link>
        </div>
      </Dropdown.Menu>
    </Dropdown>
  );
};

export default NotificationDropdown;
