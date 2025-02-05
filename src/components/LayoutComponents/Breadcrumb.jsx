import React from "react";
import { useAppContext } from "@context/AppContext";
import { Link } from "react-router-dom";
// import { AddFormButton } from "@components";

export default function Index() {
  const { breadcrumbs } = useAppContext();

  if (!breadcrumbs) return;

  return (
    <div className="d-flex align-items-center justify-content-between">
      <div>
        <h3 className="main-title">{breadcrumbs.title}</h3>
        <ul className="app-line-breadcrumbs mb-3">
          <li className="">
            <Link to="/dashboard" className="f-s-14 f-w-500">
              <span>
                <i className="ph-duotone  ph-stack f-s-16" /> Dashboard
              </span>
            </Link>
          </li>
          {breadcrumbs.list.map((item, index) => {
            return item.path ? (
              <li key={index}>
                <Link to={item.path} className="f-s-14 f-w-500">
                  {item.label}
                </Link>
              </li>
            ) : (
              <li key={index} className="active">
                <Link to="#" className="f-s-14 f-w-500"></Link>
                {item.label}
              </li>
            );
          })}
        </ul>
      </div>
      {/* <AddFormButton /> */}
    </div>
  );
}
