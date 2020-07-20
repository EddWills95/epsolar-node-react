import React from "react";

const Data = ({ name, value }) => (
    <div className="data">
        <h3 className="title">{name}</h3>
        <p>{value}</p>
    </div>
);

export default Data;
