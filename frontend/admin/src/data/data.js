import React from "react";

import { FiBarChart } from "react-icons/fi";
import {
  BsBoxSeam,
  BsBank,
  BsShop,
  BsInfoCircle,
  BsChatDots,
  BsBarChart,
} from "react-icons/bs";

import { TbLogout } from "react-icons/tb";
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { PiArchiveBox } from "react-icons/pi";
import { CgNotes } from "react-icons/cg";
export const linksGD = [
  {
    title: "Giám đốc",
    links: [
      {
        path: "director/overview",
        title: "Overview",
        icon: <BsBarChart />,
      },
      {
        path: "director/diemtapket",
        title: "Điểm tập kết",
        icon: <BsBank />,
      },
      {
        path: "director/diemgiaodich",
        title: "Điểm giao dịch",
        icon: <BsShop />,
      },
      {
        path: "director/nhanvien",
        title: "Danh Sách Nhân Viên",
        icon: <BsShop />,
      },
    ],
  },
];

export const linksTDTK = [
  {
    title: "Trưởng điểm tập kết",
    links: [
      {
        path: "gp_lead/overview",
        title: "Overview",
        icon: <BsBarChart />,
      },
      {
        path: "gp_lead/danhsachdonhang",
        title: "Danh sách đơn hàng",
        icon: <BsBank />,
      },
      {
        path: "gp_lead/nhanvien",
        title: "Nhân viên",
        icon: <BsShop />,
      },
    ],
  },
];
export const linksTDGD = [
  {
    title: "Trưởng điểm giao dịch",
    links: [
      {
        path: "tp_lead/overview",
        title: "Overview",
        icon: <BsBarChart />,
      },
      {
        path: "tp_lead/danhsachdonhang",
        title: "Danh sách đơn hàng",
        icon: <BsBank />,
      },
      {
        path: "tp_lead/nhanvien",
        title: "Nhân viên",
        icon: <BsShop />,
      },
    ],
  },
];
export const linksNVTK = [
  {
    title: "Nhân viên tập kết",
    links: [
      {
        path: "gp_employee/danhsachdonhang",
        title: "Danh Sách Đơn Hàng",
        icon: <CgNotes />,
      },
    ],
  },
];
export const linksNVGD = [
  {
    title: "Nhân viên giao dịch",
    links: [
      {
        path: "tp_employee/donnoikhu",
        title: "Đơn nội khu",
        icon: <CgNotes />,
      },
      {
        path: "tp_employee/donngoaikhu",
        title: "Đơn ngoại khu",
        icon: <PiArchiveBox />,
      },
    ],
  },
];

export const linksTN = [
  {
    title: "Tính năng",
    links: [
      {
        title: "Hỗ trợ",
        path: "hotro",
        icon: <BsInfoCircle />,
      },
      {
        title: "Liên hệ",
        path: "lienhe",
        icon: <BsChatDots />,
      },
      {
        title: "Đăng xuất",
        path: "dangxuat",
        icon: <TbLogout />,
      },
    ],
  },
];

export const linksShipper = [
  {
    title: "Nhân viên giao hàng",
    links: [
      {
        path: "shipper/dsgh",
        title: "Danh Sách Giao Hàng",
        icon: <CgNotes />,
      },
      {
        path: "shipper/dsvc",
        title: "Danh Sách Vận Chuyển",
        icon: <CgNotes />,
      },
    ],
  },
];

export const earningData = [
  {
    icon: <FiBarChart />,
    amount: "39,354",
    percentage: "-4%",
    title: "Doanh số ",
    iconColor: "#03C9D7",
    iconBg: "#E5FAFB",
    pcColor: "red-600",
  },
  {
    icon: <BsBoxSeam />,
    amount: "4,396",
    percentage: "+23%",
    title: "Số hàng gửi/ nhận",
    iconColor: "rgb(255, 244, 229)",
    iconBg: "rgb(254, 201, 15)",
    pcColor: "green-600",
  },
  {
    icon: <MdOutlineSupervisorAccount />,
    amount: "423,39",
    percentage: "+38%",
    title: "Nhân viên",
    iconColor: "rgb(228, 106, 118)",
    iconBg: "rgb(255, 244, 229)",
    pcColor: "green-600",
  },
  {
    icon: <HiOutlineRefresh />,
    amount: "39,354",
    percentage: "-12%",
    title: "Lượt truy cập",
    iconColor: "rgb(0, 194, 146)",
    iconBg: "rgb(235, 250, 242)",
    pcColor: "red-600",
  },
];

export const stackedChartData = [
  [
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 159.9 },
    { x: "Jun", y: 159.9 },
    { x: "July", y: 159.9 },
    { x: "Aug", y: 159.9 },
    { x: "Sep", y: 159.9 },
    { x: "Oct", y: 159.9 },
    { x: "Nov", y: 159.9 },
    { x: "Dec", y: 159.9 },
    { x: "Jan", y: 111.1 },
  ],
  [
    { x: "Feb", y: 127.3 },
    { x: "Mar", y: 143.4 },
    { x: "Apr", y: 159.9 },
    { x: "May", y: 159.9 },
    { x: "Jun", y: 159.9 },
    { x: "July", y: 159.9 },
    { x: "Aug", y: 159.9 },
    { x: "Sep", y: 159.9 },
    { x: "Oct", y: 159.9 },
    { x: "Nov", y: 159.9 },
    { x: "Dec", y: 159.9 },
    { x: "Jan", y: 111.1 },
  ],
];

export const stackedCustomSeries = [
  {
    dataSource: stackedChartData[0],
    xName: "x",
    yName: "y",
    path: "Budget",
    type: "StackingColumn",
    background: "blue",
  },

  {
    dataSource: stackedChartData[1],
    xName: "x",
    yName: "y",
    path: "Expense",
    type: "StackingColumn",
    background: "red",
  },
];

export const stackedPrimaryXAxis = {
  majorGridLines: { width: 0 },
  minorGridLines: { width: 0 },
  majorTickLines: { width: 0 },
  minorTickLines: { width: 0 },
  interval: 1,
  lineStyle: { width: 0 },
  labelIntersectAction: "Rotate45",
  valueType: "Category",
};

export const stackedPrimaryYAxis = {
  lineStyle: { width: 0 },
  minimum: 100,
  maximum: 400,
  interval: 100,
  majorTickLines: { width: 0 },
  majorGridLines: { width: 1 },
  minorGridLines: { width: 1 },
  minorTickLines: { width: 0 },
  labelFormat: "{value}",
};
