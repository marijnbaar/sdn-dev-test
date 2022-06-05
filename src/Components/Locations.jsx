import { Row } from "./Row";
import { useState } from "react";
import { AddLocation } from "./AddLocation";

import { capitalCities } from "../locations";

export const Locations = () => {
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState("");
  const [locationNumber, setLocationNumber] = useState("");
  const [result, setResult] = useState([]);
  const [object, setObject] = useState({});

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
    let object = updatedResult.reduce(
      (json, item) => ({ ...json, [item.locationNumber]: item.location }),
      {}
    );
    setObject(object);
  };
  const handleAddCity = (city) => {
    const updatedCities = [...cities, city];
    setCities(updatedCities);
    const res = mapResult(locationNumber, location);
    const updatedResult = [...result, res];
    convertResult(updatedResult);
    setResult(updatedResult);
  };

  const handleChangeKey = (e) => {
    setLocationNumber(e.target.value);
  };

  const handleChangeValue = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmitInput = (e) => {
    e.preventDefault();

    const city = {
      locationNumber: locationNumber,
      city: location,
    };

    handleAddCity(city);
  };

  const deleteCity = (id) => {
    const updatedCities = cities.filter((city) => city.locationNumber !== id);
    const updatedInput = result.filter(
      (location) => location.locationNumber !== id
    );
    setCities(updatedCities);
    setResult(updatedInput);
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-col">
        <AddLocation
          handleChangeKey={handleChangeKey}
          handleChangeValue={handleChangeValue}
          handleSubmitInput={handleSubmitInput}
        />
        {cities.map((city) => (
          <Row
            key={city.locationNumber}
            city={city.city}
            locationNumber={city.locationNumber}
            deleteCity={deleteCity}
          />
        ))}
      </div>
      <div className="flex flex-col">
        <AddLocation
          handleChangeKey={handleChangeKey}
          handleChangeValue={handleChangeValue}
          handleSubmitInput={handleSubmitInput}
        />
        {cities.map((city) => (
          <Row
            key={city.locationNumber}
            city={city.city}
            locationNumber={city.locationNumber}
            deleteCity={deleteCity}
          />
        ))}
      </div>
      {JSON.stringify(object)}
    </div>
  );
};
