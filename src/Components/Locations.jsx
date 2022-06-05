import { Row } from "./Row";
import { useState } from "react";
import { AddLocation } from "./AddLocation";
import { v4 as uuidv4 } from "uuid";

import { capitalCities } from "../locations";

export const Locations = () => {
  const [cities, setCities] = useState([]);
  const [location, setLocation] = useState("");
  const [cityOrder, setCityOrder] = useState("");
  const [result, setResult] = useState([]);

  const mapResult = (cityOrder, location) => {
    //checken of het eerste teken een dollarteken is
    if (location.charAt(0) !== "$") {
      return cityOrder;
    }
    location = location.slice(1);
    let country = Object.keys(capitalCities).find((key) =>
      capitalCities[key].includes(location)
    );
    let result = {
      id: uuidv4(),
      cityOrder: cityOrder,
      country: country,
    };

    return result;
  };

  const convertResult = (updatedResult) => {
    console.log("test1", updatedResult);
    let updatedObject = updatedResult.reduce(
      (json, item) => ({ ...json, [item.cityOrder]: item.country }),
      {}
    );
    console.log("updateobj", updatedObject);
  };
  const handleAddCity = (city) => {
    const updatedCities = [...cities, city];
    setCities(updatedCities);
    const res = mapResult(cityOrder, location);
    const updatedResult = [...result, res];
    console.log(updatedResult);
    convertResult(updatedResult);
    setResult(updatedResult);
  };

  const handleChangeKey = (e) => {
    setCityOrder(e.target.value);
  };

  const handleChangeValue = (e) => {
    setLocation(e.target.value);
  };

  const handleSubmitCity = (e) => {
    e.preventDefault();

    const city = {
      id: uuidv4(),
      cityOrder: cityOrder,
      city: location,
    };

    handleAddCity(city);
  };

  const deleteCity = (id) => {
    const updatedCities = cities.filter((city) => city.id !== id);
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
          key={city.id}
          id={city.id}
          city={city.city}
          cityOrder={city.cityOrder}
          deleteCity={deleteCity}
        />
      ))}
      {JSON.stringify(result)}
    </section>
  );
};
