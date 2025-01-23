import React from "react";
import { Menu, Transition } from "@headlessui/react";
import { Link } from "react-router-dom";
import { Fragment } from "react";
import { Person3Outlined } from "@mui/icons-material";

const ProfileDropdown = ({ userImage, username, menuItems }) => {
  return (
    <Menu as="div" className="relative z-50">
      <Menu.Button className="flex items-center gap-2 rounded-full p-1.5 hover:bg-gray-100 transition-colors duration-200">
        <Person3Outlined size={24} />
        <span className="text-sm font-medium text-gray-700">{username}</span>
        <svg
          className="h-4 w-4 text-gray-500"
          fill="none"
          strokeWidth="2"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </Menu.Button>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right rounded-xl bg-white py-2 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-4 py-2">
            <p className="text-sm font-semibold text-gray-900">Welcome back!</p>
            <p className="text-sm text-gray-500">{username}</p>
          </div>

          <div className="px-1 py-1">
            {menuItems?.map((item, index) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <Link
                    to={item.redirectTo}
                    className={`${
                      active ? "bg-gray-100" : ""
                    } group flex w-full items-center rounded-md px-3 py-2 text-sm text-gray-700 transition-colors`}
                  >
                    <i className={`${item.icon} mr-2 text-gray-500`} />
                    {item.label}
                  </Link>
                )}
              </Menu.Item>
            ))}
            <button
              onClick={() => {
                localStorage.clear();
                window.location = "/";
              }}
              className="text-sm text-white bg-red-500 w-full p-2"
            >
              Logout
            </button>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default ProfileDropdown;
