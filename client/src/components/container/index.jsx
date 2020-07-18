import React, { useState, useEffect } from "react";
import Data from "../data";

import { endpointUrl } from "../../constants";

const Container = ({ children }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    fetch(endpointUrl + "/readings?limit=10", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        setData(data);
      });
  }, []);

  return (
    <div>
      {data.map((reading, index) => <Data key={index} reading={reading} />)}
    </div>
  );
};

export default Container;
