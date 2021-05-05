import React from "react";
import "./Card.scss";

function Card({ className, children }) {
  const classes = className ? `Card ${className}` : "Card";

  return <div className={classes}>{children}</div>;
}

export default Card;
