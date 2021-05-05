import React, { useState } from "react";
import { FiSun } from "react-icons/fi";
import { FiMoon } from "react-icons/fi";
import "./LightMeter.scss";
import Card from "../UI/Card";
import PropTypes from "prop-types";

LightMeter.propTypes = {
  dayLength: PropTypes.number,
  dayHours: PropTypes.number,
  nightHours: PropTypes.number,
};

function LightMeter({ dayLength, dayHours, nightHours }) {
  const [isShown, setIsShown] = useState(false);
  const dayPercent = Math.round(dayLength * 100);
  const nightPercent = 100 - dayPercent;

  const percentFill = {
    height: `${dayPercent}%`,
  };

  function displayStats() {
    setIsShown(true);
  }

  function hideStats() {
    setIsShown(false);
  }

  return (
    <div
      className="LightMeter"
      onMouseEnter={displayStats}
      onMouseLeave={hideStats}
    >
      <div className="light-info day-percent">
        <FiSun />
        <p>{dayPercent}%</p>
      </div>
      <div className="light-info night-percent">
        <FiMoon />
        <p>{nightPercent}%</p>
      </div>
      <div className="percent" style={percentFill}></div>
      {isShown && (
        <Card className="light-meter__card">
          <div className="light-stats">
            <p>Sunlight: {dayHours} hrs</p>
            <p>Darkness: {nightHours} hrs</p>
          </div>
        </Card>
      )}
    </div>
  );
}

export default LightMeter;
