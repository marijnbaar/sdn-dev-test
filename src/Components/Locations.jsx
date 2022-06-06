import { Row } from "./Row";
import { useState } from "react";
import { AddLocation } from "./AddLocation";

const capitalCities = require("../locations.json");

export const Locations = () => {
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState("");
  const [locationNumber, setLocationNumber] = useState("");
  const [result, setResult] = useState([]);
  const [json, setJson] = useState({});
  const [locationValueVars, setLocationValueVars] = useState("");
  const [locationKeyVars, setLocationKeyVars] = useState("");
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

  const handleChangeKeyInput = (e) => {
    setLocationNumber(e.target.value);
  };

  const handleChangeValueInput = (e) => {
    setLocation(e.target.value);
  };

  const handleChangeKeyVars = (e) => {
    setLocationKeyVars(e.target.value);
  };

  const handleChangeValueVars = (e) => {
    setLocationValueVars(e.target.value);
  };

  const handleSubmitVars = (e) => {
    e.preventDefault();
    capitalCities[locationKeyVars] = locationValueVars;

    const updatedCapitalCities = { ...capitalCities };
    setNewCapitalCities(updatedCapitalCities);
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();

    const city = {
      locationNumber: locationNumber,
      city: location,
    };

    handleAddLocation(city);
  };

  const deleteLocation = (id) => {
    delete capitalCities[id];

    const updatedCities = cities.filter((city) => city.locationNumber !== id);
    const updatedInput = result.filter(
      (location, id) => location.locationNumber !== id
    );
    setCities(updatedCities);
    setResult(updatedInput);
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <h2 className="p-4">Input</h2>
        <AddLocation
          handleChangeKey={handleChangeKeyInput}
          handleChangeValue={handleChangeValueInput}
          handleSubmit={handleSubmitInput}
          setLocation={setLocation}
          setLocationNumber={setLocationNumber}
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
          handleChangeKey={handleChangeKeyVars}
          handleChangeValue={handleChangeValueVars}
          handleSubmit={handleSubmitVars}
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
