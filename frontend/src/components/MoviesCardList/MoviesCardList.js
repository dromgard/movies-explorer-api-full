import React, { useEffect, useState } from "react";
import MoviesCard from "../MoviesCard/MoviesCard";
import useCurrentSize from "../../utils/useCurrentSize";

function MoviesCardList({
  locationPathname,
  data,
  onSaveMovie,
}) {

  const size = useCurrentSize();

  // Данные для перерендера массива фильмов в зависимости от ширины экрана.
  const resizeConstants = {
    xl: {
      width: 1280,
      moviesToRender: 16,
      moviesToAdd: 4,
    },
    large: {
      width: 1024,
      moviesToRender: 12,
      moviesToAdd: 3,
    },
    medium: {
      width: 990,
      moviesToRender: 8,
      moviesToAdd: 2,
    },
    small: {
      width: 768,
      moviesToRender: 5,
      moviesToAdd: 1,
    }
  }

  // States
  const [isSizeChanged, setIsSizeChanged] = useState(true); // Поменялся размер экрана?
  const [moviesToRender, setMoviesToRender] = useState([]); // Массив фильмов после фильтра.
  const [isMoreButtonActive, setIsMoreButtonActive] = useState(false); // Показываем кнопку Ещё?
  const [numberMoviesToRender, setNumberMoviesToRender] = useState(0); // Сколько фильмов отрисовывать.
  const [numberMoviesToAdd, setNumberMoviesToAdd] = useState(0); // Сколько фильмов добавлять.

  // Устанавливаем количество фильмов для загрузки и для добавления в зависимости от ширины окна.
  const getNumberOfMoviesToRender = () => {
    if (size.width >= resizeConstants.xl.width) {
      setNumberMoviesToRender(resizeConstants.xl.moviesToRender);
      setNumberMoviesToAdd(resizeConstants.xl.moviesToAdd);
    } else if (size.width < resizeConstants.xl.width && size.width >= resizeConstants.large.width) {
      setNumberMoviesToRender(resizeConstants.large.moviesToRender);
      setNumberMoviesToAdd(resizeConstants.large.moviesToAdd);
    } else if (size.width < resizeConstants.medium.width && size.width >= resizeConstants.small.width) {
      setNumberMoviesToRender(resizeConstants.medium.moviesToRender);
      setNumberMoviesToAdd(resizeConstants.medium.moviesToAdd);
    } else if (size.width < resizeConstants.small.width) {
      setNumberMoviesToRender(resizeConstants.small.moviesToRender);
      setNumberMoviesToAdd(resizeConstants.small.moviesToAdd);
    };
  };

  // По кнопке "Ещё" добавляем к длине массива фильмов новые элементы для рендера.
  const handleShowMoreMoviesButtonClick = () => {
    if (data) {
      setMoviesToRender(data.slice(0, moviesToRender.length + numberMoviesToAdd));
      let math = moviesToRender.length + numberMoviesToAdd;
      setNumberMoviesToRender(math);
      if (moviesToRender.length >= data.length - numberMoviesToAdd) {
        setIsMoreButtonActive(false);
      }
    }

  }

  // Перерисовываем страницу после изменения ширины окна.
  useEffect(() => {
    getNumberOfMoviesToRender();
  }, [size.width])

  // Перерисовываем страницу после изменения массива или изменения количества фильмов для рендера.
  useEffect(() => {
    if (data) {
      if (isSizeChanged) {
        setIsSizeChanged(false)
        setMoviesToRender(data.slice(0, numberMoviesToRender));
        if (data.length <= numberMoviesToRender) {
          setIsMoreButtonActive(false);
        } else {
          setIsMoreButtonActive(true);
        };
      } else {
        setMoviesToRender(data.slice(0, numberMoviesToRender));
        if (data.length <= numberMoviesToRender) {
          setIsMoreButtonActive(false);
        } else {
          setIsMoreButtonActive(true);
        };
      }
    }
  }, [data])

  // Перерисовываем страницу после изменения массива или изменения количества фильмов для рендера.
  useEffect(() => {
    if (data) {
      setMoviesToRender(data.slice(0, numberMoviesToRender));
      if (data.length <= numberMoviesToRender) {
        setIsMoreButtonActive(false);
      } else {
        setIsMoreButtonActive(true);
      };
    }
  }, [numberMoviesToRender])

  // Генерируем разметку массива фильмов.
  const moviesCardsMarkup = moviesToRender.map((item) => (
    <MoviesCard
      key={item.id || item._id}
      data={item}
      locationPathname={locationPathname}
      onSaveMovie={onSaveMovie}
    />
  ))

  return (
    <>
      <section className="moviescardlist">
        {moviesCardsMarkup}
      </section>

      {isMoreButtonActive ? (
        <section className="more-movies">
          <button
            className="more-movies-button button"
            type="button"
            aria-label="Показать больше фильмов"
            title="Показать больше фильмов"
            onClick={handleShowMoreMoviesButtonClick}
          >Ещё</button>
        </section>
      ) : null}

    </>
  );
}

export default MoviesCardList;
