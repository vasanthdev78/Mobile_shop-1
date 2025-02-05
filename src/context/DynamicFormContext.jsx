import { createContext, useContext, useEffect, useState } from "react";

const DynamicFormContext = createContext();

function DynamicFormContextProvider({ children }) {
  const [dynamicFormMeta, setDynamicFormMeta] = useState();
  const [handlers, setHandlers] = useState({});
  const [modalUUID, setModalUUID] = useState();
  const [addFormData, setAddFormData] = useState({
    hidden: true,
    buttonName: "Add new",
    link: "#",
  });
  const [trigger, setTrigger] = useState(false);

  function updateHandleGetFiles(name, handler) {
    setHandlers((prev) => ({
      ...prev,
      [name]: handler,
    }));
  }

  function executeHandleGetFiles() {
    const promises = Object.entries(handlers).map(([name, handler]) =>
      handler().then((result) => ({ name, result }))
    );

    return Promise.all(promises);
  }

  // useEffect(() => console.log("Modal UUID :" + modalUUID), [modalUUID]);

  return (
    <DynamicFormContext.Provider
      value={{
        dynamicFormMeta,
        setDynamicFormMeta,
        modalUUID,
        setModalUUID,
        updateHandleGetFiles,
        executeHandleGetFiles,
        addFormData,
        setAddFormData,
        trigger,
        setTrigger,
      }}
    >
      {children}
    </DynamicFormContext.Provider>
  );
}

export default DynamicFormContextProvider;

export const useDynamicFormContext = () => useContext(DynamicFormContext);
