export const Row = ({ city, locationNumber, deleteCity }) => (
  <div className="flex flex-row justify-center mt-4">
    <p className="m-2 p-2 border-gray-100 border-2 rounded">{locationNumber}</p>
    <p className="m-2 p-2 border-gray-100 border-2 rounded">{city}</p>
    <div className="p-2">
      <button
        aria-label="Delete input"
        onClick={() => deleteCity(locationNumber)}
      >
        X
      </button>
    </div>
  </div>
);
