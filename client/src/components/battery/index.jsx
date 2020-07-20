import React from "react";
import PropTypes from "prop-types";

import "./style.scss";

const Battery = ({ state }) => {
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
                ></div>
            </div>
            <div className="batteryBump"></div>
        </div>
    );
};

Battery.propTypes = {
    state: PropTypes.number,
};

export default Battery;

// Need to work out the ratio of 25px as 100%
// / 4
