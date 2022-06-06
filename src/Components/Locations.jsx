import { Row } from "./Row";
import { useState } from "react";

import AddLocation from "./AddLocation";

const capitalCities = require("../locations.json");

export const Locations = () => {
  const [cities, setCities] = useState([]);
  const [location, setValueInput] = useState("");
  const [locationNumber, setKeyInput] = useState("");
  const [result, setResult] = useState([]);
  const [json, setJson] = useState({});
  const [newCapitalCities, setNewCapitalCities] = useState("");

  const mapResult = (locationNumber, location) => {
    //checken of het eerste teken een dollarteken is
    if (location.charAt(0) !== "$") {
      let result = { locationNumber: locationNumber, location: location };
      return result;
    } else {
      location = location.slice(1);
      let newLocation = capitalCities[location];
      let result = {
        locationNumber: locationNumber,
        location: newLocation,
      };
      return result;
    }
  };

  const convertResult = (updatedResult) => {
    let json = updatedResult.reduce(
      (json, item) => ({ ...json, [item.locationNumber]: item.location }),
      {}
    );
    setJson(json);
  };

  const handleAddLocation = (city) => {
    const updatedCities = [...cities, city];
    setCities(updatedCities);

    const res = mapResult(locationNumber, location);
    const updatedResult = [...result, res];
    convertResult(updatedResult);
    setResult(updatedResult);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const city = {
      locationNumber: locationNumber,
      city: location,
    };
    handleAddLocation(city);

    capitalCities[locationNumber] = location;
    const updatedCapitalCities = { ...capitalCities };
    setNewCapitalCities(updatedCapitalCities);
  };

  const deleteLocation = (id) => {
    let deletedCity = capitalCities[id];
    delete capitalCities[id];
    const updateInput = cities.filter((city) => city.city !== deletedCity);
    const updatedCities = cities.filter((city) => city.locationNumber !== id);
    const updatedResult = result.filter(
      (location, id) => location.locationNumber !== id
    );
    setCities(updateInput);
    setCities(updatedCities);
    setResult(updatedResult);
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <h2 className="p-4">Input</h2>
        <AddLocation
          handleSubmit={handleSubmit}
          setValueInput={setValueInput}
          setKeyInput={setKeyInput}
        />
        {cities.map((city) => (
          <Row
            key={city.locationNumber}
            value={city.city}
            keys={city.locationNumber}
            deleteLocation={deleteLocation}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <h2 className="p-4">Vars</h2>
        <AddLocation
          handleSubmit={handleSubmit}
          setValueInput={setValueInput}
          setKeyInput={setKeyInput}
        />

        <div>
          {Object.keys(capitalCities).map((key, i) => (
            <Row
              key={i}
              value={capitalCities[key]}
              keys={key}
              deleteLocation={deleteLocation}
            />
          ))}
        </div>
      </div>
      <div>
        <h2 className="p-4">Output</h2>
        <pre className="p-6">{JSON.stringify(json, null, 4)}</pre>
      </div>
    </div>
  );
};
