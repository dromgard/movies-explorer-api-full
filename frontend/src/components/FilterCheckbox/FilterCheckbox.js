import React from "react";

function FilterCheckbox({ filtercheckbox, handleCheckbox }) {
  return (
    <label className="filtercheckbox">
      <input
        type="checkbox"
        className="filtercheckbox__input checkbox"
        name="checkbox"
        id="checkbox"
        aria-label="Показать короткометражки"
        checked={filtercheckbox}
        onChange={() => handleCheckbox(!filtercheckbox)}
      />
      <span className="filtercheckbox__text">Короткометражки</span>
    </label>
  )
}

export default FilterCheckbox;
