import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Preloader from "../Preloader/Preloader";
import SearchForm from "../SearchForm/SearchForm";

function SavedMovies({
  isLoadingData,
  savedMovies,
  handleSearchSavedMovies,
  onSaveMovie,
  isFavouritesMoviesApiError,

}) {

  const savedSearchName = localStorage.getItem("search-name-saved") || "";
  const savedSearchShorts = (localStorage.getItem("search-isShorts-saved") === "true") ? true : false;

  const handleSubmit = (request, filtercheckbox) => {
    handleSearchSavedMovies(request, filtercheckbox);
  }

  let location = useLocation();

  useEffect(() => {
    handleSearchSavedMovies(savedSearchName, savedSearchShorts);
  }, [])

  return (
    <>
      <SearchForm onSubmit={handleSubmit} savedSearchName={savedSearchName} savedSearchShorts={savedSearchShorts} />
      {isLoadingData && (
        <Preloader />
      )}
      {!isLoadingData && savedMovies.length === 0 && (
        <span className="section-text section-text_movies">Ничего не найдено.</span>
      )}
      {isFavouritesMoviesApiError && (
        <span className="section-text section-text_movies">Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.</span>
      )}
      <MoviesCardList
        data={savedMovies}
        locationPathname={location.pathname}
        onSaveMovie={onSaveMovie}
      />
    </>
  );
}

export default SavedMovies;
