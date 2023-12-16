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

  useEffect(() => {
    // Update link based on the role
    if (role === "Giám đốc") {
      setLink(linksGD);
    }
    if (role === "Trưởng điểm tập kết") {
      setLink(linksTDTK);
    }
    if (role === "Trưởng điểm giao dịch") {
      setLink(linksTDGD);
    }
    if (role === "Nhân viên tập kết") {
      setLink(linksNVTK);
    }
    if (role === "Nhân viên giao dịch") {
      setLink(linksNVGD);
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
        {/* <div className="pt-64 "></div> */}
        {/* {linksTN.map((item) => (
          <div key={item.title} className="mt-40">
            {item.links.map((link) => (
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
            ))}
          </div>
        ))} */}
      </div>
      <main>{children}</main>
    </div>
  );
};
export default Sidebar;
