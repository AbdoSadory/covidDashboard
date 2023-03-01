import React from "react";
import { Line } from "react-chartjs-2";

const Graph = ({ data }) => {
  let options = {
    plugins: { legend: true },
    scales: {
      y: {
        ticks: {
          color: "white",
        },
      },
      x: {
        ticks: {
          color: "white",
        },
      },
    },
  };
  return <Line data={data} options={options} />;
};

export default Graph;
