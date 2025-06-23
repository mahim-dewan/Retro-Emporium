"use client"
import React from 'react'

const Button = ({ children,className, handler}) => {
  return (
    <button onClick={handler} className={className}>
      {children}
    </button>
  );
};

export default Button