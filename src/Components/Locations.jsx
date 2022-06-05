import { Row } from "./Row";
import { useState } from "react";
import { AddLocation } from "./AddLocation";
import { v4 as uuidv4 } from "uuid";

import { capitalCities } from "../locations";

export const Locations = () => {
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState("");
  const [locationNumber, setLocationNumber] = useState("");
  const [result, setResult] = useState([]);

  const mapResult = (locationNumber, location) => {
    //checken of het eerste teken een dollarteken is
    if (location.charAt(0) !== "$") {
      return locationNumber;
    }
    location = location.slice(1);
    let country = Object.keys(capitalCities).find((key) =>
      capitalCities[key].includes(location)
    );
    let result = {
      id: uuidv4(),
      locationNumber: locationNumber,
      country: country,
    };

    return result;
  };

  const convertResult = (updatedResult) => {
    console.log("test1", updatedResult);
    let updatedObject = updatedResult.reduce(
      (json, item) => ({ ...json, [item.locationNumber]: item.country }),
      {}
    );
    console.log("updateobj", updatedObject);
  };
  const handleAddCity = (city) => {
    const updatedCities = [...cities, city];
    setCities(updatedCities);
    const res = mapResult(locationNumber, location);
    const updatedResult = [...result, res];
    console.log(updatedResult);
    convertResult(updatedResult);
    setResult(updatedResult);
  };

  const handleChangeKey = (e) => {
    setLocationNumber(e.target.value);
  };

  const handleChangeValue = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmitCity = (e) => {
    e.preventDefault();

    const city = {
      locationNumber: locationNumber,
      city: location,
    };

    handleAddCity(city);
  };

  const deleteCity = (id) => {
    const updatedCities = cities.filter((city) => city.locationNumber !== id);
    setCities(updatedCities);
  };

  return (
    <section>
      <AddLocation
        handleChangeKey={handleChangeKey}
        handleChangeValue={handleChangeValue}
        handleSubmitCity={handleSubmitCity}
      />
      {cities.map((city) => (
        <Row
          key={city.locationNumber}
          city={city.city}
          locationNumber={city.locationNumber}
          deleteCity={deleteCity}
        />
      ))}
      {JSON.stringify(result)}
    </section>
  );
};
