import React from "react";
import { RouterProvider } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes";
import DynamicFormContextProvider from "@context/DynamicFormContext";
import "./styles/App.css";

function App() {
  return (
    <DynamicFormContextProvider>
      <RouterProvider router={AppRoutes} />
    </DynamicFormContextProvider>
  );
}

export default App;
