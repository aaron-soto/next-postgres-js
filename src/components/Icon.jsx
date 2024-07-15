import React from "react";
import * as Icons from "simple-icons/icons";

const Icon = ({ name, size = 24, color = "black" }) => {
  const icon = Icons[`si${name.charAt(0).toUpperCase()}${name.slice(1)}`];

  if (!icon) {
    return null;
  }

  return (
    <svg
      role="img"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill={color}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d={icon.path} />
    </svg>
  );
};

export default Icon;
