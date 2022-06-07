const Row = ({
  value,
  keys,
  capitalCities,
  cities,
  result,
  setCities,
  setResult,
}) => {
  const deleteLocation = (id) => {
    let deletedCity = capitalCities[id];
    delete capitalCities[id];
    if (deletedCity) {
      const updateInput = cities.filter((city) => city.city !== deletedCity);
      setCities(updateInput);
    } else {
      const updatedCities = cities.filter((city) => city.locationNumber !== id);
      const updatedResult = result.filter(
        (location, id) => location.locationNumber !== id
      );
      setCities(updatedCities);
      setResult(updatedResult);
    }
  };
  return (
    <>
      <div className="flex flex-row justify-center mt-4 mr-5 ml-1">
        <p className="flex-1 p-2 mr-1 border-gray-100 border-2 rounded">
          {keys}
        </p>
        <p className="flex-1 p-2 border-gray-100 border-2 rounded">{value}</p>
        <div className="p-3">
          <button
            aria-label="Delete input"
            onClick={() => deleteLocation(keys)}
          >
            X
          </button>
        </div>
      </div>
    </>
  );
};

export default Row;
