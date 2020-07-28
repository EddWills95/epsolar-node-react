import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const Battery = ({ state = 0 }) => {
  const calculateWidth = () => {
    const newWidth = (state * 100) / 4;
    return `${newWidth}px`;
  };

  return (
    <div className="batteryContainer">
      <div className="batteryOuter">
        <div
          id="batteryLevel"
          style={{ width: calculateWidth() }}
        >
        </div>
      </div>
      <div className="batteryBump"></div>
      <span>{state * 100}%</span>
    </div>
  );
};

Battery.propTypes = {
  state: PropTypes.number,
};

export default React.memo(Battery);

// Need to work out the ratio of 25px as 100%
// / 4
