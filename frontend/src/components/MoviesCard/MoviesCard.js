import React from "react";

function MoviesCard({
  data,
  locationPathname,
  onSaveMovie,
}) {

  // Получаем постер фильма.
  const getImage = (path) => {
    if (locationPathname === '/saved-movies') {
      return data.image;
    } else if (locationPathname === '/movies') {
      return `https://api.nomoreparties.co/${path}`;
    }
  }

  // Получаем красивую продолжительность фильма.
  const getDuration = (mins) => {
    let hours = Math.trunc(mins / 60);
    let minutes = mins % 60;
    let renderHours = hours === 0 ? '' : `${hours}ч`;
    let renderminutes = minutes === 0 ? '' : `${minutes}м`;
    return `${renderHours} ${renderminutes}`;
  }

  const movieData = data.saved ? {
    ...data,
    country: data.country || 'Нет данных',
    director: data.director || 'Нет данных',
    duration: data.duration || 0,
    year: data.year || 'Нет данных',
    description: data.description || 'Нет данных',
    image: getImage(data.image.url),
    trailerLink: data.trailerLink,
    nameRU: data.nameRU || 'Нет данных',
    nameEN: data.nameEN || 'Нет данных',
    movieId: data.id,
    thumbnail: getImage(data.image.url),
  } : {
    country: data.country || 'Нет данных',
    director: data.director || 'Нет данных',
    duration: data.duration || 0,
    year: data.year || 'Нет данных',
    description: data.description || 'Нет данных',
    image: getImage(data.image.url),
    trailerLink: data.trailerLink,
    nameRU: data.nameRU || 'Нет данных',
    nameEN: data.nameEN || 'Нет данных',
    movieId: data.id,
    thumbnail: getImage(data.image.url),
  };

  // Обработчик сохранения и удаления фильмов из избранного.
  const handleClickFavoriteButton = () => {
    onSaveMovie(movieData);
  };


  return (
    <article className="moviescard">
      <a
        href={movieData.trailerLink}
        target='_blank'
        aria-label={movieData.nameRU}
        rel="noreferrer"
      >
        <img
          src={movieData.image}
          alt={movieData.nameRU || movieData.nameEN}
          className="moviescard__image"
        /></a>
      <div className="moviescard__container">
        <h2 className="moviescard__title">{movieData.nameRU || movieData.nameEN}</h2>
        <button
          className={`${movieData.saved ? "moviescard__favourites-remove" : "moviescard__favourites-add"} ${locationPathname === "/saved-movies" ? "moviescard__favourites-remove-saved-movies" : ""} button`}
          type="button"
          aria-label="Добавить в избранное"
          title="Добавить в избранное"
          onClick={handleClickFavoriteButton}
        ></button>
      </div>
      <p className="moviescard__duration">{getDuration(data.duration)}</p>
    </article>
  );
}

export default MoviesCard;
