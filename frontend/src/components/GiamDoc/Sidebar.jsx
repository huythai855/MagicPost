import React from "react";
import { Link, NavLink } from "react-router-dom";
import {
  BsBarChart,
  BsBank,
  BsShop,
  BsInfoCircle,
  BsChatDots,
} from "react-icons/bs";
import { TbLogout } from "react-icons/tb";
import { MdOutlineCancel } from "react-icons/md";

import { IoLogoMedium } from "react-icons/io5";

import { linksGD, linksTN } from "../../data/data";

import { useStateContext } from "../../contexts/ContextProvider";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const Sidebar = () => {
  const { activeMenu, setActiveMenu, screenSize } = useStateContext();
  const handleCloseSideBar = () => {
    if (activeMenu && screenSize <= 900) {
      setActiveMenu(false);
    }
  };
  const activeLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5  rounded-lg text-green-700  text-lg m-2";
  const normalLink =
    "flex items-center gap-5 pl-4 pt-3 pb-2.5 rounded-lg text-lg text-gray-700 dark:text-gray-200 dark:hover:text-black hover:bg-light-gray m-2";
  return (
    <div className="ml-3 h-screen md:overflow-hidden overflow-auto md:hover:overflow-auto pb-10">
      {activeMenu && (
        <>
          <div className="flex justify-between items-center">
            <Link
              to="/"
              onClick={handleCloseSideBar}
              className="items-center gap-3 ml-3 mt-4 flex text-xl font-mono
        font-extrabold tracking-tight dark:text-white text-slate-900"
            >
              <IoLogoMedium />
              <span>MagicPost</span>
            </Link>
            <TooltipComponent cotent="Menu" position="BottomCenter">
              <button
                type="button"
                onClick={() =>
                  setActiveMenu((prevActiveMenu) => !prevActiveMenu)
                }
                className="text-xl rounded-full p-3 hover:bg-light-gray mt-4 block md:hidden"
              >
                <MdOutlineCancel />
              </button>
            </TooltipComponent>
          </div>
          <div className="mt-14">
            {linksGD.map((item) => (
              <div key={item.title} className="mb-20 ">
                {/* <p className='text-gray-400 m-3 mt-4 uppercase'>{item.title}</p> */}
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.title}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>

          <div className="absolute bottom-10 pl-1 w-11/12">
            {linksTN.map((item) => (
              <div key={item.title} className="mt-40">
                <br></br>
                {/* <p className='text-gray-400 m-3 mt-4 uppercase'>{item.title}</p> */}
                {item.links.map((link) => (
                  <NavLink
                    to={`/${link.name}`}
                    key={link.name}
                    onClick={handleCloseSideBar}
                    className={({ isActive }) =>
                      isActive ? activeLink : normalLink
                    }
                  >
                    {link.icon}
                    <span className="capitalize">{link.title}</span>
                  </NavLink>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Sidebar;
