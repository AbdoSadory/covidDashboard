import React from "react";
import * as styles from "./styles.module.css";

const TotalValues = ({ cases, deaths, recovered }) => {
  return (
    <section className={`${styles.valuesContainerSection}`}>
      <div className="row justify-content-between m-0 p-0">
        <div
          className={`${styles.valuesContainer} col-12 col-md-4 text-capitalize`}
        >
          <h2 className="m-0 p-0">Total Cases</h2>
          <p className="m-0 p-0">{cases}</p>
        </div>
        <div
          className={`${styles.valuesContainer} col-12 col-md-4 text-capitalize`}
        >
          <h2 className="m-0 p-0">Total deaths</h2>
          <p className="m-0 p-0">{deaths}</p>
        </div>
        <div
          className={`${styles.valuesContainer} col-12 col-md-4 text-capitalize`}
        >
          <h2 className="m-0 p-0">Total recovered</h2>
          <p className="m-0 p-0">{recovered}</p>
        </div>
      </div>
    </section>
  );
};

export default TotalValues;
