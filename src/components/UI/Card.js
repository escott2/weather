import React from "react";
import "./Card.scss";

function Card(props) {
  const classes = props.className ? `Card ${props.className}` : "Card";

  return <div className={classes}>{props.children}</div>;
}

export default Card;
