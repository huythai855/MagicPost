import React, { useEffect, useState } from "react";
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

import {
  linksGD,
  linksTDGD,
  linksTDTK,
  linksNVGD,
  linksNVTK,
  linksShipper,
  linksTN,
} from "../../data/data";
import {
  FaTh,
  FaBars,
  FaUserAlt,
  FaRegChartBar,
  FaCommentAlt,
  FaShoppingBag,
  FaThList,
} from "react-icons/fa";
import { useStateContext } from "../../contexts/ContextProvider";

import { TooltipComponent } from "@syncfusion/ej2-react-popups";

const Sidebar = ({ role: initialRole, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  const [role, setRole] = useState(initialRole); // Use the role from props
  const [link, setLink] = useState([]);
  const handleNavLinkClick = () => {
    // Đây là nơi bạn đặt logic xử lý khi NavLink được click

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
    localStorage.setItem("department_id", "");
    // localStorage.clear();

    window.location.href = "http://localhost:3000/login";

    console.log("NavLink clicked!");
    // Thêm các xử lý khác tại đây
  };
  useEffect(() => {
    // Update link based on the role
    if (role === "director") {
      setLink(linksGD);
    }
    if (role === "gathering_point_leader") {
      setLink(linksTDTK);
    }
    if (role === "transaction_point_leader") {
      setLink(linksTDGD);
    }
    if (role === "gathering_point_staff") {
      setLink(linksNVTK);
    }
    if (role === "transaction_point_staff") {
      setLink(linksNVGD);
    }
    if (role === "shipper") {
      setLink(linksShipper);
    }
  }, [role]);
  return (
    <div className="container">
      <div style={{ width: isOpen ? "350px" : "60px" }} className="sidebar">
        <div className="top_section">
          <h1 style={{ display: isOpen ? "block" : "none" }} className="logo">
            MagicPost
          </h1>
          <div style={{ marginLeft: isOpen ? "80px" : "0px" }} className="bars">
            <FaBars onClick={toggle} />
          </div>
        </div>
        <div className="mt-4">
          {link.map((item) =>
            item.links.map((link) => (
              <NavLink
                to={`/${link.path}`}
                key={link.path}
                className="link"
                activeClassName="active"
              >
                <div className="icon">{link.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text capitalize"
                >
                  {link.title}
                </div>
              </NavLink>
            ))
          )}
        </div>
        <div className="pt-72 "></div>
        {linksTN.map((item) => (
          <div key={item.title} className="mt-40">
            {item.links.map((link) => (
              <NavLink
                to={`/${link.path}`}
                key={link.path}
                className="link"
                activeClassName="active"
                onClick={handleNavLinkClick}
              >
                <div className="icon">{link.icon}</div>
                <div
                  style={{ display: isOpen ? "block" : "none" }}
                  className="link_text capitalize"
                >
                  {link.title}
                </div>
              </NavLink>
            ))}
          </div>
        ))}
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
