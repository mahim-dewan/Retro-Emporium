"use client";
import { createContext, useContext, useState } from "react";

const EditFormModalContext = createContext();

const EditFormModalProvider = ({ children }) => {
  const [editMode, setEditMode] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  return (
    <EditFormModalContext.Provider value={{ editMode, setEditMode,selectedProduct,setSelectedProduct }}>
      {children}
    </EditFormModalContext.Provider>
  );
};

// Hook
export const useEditModalContext = () => useContext(EditFormModalContext);

export default EditFormModalProvider;
