import React, { useEffect } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import * as styles from "./styles.module.css";
import { defaultIcon } from "../../../static/icons/defaultIcons";

const Map = ({ countries }) => {
  let geoJson = {
    type: "FeatureCollection",
    features:
      countries &&
      countries.map((country) => {
        return {
          type: "Feature",
          properties: {
            ...country,
          },
          geometry: {
            type: "Point",
            coordinates: [country.countryInfo.lat, country.countryInfo.long],
          },
        };
      }),
  };
  console.log(countries);
  console.log(geoJson);
  return (
    <section className={`${styles.mapContainerParent}`}>
      <MapContainer
        className={`${styles.mapContainer}`}
        center={[0, 0]}
        zoom={2}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {geoJson.features.length > 0 &&
          geoJson.features.map((countryData, index) => (
            <Marker
              key={index}
              position={[
                countryData.properties.countryInfo.lat,
                countryData.properties.countryInfo.long,
              ]}
              icon={defaultIcon}
            >
              <Popup>
                <h2 className={styles.countryName}>
                  {countryData.properties.countryName}
                </h2>
                <ul className={styles.countryDetails}>
                  <li>
                    <span>population:</span> {countryData.properties.population}
                  </li>
                  <li>
                    <span>cases:</span> {countryData.properties.cases}
                  </li>
                  <li>
                    <span>deaths:</span> {countryData.properties.deaths}
                  </li>
                  <li>
                    <span>recovered:</span> {countryData.properties.recovered}
                  </li>
                </ul>
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </section>
  );
};

export default Map;
