import React from "react";
import * as styles from "./styles.module.css";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
} from "chart.js";
import Graph from "./GraphsComponents/Graph";
ChartJS.register({
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
});
const Graphs = ({ historicalData }) => {
  return (
    <section className={`${styles.graphsContainerSection}`}>
      <div className="row justify-content-between m-0 p-0">
        <div className={`${styles.graphContainer} col-12`}>
          <h3 className="text-capitalize">Cases log</h3>
          <Graph
            data={historicalData.cases.data}
        
          />
        </div>
        <div className={`${styles.graphContainer} col-12`}>
          <h3 className="text-capitalize">deaths log</h3>
          <Graph
            data={historicalData.deaths.data}
          
          />
        </div>
        <div className={`${styles.graphContainer} col-12`}>
          <h3 className="text-capitalize">recovered log</h3>
          <Graph
            data={historicalData.recovered.data}
          
          />
        </div>
      </div>
    </section>
  );
};

export default Graphs;
