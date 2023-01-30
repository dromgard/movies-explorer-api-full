class MainApi {
  constructor(options) {
    this._baseUrl = options.baseUrl;
    this._headers = options.headers;
  }

  setToken(token) {
    this._headers.Authorization = `Bearer ${token}`;
  }

  // Обрабатываем статус запроса к серверу, возвращаем положительный результат или промис с ошибкой.
  _handleResponse(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(res.status);
  }

  register(email, password, name) {
    return fetch(`${this._baseUrl}/signup`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email: email, password: password, name: name }),
    }).then(this._handleResponse);
  };

  authorize(email, password) {
    return fetch(`${this._baseUrl}/signin`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    }).then(this._handleResponse);
  };


  // Получаем данные профиля.
  getUserInfo() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // Получаем карточки.
  getSavedMovies() {
    return fetch(`${this._baseUrl}/movies`, {
      headers: this._headers,
    }).then(this._handleResponse);
  }

  // Отправляем новые данные пользоателя.
  editUserInfo(name, email) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: name,
        email: email,
      }),
    }).then(this._handleResponse);
  }

  // Добавляем новую карточку.
  saveMovie(data) {
    return fetch(`${this._baseUrl}/movies`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify(data),
    }).then(this._handleResponse);
  }

  // Удаляем карточку.
  deleteSavedMovie(id) {
    return fetch(`${this._baseUrl}/movies/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this._handleResponse);
  }
}

// Создаем экземпляр класса подключения к серверу.
export const mainApi = new MainApi({
  // baseUrl: "http://localhost:3001",
  baseUrl: "https://api.diploma-serhio.nomoredomains.club",
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
  },
});
