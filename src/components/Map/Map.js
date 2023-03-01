import React from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "bootstrap/dist/css/bootstrap.min.css";
import * as styles from "./styles.module.css";
import { defaultIcon } from "../../../static/icons/defaultIcons";

const Map = ({ countries, handleMarkerClick }) => {
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
  return (
    <div className={`${styles.mapContainerParent}`}>
      <MapContainer
        className={`${styles.mapContainer}`}
        center={[27, 30]}
        zoom={4}
        scrollWheelZoom={false}
        worldCopyJump={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {console.log(geoJson.features)}
        {geoJson.features.length > 0 &&
          geoJson.features.map((countryData, index) => (
            <Marker
              eventHandlers={{
                click: (e) => {
                  handleMarkerClick(countryData.properties.countryInfo.iso3);
                },
              }}
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
                    <span>active:</span> {countryData.properties.active}
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
    </div>
  );
};

export default Map;
