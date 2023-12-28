import React, { useEffect } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../../data/avatar.jpg";
// import { Notification, UserProfile } from ".";
import { useStateContext } from "../../contexts/ContextProvider";
import { IoMenu } from "react-icons/io5";
import { IoMdNotificationsOutline } from "react-icons/io";

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
const Navbar = ({ username }) => {
  return (
    <div className="flex justify-between p-2 md:mx-6 relative">
      <div className="flex">
        <NavButton
          title="Notifications"
          color="black"
          icon={<IoMdNotificationsOutline />}
        />
        <TooltipComponent content="Profile" position="BottomCenter">
          <div
            className="flex items-center gap-2 cursor-pointer p-1 hover:bg-light-gray rounded-lg"
            // onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full w-8 h-8"
              src={avatar}
              alt="user-profile"
            />
            <span className="text-gray-400 text-14"> Hi,</span>
            <span className="text-gray-400 font-bold  text-14">{username}</span>
          </div>
        </TooltipComponent>
      </div>
    </div>
  );
};

export default Navbar;
