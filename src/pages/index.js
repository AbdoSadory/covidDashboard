import axios from "axios";
import * as React from "react";
import { useCallback, useEffect, useState } from "react";
import Map from "../components/Map/Map";
import "bootstrap/dist/css/bootstrap.min.css";
import "/static/style/index.css";
import TotalValues from "../components/Total/TotalValues";
import Graphs from "../components/Graphs/Graphs";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Legend,
  Tooltip,
} from "chart.js";

ChartJS.register({
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Filler,
  Legend,
  Tooltip,
});

export default function Home() {
  let [isLoading, setIsLoading] = useState(false);
  let [countriesData, setCountriesData] = useState([]);
  let [worldwideData, setWorldwideData] = useState([]);
  let [historicalData, setHistoricalData] = useState({
    cases: {
      data: {
        labels: ["0", "0", "0"],
        datasets: [
          {
            label: "no label",
            data: [0, 5, 10],
          },
        ],
      },
    },
    deaths: {
      data: {
        labels: ["0", "0", "0"],
        datasets: [
          {
            label: "no label",
            data: [0, 5, 10],
          },
        ],
      },
    },
    recovered: {
      data: {
        labels: ["0", "0", "0"],
        datasets: [
          {
            label: "no label",
            data: [0, 5, 10],
          },
        ],
      },
    },
  });
  let [countryData, setCountryData] = useState({
    cases: {
      data: {
        labels: ["0", "0", "0"],
        datasets: [
          {
            label: "no label",
            data: [0, 5, 10],
          },
        ],
      },
    },
    deaths: {
      data: {
        labels: ["0", "0", "0"],
        datasets: [
          {
            label: "no label",
            data: [0, 5, 10],
          },
        ],
      },
    },
    recovered: {
      data: {
        labels: ["0", "0", "0"],
        datasets: [
          {
            label: "no label",
            data: [0, 5, 10],
          },
        ],
      },
    },
  });
  const numbersPerDay = (data) => {
    let chartData = [data[0]];
    let lastDataPoint = data[0];
    data.forEach((element, index) => {
      if (lastDataPoint && data[index + 1]) {
        const newDataPoint = Math.abs(+data[index + 1] - +element);
        chartData.push(newDataPoint);
      }
      lastDataPoint = data[index + 1];
    });
    return chartData;
  };
  const dataRequest = useCallback(async () => {
    setIsLoading(true);
    try {
      await axios
        .get("https://disease.sh/v3/covid-19/countries/")
        .then((res) =>
          setCountriesData(
            res.data
              .filter((country) => country.country !== "Palestine")
              .map((country) => {
                return {
                  countryName: country.country,
                  countryInfo: country.countryInfo,
                  active: country.active,
                  cases: country.cases,
                  deaths: country.deaths,
                  recovered: country.recovered,
                  population: country.population,
                };
              })
          )
        )
        .catch((err) => {
          console.log(err.message);
        });
      await axios
        .get("https://disease.sh/v3/covid-19/all")
        .then((res) => setWorldwideData(res.data));
      await axios
        .get("https://disease.sh/v3/covid-19/historical/all?lastdays=all")
        .then((res) => {
          setHistoricalData({
            cases: {
              data: {
                labels: Object.keys(res.data.cases),
                datasets: [
                  {
                    label: "cases",
                    data: numbersPerDay(Object.values(res.data.cases)),
                    pointBackgroundColor: "white",
                    fill: true,
                    tension: 0.4,
                    borderColor: "#dcd7c9",
                    pointStyle: false,
                    // showLine:false,
                  },
                ],
              },
            },
            deaths: {
              data: {
                labels: Object.keys(res.data.deaths),
                datasets: [
                  {
                    label: "deaths",
                    data: numbersPerDay(Object.values(res.data.deaths)),
                    pointBackgroundColor: "white",
                    fill: true,
                    tension: 0.4,
                    borderColor: "#dcd7c9",
                    pointStyle: false,
                    // showLine:false,
                  },
                ],
              },
            },
            recovered: {
              data: {
                labels: Object.keys(res.data.recovered),
                datasets: [
                  {
                    label: "recovered",
                    data: numbersPerDay(Object.values(res.data.recovered)),
                    pointBackgroundColor: "white",
                    fill: true,
                    tension: 0,
                    borderColor: "#dcd7c9",
                    pointStyle: false,
                  },
                ],
              },
            },
          });
        });
    } catch (e) {
      console.log(e.message);
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);
  const getCountryHistory = async (countryName) => {
    await axios
      .get(
        `https://disease.sh/v3/covid-19/historical/${countryName}?lastdays=all`
      )
      .then((res) => {
        setCountryData({
          cases: {
            data: {
              labels: Object.keys(res.data.timeline.cases),
              datasets: [
                {
                  label: "cases",
                  data: numbersPerDay(Object.values(res.data.timeline.cases)),
                  pointBackgroundColor: "white",
                  fill: true,
                  tension: 0.4,
                  borderColor: "#dcd7c9",
                  pointStyle: false,
                },
              ],
            },
          },
          deaths: {
            data: {
              labels: Object.keys(res.data.timeline.deaths),
              datasets: [
                {
                  label: "deaths",
                  data: numbersPerDay(Object.values(res.data.timeline.deaths)),
                  pointBackgroundColor: "white",
                  fill: true,
                  tension: 0.4,
                  borderColor: "#dcd7c9",
                  pointStyle: false,
                },
              ],
            },
          },
          recovered: {
            data: {
              labels: Object.keys(res.data.timeline.recovered),
              datasets: [
                {
                  label: "recovered",
                  data: numbersPerDay(
                    Object.values(res.data.timeline.recovered)
                  ),
                  pointBackgroundColor: "white",
                  fill: true,
                  tension: 0,
                  borderColor: "#dcd7c9",
                  pointStyle: false,
                },
              ],
            },
          },
        });
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  useEffect(() => {
    dataRequest();
  }, [dataRequest]);
  return (
    <>
      {!isLoading ? (
        <main>
          <div className="container pb-4">
            <header>Welcome To Covid19 Dasboard</header>
            <div className="row justify-content-between">
              <div className="col-12 col-md-8 align-stretch">
                <Map
                  countries={countriesData && countriesData}
                  handleMarkerClick={getCountryHistory}
                />
              </div>
              <div className="col-12 col-md-4">
                <h2 className="CountryLogsHeader">Country Logs</h2>
                <Graphs historicalData={countryData} />
              </div>
            </div>
            <TotalValues
              cases={worldwideData.cases}
              deaths={worldwideData.deaths}
              recovered={worldwideData.recovered}
            />
            <Graphs historicalData={historicalData} />
          </div>
        </main>
      ) : (
        <section>Loading</section>
      )}
    </>
  );
}
