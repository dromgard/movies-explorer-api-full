class MoviesApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  // Обрабатываем статус запроса к серверу, возвращаем положительный результат или промис с ошибкой.
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  // Получаем карточки фильмов.
  getMoviesCards() {
    return fetch(`${this._baseUrl}`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

// Создаем экземпляр класса подключения к серверу.
export const moviesApi = new MoviesApi({
  baseUrl: "https://api.nomoreparties.co/beatfilm-movies",
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
  },
});
