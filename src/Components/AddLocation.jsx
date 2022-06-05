import { ReactComponent as PlusIcon } from "../assets/svg/plus.svg";

export const AddLocation = ({
  handleSubmitCity,
  city,
  cityOrder,
  handleChangeKey,
  handleChangeValue,
}) => (
  <div className="m-11">
    <form className="flex justify-between w-full" onSubmit={handleSubmitCity}>
      <input
        name="location"
        value={cityOrder}
        className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
        onChange={handleChangeKey}
      />
      <input
        name="location"
        value={city}
        className="flex-1 rounded shadow p-2 text-grey-dark mr-2"
        onChange={handleChangeValue}
      />
      <button type="submit" aria-label="Add city">
        <PlusIcon />
      </button>
    </form>
  </div>
);
