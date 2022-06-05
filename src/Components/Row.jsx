export const Row = ({ city, cityOrder, id, deleteCity }) => (
  <div className="flex flex-row justify-center mt-4">
    <p className="m-2 p-2 border-gray-100 border-2 rounded">{cityOrder}</p>
    <p className="m-2 p-2 border-gray-100 border-2 rounded">{city}</p>
    <div className="p-2">
      <button aria-label="Delete input" onClick={() => deleteCity(id)}>
        X
      </button>
    </div>
  </div>
);
