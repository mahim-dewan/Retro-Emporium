"use client";

import React, { createContext, useContext, useState } from "react";
import LoginForm from "@/components/auth/LoginForm";
import RegisterForm from "@/components/auth/RegisterForm";

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
      {/* Conditionally render modals */}
      {openLoginForm && (
        <LoginForm className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}

      {openRegisterForm && (
        <RegisterForm className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      )}

      {children}
    </AuthModalsContext.Provider>
  );
};

// Custom hook for easy usage
export const useAuthModalsContext = () => useContext(AuthModalsContext);

export default AuthModalsProvider;
 