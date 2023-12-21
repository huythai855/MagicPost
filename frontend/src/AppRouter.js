import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import "./App.css";
import {
  MagicPost,
  Overview,
  DiemGiaoDich,
  DiemTapKet,
  DSNhanVien,
  DanhSachDonHang,
  DanhSachNgoaiKhu,
  DanhSachDonNoiKhu,
  DanhSachKienHang,
  FormBienNhan,
} from "./pages";
import { Sidebar, Navbar } from "./components";
import { ContextProvider } from "./contexts/ContextProvider";
import { publicRoutes } from "./routes";
function AppRouter() {
  return (
    <Router>
      <div className="App">
        <ContextProvider>
          <Routes>
            {publicRoutes.map((route, index) => {
              const Page = route.component;
              const boss = route.boss;
              return (
                <Route
                  key={index}
                  path={route.path}
                  element={
                    <Sidebar role="Giám đốc">
                      <Navbar />
                      <Page boss={boss} />
                    </Sidebar>
                  }
                />
              );
            })}
          </Routes>
        </ContextProvider>
      </div>
    </Router>
  );
}
export default AppRouter;
