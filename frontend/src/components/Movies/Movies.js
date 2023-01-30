import React, { useEffect, useState } from "react";
import MoviesCardList from "../MoviesCardList/MoviesCardList";
import SearchForm from "../SearchForm/SearchForm";
import Preloader from "../Preloader/Preloader";
import { useLocation } from "react-router-dom";

function Movies({
  filterMovies,
  isLoadingData,
  isMoviesApiError,
  moviesData,
  onSaveMovie,
}) {

  let location = useLocation();

  // const savedSearchedMovies = JSON.parse(localStorage.getItem("page-movies-saved") || []);
  const savedSearchName = localStorage.getItem("search-name") || "";
  const savedSearchShorts = (localStorage.getItem("search-isShorts") === "true") ? true : false;

  // Обработчик кнопки "Поиск".
  const handleSubmit = (name, isShorts) => {
    // setFirstLoad(false)
    filterMovies(name, isShorts);
  }

  useEffect(() => {
    const localMovies = JSON.parse(localStorage.getItem('movies') || "[]");

    if (localMovies.length > 0) {
      filterMovies(savedSearchName, savedSearchShorts);
    }

  }, []);

  return (
    <>
      <SearchForm onSubmit={handleSubmit} savedSearchName={savedSearchName} savedSearchShorts={savedSearchShorts} locationPathname={location.pathname} />
      {!isLoadingData && moviesData.length === 0 && (
        <span className="section-text section-text_movies">Ничего не найдено.</span>
      )}
      {isLoadingData && (
        <Preloader />
      )}
      {isMoviesApiError && (
        <span className="section-text section-text_movies">Во время запроса произошла ошибка.
          Возможно, проблема с соединением или сервер недоступен.
          Подождите немного и попробуйте ещё раз.</span>
      )}
      <MoviesCardList
        data={moviesData}
        locationPathname={location.pathname}
        onSaveMovie={onSaveMovie}
      />
    </>
  );
}

export default Movies;
