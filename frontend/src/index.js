import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import GiamDoc from "./GiamDoc";
import TruongGiaoDich from "./TruongGiaoDich";

import { ContextProvider } from "./contexts/ContextProvider";
import GiaoDichVien from "./GiaoDichVien";
ReactDOM.render(
  <ContextProvider>
    {/* <GiamDoc /> */}
    {/* <TruongGiaoDich /> */}
    <GiaoDichVien />
    {/* <GiamDoc /> */}
  </ContextProvider>,
  document.getElementById("root")
);
