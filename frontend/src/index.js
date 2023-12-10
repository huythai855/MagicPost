import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GiamDoc from "./GiamDoc";
import TruongDiem from "./TruongDiem";
import NhanVien from "./NhanVien";

import { ContextProvider } from "./contexts/ContextProvider";
ReactDOM.render(
  <ContextProvider>
    {/* <GiamDoc /> */}
    {/* <TruongDiem /> */}
    <NhanVien />
  </ContextProvider>,
  document.getElementById("root")
);
