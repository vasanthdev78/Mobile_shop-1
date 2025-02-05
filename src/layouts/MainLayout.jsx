import { Header, Sidebar } from "@components/index.js";
import { Outlet, Navigate, useLocation } from "react-router-dom";

const MainLayout = () => {
  const authToken = localStorage.getItem("accessToken");
  const isAuthenticated = !!authToken;
  const location = useLocation();

  if (isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return (
    <div className="layout-wrapper layout-content-navbar">
      <div className="layout-container">
        <Sidebar />
        <div className="layout-page">
          <Header />
          <div className="content-wrapper">
            <Outlet />
            <div className="content-backdrop fade" />
          </div>
        </div>
      </div>
      <div className="layout-overlay layout-menu-toggle" />
      <div className="drag-target" />
    </div>
  );
};

export default MainLayout;