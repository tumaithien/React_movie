import React from "react";

const Button = ({
  onClick,
  className = "",
  children,
  full = false,
  type = "button",
  bgColor = "primary",
  ...props
}) => {
  let bgClassName = "bg-primary";
  switch (bgColor) {
    case "primary":
      bgClassName = "bg-primary";
      break;
    case "secondary":
      bgClassName = "bg-secondary";
      break;
    default:
      break;
  }
  return (
    <button
      type={type}
      onClick={onClick}
      className={`py-3 px-6 bg-primary rounded-lg font-medium capitalize mt-auto ${bgClassName} ${className} ${
        full ? "w-full" : ""
      }`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
