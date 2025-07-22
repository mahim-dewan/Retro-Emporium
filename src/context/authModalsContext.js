"use client";
import React, { createContext, useContext, useState } from "react";

const AuthModalsContext = createContext();

const AuthModalsProvider = ({ children }) => {
  const [openLoginForm, setOpenLoginForm] = useState(false);
  const [openRegisterForm, setOpenRegisterForm] = useState(false);
  return (
    <AuthModalsContext.Provider
      value={{
        openLoginForm,
        setOpenLoginForm,
        openRegisterForm,
        setOpenRegisterForm,
      }}
    >
      {children}
    </AuthModalsContext.Provider>
  );
};

// custom hook
export const useAuthModalsContext = () => useContext(AuthModalsContext);
export default AuthModalsProvider;
