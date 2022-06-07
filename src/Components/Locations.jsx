import Row from "./Row";
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
    //check of het eerste teken een dollarteken is
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

    // Check if input is country, and if yes, return city
    const res = mapResult(locationNumber, location);
    const updatedResult = [...result, res];

    // Convert result into JSON object
    convertResult(updatedResult);

    // Set result in new Input
    setResult(updatedResult);
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();
    // create a new location in Input object
    const city = {
      locationNumber: locationNumber,
      city: location,
    };
    handleAddLocation(city);
  };

  const handleSubmitVars = (e) => {
    e.preventDefault();
    // create a new location in Vars object
    capitalCities[locationNumber] = location;
    const updatedCapitalCities = { ...capitalCities };
    setNewCapitalCities(updatedCapitalCities);
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <h2 className="p-4">Input</h2>
        <AddLocation
          handleSubmit={handleSubmitInput}
          setValueInput={setValueInput}
          setKeyInput={setKeyInput}
        />
        {cities.map((city) => (
          <Row
            key={city.locationNumber}
            value={city.city}
            keys={city.locationNumber}
            capitalCities={capitalCities}
            cities={cities}
            result={result}
            setCities={setCities}
            setResult={setResult}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <h2 className="p-4">Vars</h2>
        <AddLocation
          handleSubmit={handleSubmitVars}
          setValueInput={setValueInput}
          setKeyInput={setKeyInput}
        />

        <div>
          {Object.keys(capitalCities).map((key, i) => (
            <Row
              key={i}
              value={capitalCities[key]}
              keys={key}
              capitalCities={capitalCities}
              cities={cities}
              result={result}
              setCities={setCities}
              setResult={setResult}
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
