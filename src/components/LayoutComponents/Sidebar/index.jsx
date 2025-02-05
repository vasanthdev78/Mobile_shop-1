import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import APP_CONSTANTS from "@config/AppConstants";
import { useAppContext } from "@context/AppContext";
import "./style.css";

const Sidebar = () => {
  const [dropOpen, setDropOpen] = useState({});
  const { breadcrumbs } = useAppContext();

  const MenuList = [
    {
      id: 1,
      label: "Dashboard",
      icon: "ti ti-smart-home",
      path: "/dashboard",
    },
    {
      id: 2,
      label: "Category",
      icon: "ti ti-users",
      path: "/category/list",
    },
    {
      id: 3,
      label: "Subcategory",
      icon: "ti ti-credit-card",
      path: "/subcategory/list",
    },
    {
      id: 4,
      label: "Products",
      icon: "ti ti-credit-card",
      path: "/products/list",
    },
    {
      id: 5,
      label: "Stock",
      icon: "ti ti-credit-card",
      path: "/stock/list",
    },
    {
      id: 6,
      label: "Billing",
      icon: "ti ti-credit-card",
      path: "/billing/list",
    },
  ];

  const toggleDropOpen = (index) => {
    setDropOpen((prevState) => ({
      ...prevState,
      [index]: !prevState[index],
    }));
  };

  const setHtmlClass = (action, className) => {
    const htmlElement = document.getElementsByTagName("html")[0];
    htmlElement.classList[action](className);

    const logoElement = document.getElementsByClassName("app-mini-logo")[0];
    if (logoElement) {
      logoElement.classList[action](className);
    }
  };

  const handleSideBar = () => {
    const screenWidth = window.innerWidth;

    if (screenWidth <= 1199) {
      setHtmlClass("toggle", "layout-menu-expanded");
    } else {
      setHtmlClass("toggle", "layout-menu-collapsed");
    }
  };

  const handleMouseEnter = () => setHtmlClass("toggle", "layout-menu-hover");
  const handleMouseLeave = () => setHtmlClass("remove", "layout-menu-hover");

  const screenWidth = window.innerWidth;

  return (
    <aside
      id="layout-menu"
      className="layout-menu menu-vertical menu bg-menu-theme"
      onMouseEnter={screenWidth > 1199 ? handleMouseEnter : null}
      onMouseLeave={screenWidth > 1199 ? handleMouseLeave : null}
    >
      <div className="app-brand demo ">
        <Link to="javascript:void(0);" className="app-brand-link">
          <span className="d-none app-mini-logo">
            <img src={APP_CONSTANTS.Favicon} width={34} />
          </span>
          <span className="app-brand-text demo menu-text fw-bold">
            <img src={APP_CONSTANTS.App_Logo} width={150} />
          </span>
        </Link>
        <Link
          to="javascript:void(0);"
          className="layout-menu-toggle menu-link text-large ms-auto"
          onClick={handleSideBar}
        >
          <i className="ti menu-toggle-icon d-none d-xl-block align-middle" />
          <i className="ti ti-x d-block d-xl-none ti-md align-middle" />
        </Link>
      </div>

      <div className="menu-inner-shadow" />
      <div className="menu-inner py-1 ps ps--active-y">
        {MenuList.map((menuItem, index) => {
          const isOpen = dropOpen[index];
          const isActive = menuItem.id === breadcrumbs.activeID;

          if (menuItem.subItems) {
            return (
              <li
                key={index}
                className={`menu-item ${isOpen || isActive ? "open" : ""}`}
              >
                <Link
                  to="javascript:void(0);"
                  className="menu-link menu-toggle"
                  onClick={() => toggleDropOpen(index)}
                >
                  <i className={`menu-icon tf-icons ${menuItem.icon}`} />
                  <div data-i18n={menuItem.label}>{menuItem.label}</div>
                </Link>
                <ul className={`menu-sub ${isOpen ? "open" : ""}`}>
                  {menuItem.subItems.map((subItem, subIndex) => (
                    <NavLink
                      key={subIndex}
                      to={subItem.path}
                      className={`menu-item ${
                        subItem.id === breadcrumbs.activeID ? "active" : ""
                      }`}
                    >
                      <div className="menu-link">
                        <div data-i18n={subItem.label}>{subItem.label}</div>
                      </div>
                    </NavLink>
                  ))}
                </ul>
              </li>
            );
          } else {
            return (
              <Link
                key={index}
                className={`menu-item ${isActive ? "active" : ""}`}
              >
                <NavLink
                  to={menuItem.path}
                  className={`menu-link ${isActive ? "active" : ""}`}
                >
                  <i className={`menu-icon tf-icons ${menuItem.icon}`} />
                  <div data-i18n={menuItem.label}>{menuItem.label}</div>
                </NavLink>
              </Link>
            );
          }
        })}
      </div>
    </aside>
  );
};

export default Sidebar;
