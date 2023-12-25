import React, { useEffect, useState } from "react";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import avatar from "../../data/avatar.jpg";
import { useStateContext } from "../../contexts/ContextProvider";
import { IoMdNotificationsOutline } from "react-icons/io";
import { BsFillCaretDownFill } from "react-icons/bs";
import "./Navbar.css";

const NavButton = ({ title, customFunc, icon, color, dotColor }) => (
  <TooltipComponent content={title} position="BottomCenter">
    <button
      type="button"
      onClick={customFunc}
      style={{ color }}
      className="relative text-xl rounded-full p-3 hover:bg-light-gray"
    >
      <span
        style={{ background: dotColor }}
        className="absolute inline-flex rounded-full h-2 w-2 right-2 top-2"
      />
      {icon}
    </button>
  </TooltipComponent>
);

const Navbar = () => {
  const {
    activeMenu,
    setActiveMenu,
    isClicked,
    setIsClicked,
    handleClick,
    screenSize,
    setScreenSize,
  } = useStateContext();

  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const handleLogout = () => {
    console.log("Đã đăng xuất người dùng");
  };

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth);
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (screenSize <= 900) {
      setActiveMenu(false);
    } else {
      setActiveMenu(true);
    }
  }, [screenSize]);

  return (
    <div className="navbar-container">
      <div className="nav-items">
        <NavButton
          title="Notifications"
          customFunc={() => handleClick("notification")}
          color="black"
          icon={<IoMdNotificationsOutline />}
        />
        <div
          className="profile-container"
          onClick={() => setShowProfileMenu(!showProfileMenu)}
        >
          <img className="profile-image" src={avatar} alt="user-profile" />
          <div className="profile-info">
            <div className="profile-greeting-name">
              <span className="profile-greeting">Hi, </span>
              <span className="profile-name"> HuyenTram</span>
            </div>
            {showProfileMenu && (
              <div className="profile-menu">
                <div className="profile-menu-item" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
            {/* <BsFillCaretDownFill className="profile-caret" /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
