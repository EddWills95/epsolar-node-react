import React, { useState, useEffect } from "react";
import usePrevious from "../../hooks/use-previous";

import { labelMapper } from "../../utils/label-mapper";

const Data = ({ name, value }) => {
    const [additionalClass, setClass] = useState("");
    const previousValue = usePrevious(value);

    // useEffect(() => {
    //     if (value !== previousValue) {
    //         if (value > previousValue) {
    //             // flash green
    //             setClass("increase");
    //         }

    //         if (value < previousValue) {
    //             // flash red;
    //             setClass("decrease");
    //         }

    //         setTimeout(() => {
    //             setClass("");
    //         }, 1100);
    //     }
    // }, [value, previousValue]);

    const postfix = () => {
        if (name.includes("current")) return "A";
        if (name.includes("voltage")) return "V";
    };

    return (
        <React.Fragment>
            <div className={`data ${additionalClass}`}>
                <h3 className="title">{labelMapper(name)}</h3>
                <p className="value">
                    {value}
                    <span className="value__postfix">{postfix()}</span>
                </p>
            </div>
        </React.Fragment>
    );
};

export default Data;
