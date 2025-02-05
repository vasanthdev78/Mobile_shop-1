import React from "react";
import { useNavigate } from "react-router-dom";
import { logout } from "@api/urls";
import Swal from "sweetalert2";

export default function Header() {
  const navigate = useNavigate();

  const handleSignOut = async () => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You will need to log in again to access your account.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Sign out!",
    });
    if (result.isConfirmed) {
      logout();
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("accessToken");
      Swal.fire({
        title: "Success!",
        text: "You have successfully signed out.",
        icon: "success",
        showConfirmButton: false,
        timer: 1000,
      });
      setTimeout(() => navigate("/"), 1500);
    }
  };

  const setHtmlClass = (action, className) => {
    const htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList[action](className);

    const logoElement = document.getElementsByClassName("app-mini-logo")[0];
    logoElement.classList[action](className);
  };
  const handleSideBar = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1199) {
      setHtmlClass("toggle", "layout-menu-expanded");
    } else {
      setHtmlClass("toggle", "layout-menu-collapsed");
    }
  };
  return (
    <nav
      className="layout-navbar container-xxl navbar navbar-expand-xl navbar-detached align-items-center bg-navbar-theme"
      id="layout-navbar"
    >
      <div className="layout-menu-toggle navbar-nav align-items-xl-center me-3 me-xl-0 ">
        <a
          className="nav-item nav-link px-0 me-xl-4"
          href="javascript:void(0);"
          onClick={handleSideBar}
        >
          <i className="ti ti-menu-2 ti-md" />
        </a>
      </div>
      <div
        className="navbar-nav-right d-flex align-items-center"
        id="navbar-collapse"
      >
        <ul className="navbar-nav flex-row align-items-center ms-auto">
          <li className="nav-item navbar-dropdown dropdown-user dropdown">
            <button
              className="btn btn-sm btn-danger d-flex"
              onClick={handleSignOut}
            >
              <small className="align-middle me-2 d-none d-sm-block">
                Logout
              </small>
              <i className="ti ti-logout ti-14px" />
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
}
