import React from "react";
import { Link, useNavigate } from "react-router-dom";

function NotFound() {

  // Кнопка "Назад".
  const navigate = useNavigate();
  const goBack = () => navigate(-1);

  return (
    <section className="not-found">
      <h1 className="not-found__title">404</h1>
      <p className="not-found__text">Страница не найдена</p>
      <Link onClick={goBack} className="auth-form__text auth-form__link link">
        Назад
      </Link>
    </section>
  );
}

export default NotFound;
