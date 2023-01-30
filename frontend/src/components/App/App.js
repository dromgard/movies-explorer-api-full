import { useState, useMemo, useEffect } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import Login from '../Login/Login';
import Main from '../Main/Main';
import Movies from '../Movies/Movies';
import NotFound from '../NotFound/NotFound';
import PopupMenu from '../PopupMenu/PopupMenu';
import Profile from '../Profile/Profile';
import Register from '../Register/Register';
import SavedMovies from '../SavedMovies/SavedMovies';
import { mainApi } from '../../utils/MainApi';
import { moviesApi } from '../../utils/MoviesApi';
import { CurrentUserContext } from '../../contexts/CurrentUserContext';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import searchFilter from '../../utils/searchFilter';

function App() {

  // States для вёрстки.
  const [isPopupMenuOpen, setIsPopupMenuOpen] = useState(false);

  // States для пользователя.
  const [currentUser, setCurrentUser] = useState({ name: "", email: "" });
  const [loggedIn, setLoggedIn] = useState(true);

  const [updateUserStatus, setUpdateUserStatus] = useState(false);
  const [updateRegisterStatus, setUpdateRegisterStatus] = useState(false);
  const [updateLoginStatus, setUpdateLoginStatus] = useState(false);

  // States для фильмов.
  const [isLoadingMoviesData, setIsLoadingMoviesData] = useState(false); // Идёт загрузка. Прелоадер.

  const [isNeedUpdateCard, setIsNeedUpdateCard] = useState(false); // Факт необходимости обновления карточек.

  const [movies, setMovies] = useState([]); // Исходные фильмы из BitFilms.
  const [savedMovies, setSavedMovies] = useState([]); // Исходные фильмы из нашего API.
  const [filteredMovies, setFilteredMovies] = useState([]); // Отфильтрованные фильмы страница "Фильмы".
  const [filteredSavedMovies, setFilteredSavedMovies] = useState([]); // Отфильтрованные фильмы страница "Сохраненные фильмы".

  const [isMoviesApiError, setIsMoviesApiError] = useState(false); // Ошибки АПИ после поиска "Фильмы".
  const [isFavouritesMoviesApiError, setIsFavouritesMoviesApiError] = useState(false); //Ошибки АПИ после поиска "Сохраненные Фильмы"

  // Используем хук useLocation для отрисовки компонентов.
  const { pathname } = useLocation();
  const urlHeaderRender = ['/', '/movies', '/saved-movies', '/profile'];
  const urlFooterRender = ['/', '/movies', '/saved-movies'];

  //Отслеживаем изменение роута и запускаем проверку на главную страницу.
  const isMainPage = useMemo(() => pathname === '/' ? true : false, [pathname]);

  let navigate = useNavigate();

  // Объединяем массивы для работы с оафками.
  const mergeMovies = (bitFilmsMovies, savedMovies) => {
    return bitFilmsMovies.map((movie) => {
      const savedMovie = savedMovies.find((movieSaved) => movieSaved.movieId === movie.id)
      movie.saved = !!savedMovie;
      movie._id = savedMovie ? savedMovie._id : "";
      return movie;
    })
  }

  // Поиск на странице "Фильмы".
  const filterMovies = (name, isShorts) => {
    setIsNeedUpdateCard(true);
    localStorage.setItem('search-name', name);
    localStorage.setItem('search-isShorts', JSON.stringify(isShorts));

    const filter = (films) => {
      const filteredFilms = searchFilter(name, isShorts, films);
      setFilteredMovies(filteredFilms);
    }

    if (movies.length === 0) {
      const localMovies = JSON.parse(localStorage.getItem('movies') || "[]");
      if (localMovies.length === 0) {
        setIsLoadingMoviesData(true);
        const jwt = localStorage.getItem("jwt");
        mainApi.setToken(jwt);

        Promise.all([moviesApi.getMoviesCards(), mainApi.getSavedMovies()])
          .then(([bitFilmsMovies, { data: savedMovies }]) => {
            const mergedMovies = mergeMovies(bitFilmsMovies, savedMovies)
            setIsMoviesApiError(false);
            setMovies(mergedMovies);
            filter(mergedMovies)
            // Сохраняем исходный массив фильмов в localStorage.
            localStorage.setItem('movies', JSON.stringify(mergedMovies));
            setIsMoviesApiError(false);
          })
          .catch((err) => {
            console.log(err);
            setIsMoviesApiError(true);
          })
          .finally(() => {
            setIsLoadingMoviesData(false);
          })
      } else {
        setMovies(localMovies);
        filter(localMovies);
      }

    } else {
      filter(movies);
    }
  }

  // Поиск на странице "Сохраненные фильмы".
  const filterSavedMovies = (name, isShorts) => {
    setIsNeedUpdateCard(true);

    const filter = (films) => {
      const filteredFilms = searchFilter(name, isShorts, films);
      setFilteredSavedMovies(filteredFilms);
    }

    if (savedMovies.length === 0) {
      const localMovies = JSON.parse(localStorage.getItem('saved-movies') || "[]");
      if (localMovies.length === 0) {
        setIsLoadingMoviesData(true);
        const jwt = localStorage.getItem("jwt");
        mainApi.setToken(jwt);
        mainApi.getSavedMovies()
          .then((res) => {
            const cards = res.data.map((card) => {
              card.saved = true;
              return card;
            })

            setSavedMovies(cards);
            filter(cards)
            // Сохраняем исходный массив фильмов в localStorage.
            localStorage.setItem('saved-movies', JSON.stringify(cards));
            setIsFavouritesMoviesApiError(false);
          })
          .catch((err) => {
            console.log(err);
            setIsFavouritesMoviesApiError(true);
          })
          .finally(() => {
            setIsLoadingMoviesData(false);
          })
      } else {
        setSavedMovies(localMovies);
        filter(localMovies);
      }

    } else {
      filter(savedMovies);
    }
  }

  // Проверяем наличие токена в локальном хранилище, загружаем данные пользователя и карточки.
  const tokenCheck = () => {
    const jwt = localStorage.getItem("jwt");
    mainApi.setToken(jwt);
    if (jwt) {
      mainApi.getUserInfo()
        .then((userData) => {
          if (userData) {
            setCurrentUser(userData.user);
            setLoggedIn(true);
          } else {
            setLoggedIn(false);
            navigate("/");
          }
        })
        .catch((err) => {
          setLoggedIn(false);
          console.log(`Переданный токен некорректен: ${err}`);
        });
    } else {
      setLoggedIn(false);
    }
  };

  // Обработчик регистрации.
  const handleRegister = (userEmail, userPassword, userName, resetRegisterForm) => {
    mainApi
      .register(userEmail, userPassword, userName)
      .then((res) => {
        handleLogin(userEmail, userPassword)
        resetRegisterForm && resetRegisterForm();
      })
      .catch((err) => {
        setUpdateRegisterStatus(err);
      });
  };


  // Обработчик логина.
  const handleLogin = (userEmail, userPassword, resetLoginForm) => {
    if (!userEmail || !userPassword) {
      return;
    }
    mainApi
      .authorize(userEmail, userPassword)
      .then((data) => {
        if (data.token) {
          localStorage.setItem("jwt", data.token);
          setLoggedIn(true);
          navigate("/movies");
          resetLoginForm && resetLoginForm();
        }
      })
      .catch((err) => {
        setUpdateLoginStatus(err);
        console.log(err);
      });
  };

  // Обрабатываем выход из аккаунта.
  const handleLogout = () => {
    localStorage.clear();
    setCurrentUser({});
    setMovies([]);
    setSavedMovies([]);
    navigate("/signin");
    setLoggedIn(false);
  };


  // Обработчик сохранения данных пользователя.
  function handleUpdateUser(name, email, setIsEditDone) {
    mainApi
      .editUserInfo(name, email)
      .then((userData) => {
        setCurrentUser(userData.data);
        setIsEditDone(true);
        setUpdateUserStatus(200);
      })
      .catch((err) => {
        setIsEditDone(false);
        setUpdateUserStatus(err);
      });
  }

  // Сравнивает текущий роут с переданным массивом роутов.
  function compareUrl(urlList) {
    for (let key in urlList) {
      if (urlList[key] === pathname) {
        return true;
      }
    }
    return false;
  }

  // Открываем и закрываем попап с меню.
  const togglePopupMenu = () => {
    setIsPopupMenuOpen(!isPopupMenuOpen);
  };

  // Проверка на логин при загрузке страницы.
  useEffect(() => {
    tokenCheck();
  }, [loggedIn]);


  // Обработчик добавления и удаления лайков. Для обеих страниц.
  const handleSaveFavoriteMovie = (card) => {
    setIsNeedUpdateCard(true);
    const promise = card.saved ? mainApi.deleteSavedMovie(card._id) : mainApi.saveMovie(card)

    promise
      .then(() => mainApi.getSavedMovies())
      .then(({ data }) => {
        const cards = data.map((card) => {
          card.saved = true;
          return card;
        })
        localStorage.setItem('saved-movies', JSON.stringify(cards));
        setSavedMovies(() => cards);



        const mergedMovies = mergeMovies(movies, cards)

        setMovies(() => mergedMovies);

        // Сохраняем исходный массив фильмов в localStorage.
        localStorage.setItem('movies', JSON.stringify(mergedMovies));

      })
      .catch((err) => {
        console.log(err);
      })
  };

  useEffect(() => {

    if (isNeedUpdateCard) {
      filterSavedMovies("", false)

      setIsNeedUpdateCard(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [savedMovies.length])

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="app">
        {compareUrl(urlHeaderRender) ? <Header loggedIn={loggedIn} isMainPage={isMainPage} togglePopupMenu={togglePopupMenu} /> : null}

        <Routes>
          <Route exact path='/' element={<Main />}>
          </Route>
          <Route path='/movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Movies
                filterMovies={filterMovies}
                isLoadingData={isLoadingMoviesData}
                isMoviesApiError={isMoviesApiError}
                moviesData={filteredMovies}
                onSaveMovie={handleSaveFavoriteMovie}
              />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/saved-movies' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <SavedMovies
                isLoadingData={isLoadingMoviesData}
                savedMovies={filteredSavedMovies}
                handleSearchSavedMovies={filterSavedMovies}
                onSaveMovie={handleSaveFavoriteMovie}
                isFavouritesMoviesApiError={isFavouritesMoviesApiError}
              />
            </ProtectedRoute>
          }>
          </Route>
          <Route path='/profile' element={
            <ProtectedRoute loggedIn={loggedIn}>
              <Profile onEditProfile={handleUpdateUser} handleLogout={handleLogout} updateUserStatus={updateUserStatus} />
            </ProtectedRoute>
          }>
          </Route>

          <Route path='/signup' element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Register handleRegister={handleRegister} handleLogin={handleLogin} updateRegisterStatus={updateRegisterStatus} />
            </ProtectedRoute>
          }>
          </Route>

          <Route path='/signin' element={
            <ProtectedRoute loggedIn={!loggedIn}>
              <Login handleLogin={handleLogin} updateLoginStatus={updateLoginStatus} />
            </ProtectedRoute>
          }>
          </Route>
          <Route path="*" element={<NotFound />}>
          </Route>
        </Routes>

        {compareUrl(urlFooterRender) ? <Footer /> : null}

        <PopupMenu isOpen={isPopupMenuOpen} togglePopupMenu={togglePopupMenu} compareUrl={compareUrl} />

      </div >
    </CurrentUserContext.Provider >
  );
}

export default App;
