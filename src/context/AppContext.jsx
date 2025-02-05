import { act, createContext, useContext, useEffect, useState } from "react";
import { getUserDetails } from "@api/urls";

const AppContext = createContext();

function AppContextProvider({ children }) {
  const [breadcrumbs, setBreadcrumbs] = useState({ activeID: 0 });
  const [sidebarToggle, setSidebarToggle] = useState(false);
  const [userDetails, setUserDetails] = useState();

  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;
      if (screenWidth <= 1200) {
        setSidebarToggle(false);
      }
    };
    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // useEffect(() => {
  //   const token = localStorage.getItem("accessToken");
  //   const FatchData = async () => {
  //     const response = await getUserDetails();
  //     setUserDetails(response);
  //   };
  //   if (token) {
  //     FatchData();
  //   }
  // }, []);

  return (
    <AppContext.Provider
      value={{
        breadcrumbs,
        setBreadcrumbs,

        sidebarToggle,
        setSidebarToggle,

        userDetails,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export default AppContextProvider;

export const useAppContext = () => useContext(AppContext);
