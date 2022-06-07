import { ReactComponent as PlusIcon } from "../assets/svg/plus.svg";

const AddLocation = ({
  handleSubmit,
  setKeyInput,
  setValueInput,
  city,
  locationNumber,
}) => {
  const handleChangeKey = (e) => {
    setKeyInput(e.target.value);
  };

  const handleChangeValue = (e) => {
    setValueInput(e.target.value);
  };
  return (
    <>
      <div className="m-2">
        <form className="flex justify-between w-full" onSubmit={handleSubmit}>
          <input
            name="locationNumber"
            value={locationNumber}
            className="flex rounded shadow p-2 text-grey-dark mr-2"
            onChange={handleChangeKey}
          />
          <input
            name="location"
            value={city}
            className="flex rounded shadow p-2 text-grey-dark mr-2"
            onChange={handleChangeValue}
          />
          <button type="submit" aria-label="Add city">
            <PlusIcon />
          </button>
        </form>
      </div>
    </>
  );
};

export default AddLocation;
