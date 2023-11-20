import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { FiSettings } from "react-icons/fi";
import { TooltipComponent } from "@syncfusion/ej2-react-popups";
import { Navbar, Footer, Sidebar } from "./components";
import { MagicPost, Overview, DiemGiaoDich, DiemTapKet } from "./pages";
import { useStateContext } from "./contexts/ContextProvider";
import "./App.css";
import BasicTable from "./components/table/BasicTable";
import SortingTable from "./components/table/SortingTable";
import { GiMagicPalm } from "react-icons/gi";

const App = () => {
  const { activeMenu } = useStateContext();
  return (
    <div>
      <BrowserRouter>
        <div className="flex relative dark:bg-main-dark-bg">
          <div className="fixed right-4 bottom-4" style={{ zIndex: "1000" }}>
            <TooltipComponent content="Settings" position="Top">
              <button>
                <FiSettings />
              </button>
            </TooltipComponent>
          </div>
          {activeMenu ? (
            <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
              <Sidebar />
            </div>
          ) : (
            <div className="w-0 dark:bg-secondary-dark-bg">
              <Sidebar />
            </div>
          )}
          <div
            className={`dark:bg-main-bg bg-main-bg min-h-screen w-full ${
              activeMenu ? " md:ml-72" : " flex-2"
            }`}
          >
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>
              <Routes>
                {/* Giamdoc */}
                <Route path="/" element={<DiemGiaoDich />} />
                <Route path="/overview" element={<Overview />} />
                <Route path="/diemtapket" element={<DiemTapKet />} />
                <Route path="/diemgiaodich" element={<DiemGiaoDich />} />

                {/* Tinh nang */}
                <Route path="/helpcentre" element="Help Centre" />
                <Route path="/contactus" element="Contact Us" />
                <Route path="/logout" element="Log Out" />
              </Routes>
            </div>
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;
