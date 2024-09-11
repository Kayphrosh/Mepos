import React from "react";
import "./button.scss";

const Button = ({ children, type, onClick, className }) => {
  return (
    <button type={type} onClick={onClick} className={className}>
      {children}
    </button>
  );
};

export default Button;
