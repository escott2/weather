import React from "react";
import { WiWindDeg } from "react-icons/wi";
import "./Wind.scss";

function Wind({ speed, direction, className }) {
  const windDirectionStyle = {
    transform: `scaleY(-1) scaleX(-1) rotate(${direction}deg)`,
  };
  const classes = className ? `wind ${className}` : "wind";

  return (
    <div className={classes}>
      <h4 className="wind__heading">Wind</h4>
      <p>{speed} MPH</p>
      <WiWindDeg style={windDirectionStyle} className="wind-icon--direction" />
    </div>
  );
}

export default Wind;
