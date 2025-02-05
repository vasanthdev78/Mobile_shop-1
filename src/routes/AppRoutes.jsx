import React from "react";
import { createBrowserRouter, Navigate } from "react-router-dom";
import MainLayout from "@layouts/MainLayout";
import * as Pages from "@pages";
import ErrorBoundary from "./ErrorBoundary";

const AppRoutes = createBrowserRouter([
  {
    path: "/login",
    element: <Pages.Login />, 
    errorElement: <ErrorBoundary />,
  },
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <ErrorBoundary />,
    children: [
      { index: true, element: <Navigate to="/dashboard" replace /> }, 
      { path: "dashboard", element: <Pages.Dashboard /> },
      {
        path: "category",
        children: [
          { path: "list", element: <Pages.CategoryList /> },
          { path: "form/:uuid?", element: <Pages.CategoryForm /> },
          { path: "view/:uuid", element: <Pages.CategoryView /> }, 
        ],
      },
      {
        path: "subcategory",
        children: [
          { path: "list", element: <Pages.SubCategoryList /> },
          { path: "form/:uuid?", element: <Pages.SubCategoryForm /> },
          { path: "view/:uuid", element: <Pages.SubCategoryView /> }, 
        ],
      },
      {
        path: "products",
        children: [
          { path: "list", element: <Pages.ProductList /> },
          { path: "form/:uuid?", element: <Pages.ProductForm /> },
          { path: "view/:uuid", element: <Pages.ProductView /> }, 
        ],
      },
      {
        path: "stock",
        children: [
          { path: "list", element: <Pages.StockList /> },
          { path: "form/:uuid?", element: <Pages.StockForm /> },
          { path: "view/:uuid", element: <Pages.StockView /> }, 
        ],
      },
      {
        path: "billing",
        children: [
          { path: "list", element: <Pages.BillingList /> },
          { path: "form/:uuid?", element: <Pages.BillingForm /> },
          { path: "view/:uuid", element: <Pages.BillingView /> }, 
        ],
      },
      {
        path: "attendance",
        children: [
          { path: "list", element: <Pages.AttendanceList /> },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <ErrorBoundary />, 
  },
]);

export default AppRoutes;