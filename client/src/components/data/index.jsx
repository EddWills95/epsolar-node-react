import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";

const Data = ({ data, title, endpoint }) => {
  const [chartData, setChartData] = useState(undefined);
  const [showChart, setShowChart] = useState(false);

  const generateSuffix = (label) => {
    const lowerCaseLabel = label.toLowerCase();
    if (lowerCaseLabel.includes("voltage")) return "V";
    if (lowerCaseLabel.includes("power")) return "W";
    if (lowerCaseLabel.includes("current")) return "A";
    if (lowerCaseLabel.includes("generated")) return "kW/h";
  };

  const handleShowHideData = async () => {
    if (!chartData) {
      await fetch(`http://192.168.0.55:8080/${endpoint}`)
        .then((response) => response.json())
        .then((json) => json.map((i) => i.value))
        .then((data) => {
          setShowChart(true);
          setChartData(data);
          return;
        });
    }

    if (chartData && showChart) {
      setShowChart(false);
      return;
    }

    setShowChart(true);
  };

  const options = {
    chart: {
      height: 350,
      type: "line",
      zoom: {
        enabled: false,
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      curve: "straight",
    },
    grid: {
      row: {
        colors: ["#f3f3f3", "transparent"], // takes an array which will be repeated on columns
        opacity: 0.5,
      },
    },
  };

  return (
    <div className="data-container">
      <h2 className="data-container__title">{title}</h2>
      {data.map((data, index) => (
        <div className="data-container__data" key={index}>
          <p>{data.label}</p>
          <p>
            {data.value}
            <span className="data-container__data__suffix">
              {generateSuffix(data.label)}
            </span>
          </p>
        </div>
      ))}
      <button className="data-container__button" onClick={handleShowHideData}>
        {showChart ? "Hide" : "Show"} data chart
      </button>
      {showChart && (
        <Chart
          type="line"
          series={[{ name: title, data: chartData }]}
          options={options}
        />
      )}
    </div>
  );
};

export default Data;
