import React, { useState } from "react";
import FilterCheckbox from "../FilterCheckbox/FilterCheckbox";
import searchButtonLine from "../../images/search-button-line.svg"
import searchButtonArrow from "../../images/search-button-arrow.svg"

function SearchForm({ onSubmit, savedSearchName, savedSearchShorts, locationPathname }) {
  // States.
  const [searchName, setSearchName] = useState(savedSearchName); // Последний запрос из сохраненок.
  const [searchShorts, setSearchShorts] = useState(savedSearchShorts); // Последний чекбокс из сохраненок.
  const [isRequestEmpty, setIsRequestEmpty] = useState(false); // Статус пустого запроса.


  // Функции обработчики.
  const handleSearchName = (e) => {

    // Если запрос введен, убираем ошибку (для красоты).
    if (e.target.value.length > 0) {
      setIsRequestEmpty(false)
    }

    setSearchName(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    // Проверяем не пустой ли запрос.
    if (locationPathname === "/movies" && searchName.length === 0) {
      setIsRequestEmpty(true);
      return
    }

    setIsRequestEmpty(false);
    onSubmit(searchName, searchShorts);
  }

  const handleCheckbox = (checkboxstatus) => {
    onSubmit(searchName, checkboxstatus);
    setSearchShorts(checkboxstatus);
  }

  return (
    <section className="search-form">
      <form className="search-form__form" name="search-form" onSubmit={handleSubmit}>
        <div className="search-form__container">
          <input
            className="search-form__input input"
            type="text"
            id="search-input"
            aria-label="Введите название фильма"
            placeholder="Фильм"
            name="search-input"
            value={searchName}
            onChange={handleSearchName}
          />
          <button
            className="search-form__submit button"
            type="submit"
            aria-label="Найти фильм"
            title="Найти фильм"
          >
            <img src={searchButtonLine} alt="Поиск" />
            <img src={searchButtonArrow} alt="Поиск" />
          </button>
        </div>
        <span className="search-form__input-error">{isRequestEmpty && "Нужно ввести ключевое слово"}</span>
        <FilterCheckbox filtercheckbox={searchShorts} handleCheckbox={handleCheckbox} />
      </form>
    </section>
  );
}

export default SearchForm;
