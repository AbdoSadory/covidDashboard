import axios from "axios";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Map from "../components/Map/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "/static/style/index.css";

export default function Home() {
  let [isLoading, setIsLoading] = useState(false);
  let [countriesData, setCountriesData] = useState([]);
  let [worldwideData, setWorldwideData] = useState([]);
  let [historicalData, setHistoricalData] = useState([]);

  const dataRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios.get("https://disease.sh/v3/covid-19/countries/").then((res) =>
        setCountriesData(
          res.data
            .filter((country) => country.country !== "Israel")
            .map((country) => {
              return {
                countryName: country.country,
                countryInfo: country.countryInfo,
                cases: country.cases,
                deaths: country.deaths,
                recovered: country.recovered,
                population: country.population,
              };
            })
        )
      );
      await axios
        .get("https://disease.sh/v3/covid-19/all")
        .then((res) => setWorldwideData(res.data));
      await axios
        .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
        .then((res) => setHistoricalData(res.data));
    } catch (e) {
      console.log(e.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  useEffect(() => {
    dataRequest();
  }, [dataRequest]);
  return (
    <main>
      {!isLoading ? (
        <div className="container">
          <header>Welcome To Covid19 Dasboard</header>
          <Map countries={countriesData && countriesData} />
          <section>
            <div className="row justify-content-between m-0 p-0">
              <div className="col-12 col-md-4 m-0 p-2">blah</div>
              <div className="col-12 col-md-4 m-0 p-2">blah</div>
              <div className="col-12 col-md-4 m-0 p-2">blah</div>
            </div>
          </section>
          <section>
            <div className="row justify-content-between m-0 p-0">
              <div className="col-12 col-md-6 m-0 p-2">Graph</div>
              <div className="col-12 col-md-6 m-0 p-2">Graph</div>
            </div>
          </section>
        </div>
      ) : (
        <section>Loading</section>
      )}
    </main>
  );
}
