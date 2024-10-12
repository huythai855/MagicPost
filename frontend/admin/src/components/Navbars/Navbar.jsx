import React, { useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../../data/avatar.jpg";
import { useStateContext } from "../../contexts/ContextProvider";
// import { IoMdNotificationsOutline } from "react-icons/io5";
import { TbLogout } from "react-icons/tb";

const Navbar = ({ username }) => {
  // const { dispatch } = useStateContext();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    function setCookie(cname, cvalue, exdays) {
      const d = new Date();
      d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
      let expires = "expires=" + d.toUTCString();
      document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
    }

    setCookie("username", "", 1);
    setCookie("id", "", 1);
    setCookie("fullname", "", 1);
    setCookie("role", "", 1);
    localStorage.setItem("role", "");
    localStorage.setItem("fullname", "");
    localStorage.setItem("username", "");

    localStorage.setItem("department_id", "");
    // localStorage.clear();

    window.location.href = "http://localhost:3000/login";
    // dispatch({ type: "LOGOUT" });
    setShowDropdown(false);
  };

 

  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <div className="flex">
        {/* Notifications Button */}
        {/* <TooltipComponent content="Notifications" position="BottomCenter">
          <NavButton
            title="Notifications"
            color="black"
            icon={<IoMdNotificationsOutline />}
          />
        </TooltipComponent> */}

        {/* Profile Section with Dropdown */}
        <div
          className="relative"
          onClick={() => setShowDropdown(!showDropdown)}
        >
          <TooltipComponent content="Profile" position="BottomCenter">
            <div className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg">
              <img
                className="rounded-full w-8 h-8"
                src={avatar}
                alt="user-profile"
              />
              <span className="text-gray-400 text-14">Hi,</span>
              <span className="text-gray-400 font-bold text-14">
                {username}
              </span>
            </div>
          </TooltipComponent>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-300 rounded-md shadow-md">
              <div
                className="p-2 flex  cursor-pointer hover:bg-gray-100"
                onClick={handleLogout}
              >
                <TbLogout className="mr-2 mt-1" />
                <span>Logout</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position={"BottomCenter"}>
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2 "
      />
      {icon}
    </button>
  </TooltipComponent>
);

export default Navbar;
