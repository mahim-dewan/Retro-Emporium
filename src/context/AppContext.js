"use client";
import React, { createContext, useContext, useState } from "react";

const AppContext = createContext();

const AppContextProvider = ({ children }) => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  return (
    <AppContext.Provider
      value={{
        openLoginForm,
        setOpenLoginForm,
        openRegisterForm,
        setOpenRegisterForm,
        
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// custom hook
export const useAppContext = () => useContext(AppContext);
export default AppContextProvider;
