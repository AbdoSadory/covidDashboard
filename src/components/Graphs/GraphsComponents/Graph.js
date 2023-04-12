import React from "react";
import { Line } from "react-chartjs-2";

const Graph = ({ data }) => {
  let options = {
    plugins: {
      legend: {
        labels: {
          color: "#dcd7c9",
          font:{
            size:"12px"
          }
        },
      },
    },
    scales: {
      y: {
        ticks: {
          color: "#dcd7c9",
        },
      },
      x: {
        ticks: {
          color: "#dcd7c9",
        },
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default Graph;
