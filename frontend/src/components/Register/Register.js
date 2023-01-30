import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toAskOnlyData } from "../../utils/constants";

function Register({ handleRegister, updateRegisterStatus, handleLogin }) {

  // States.
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [inputNameError, setInputNameError] = useState("");
  const [isNameValid, setIsNameValid] = useState(false);
  const [inputEmailError, setInputEmailError] = useState("");
  const [inputPasswordError, setInputPasswordError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [infoMessage, setInfoMessage] = useState("");

  function handleApiMessages() {
    if (updateRegisterStatus) {
      switch (updateRegisterStatus) {
        case 409:
          setInfoMessage("Пользователь с такой почтой уже существует");
          break;
        case 500:
          setInfoMessage("Ошибка на сервере. Попробуйте позже")
          break;
        default:
          setInfoMessage("Произошла ошибка. Попробуйте позже");
          break;
      };
    };
  }

  // Запускаем обработку сообщений с сервера.
  useEffect(() => {
    handleApiMessages()
  }, [updateRegisterStatus]);

  // Обработчики полей ввода имени, email и пароля.
  function handleChangeName(e) {
    let inputValue = e.target.value;
    setName(inputValue);
    const nameRegex = /^[а-яА-ЯёЁa-zA-Z -]+$/g

    if (inputValue.length < 2 || inputValue.length > 30) {
      setInputNameError('Длина имени от 2 до 30 символов')
      setIsNameValid(false);
    } else if (!nameRegex.test(String(inputValue))) {
      setInputNameError('Имя не соответствует шаблону: [а-яА-Яa-zA-Z -]')
      setIsNameValid(false);
    } else {
      setIsNameValid(true);
      setInputNameError("");
    }
  }

  function handleChangeEmail(e) {
    let inputValue = e.target.value;
    setEmail(inputValue);

    const emailRegex = /^([\w]+@([\w-]+\.)+[\w-]{2,4})?$/;
    if (inputValue.length === 0) {
      setInputEmailError('e-mail не должен быть пустым');
      setIsEmailValid(false);
    } else if (!emailRegex.test(String(inputValue).toLowerCase())) {
      setInputEmailError('Введите корректный e-mail');
      setIsEmailValid(false);
    } else {
      setIsEmailValid(true);
      setInputEmailError('');
    }
  }

  function handleChangePassword(e) {
    let inputValue = e.target.value;
    setPassword(inputValue);

    if (inputValue.length === 0) {
      setInputPasswordError('Пароль не должен быть пустым')
      setIsPasswordValid(false);
    } else {
      setInputPasswordError('')
      setIsPasswordValid(true);
    }
  }

  // Финальная валидация отвечает за блокировку / разблокировку формы.
  function makeFinalValidation() {
    if (!isEmailValid || !isPasswordValid || !isNameValid) {
      setIsFormValid(false);
      return;
    }

    setIsFormValid(true);
  }

  // Сброс формы.
  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
  }

  // Обработка нажатия на кнопку "Регистрация".
  const handleSubmit = (e) => {
    e.preventDefault();
    handleRegister(email, password, name, resetForm);
  }

  // Обработка нажатия на кнопку "Мне только спросить".
  const handleIWantToAskOnly = (e) => {
    e.preventDefault();
    handleLogin(toAskOnlyData.email, toAskOnlyData.password, resetForm);
  }

  useEffect(() => {
    makeFinalValidation();
  }, [email, password, isNameValid])

  return (
    <section className="auth">
      <Link className="button logo" to="/" aria-label="Перейти на страницу 'О Проекте'" />
      <h1 className="common-title">Добро пожаловать!</h1>

      <form
        name="register"
        className="auth-form"
        onSubmit={handleSubmit}
      >
        <label className="auth-form__label">Имя</label>
        <input
          id="name"
          type="text"
          placeholder="Имя"
          aria-label="Введите имя"
          name="name"
          value={name}
          onChange={handleChangeName}
          className="auth-form__input input"
          required
        />
        <span className="auth-form__input-error">{inputNameError}</span>
        <label className="auth-form__label">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          aria-label="Введите email"
          name="email"
          value={email}
          onChange={handleChangeEmail}
          className="auth-form__input input"
          required
        />
        <span className="auth-form__input-error">{inputEmailError}</span>
        <label className="auth-form__label">Пароль</label>
        <input
          id="password"
          type="password"
          placeholder="Пароль"
          aria-label="Введите пароль"
          name="password"
          value={password}
          onChange={handleChangePassword}
          className="auth-form__input input"
          required
        />
        <span className="auth-form__input-error">{inputPasswordError}</span>

        <span className="auth-form__info-message">{infoMessage}</span>

        <button
          name="submit"
          className={`auth-form__submit button ${isFormValid ? "" : "auth-form__submit_inactive"}`}
          type="submit"
          aria-label="Зарегистрироваться"
          title="Зарегистрироваться"
          disabled={!isFormValid}
        >
          Зарегистрироваться
        </button>
        <p className="auth-form__text">
          Уже зарегистрированы?
          <Link to="/signin" className="auth-form__link link">
            {" "}
            Войти
          </Link>
        </p>
      </form>


      <label className="auth-form__label auth-form__label_ask-only">Или</label>
      <button
        name="submit"
        className="auth-form__submit button"
        type="buttom"
        aria-label="Мне только спросить"
        title="Мне только спросить"
        onClick={handleIWantToAskOnly}
      >
        Мне только спросить
      </button>
    </section>
  );
}

export default Register;
