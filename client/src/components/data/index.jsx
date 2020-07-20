import React from "react";
import Battery from "../battery";

const Data = ({ name, value }) => (
    <React.Fragment>
        {name === "state_of_charge" ? (
            <div className="data">
                <h3 className="title">{name}</h3>
                <Battery state={value} />
                <p>{value}</p>
            </div>
        ) : (
            <div className="data">
                <h3 className="title">{name}</h3>
                <p>{value}</p>
            </div>
        )}
    </React.Fragment>
);

export default Data;
