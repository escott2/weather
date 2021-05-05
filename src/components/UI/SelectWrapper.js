import React from "react";
import { RiArrowDownSFill } from "react-icons/ri";
import "./SelectWrapper.scss";

function SelectWrapper({ className, children }) {
  const classes = className ? `select ${className}` : "select";

  return (
    <div className={classes}>
      {children}
      <RiArrowDownSFill className="select-arrow" />
    </div>
  );
}

export default SelectWrapper;
