import React from "react";
import { Link } from "react-router-dom";

function PopupMenu({ isOpen, togglePopupMenu, compareUrl }) {
  return (
    <div className={`popup-menu ${isOpen ? "popup-menu_opened" : ""}`}>
      <div className="popup-menu__container">
        <button
          className="button popup-menu__close"
          type="button"
          aria-label="Закрыть меню"
          title="Закрыть меню"
          onClick={togglePopupMenu}
        ></button>
        <nav className="popup-menu__navigation">
          <ul className="popup-menu__list">
            <li><Link className="link popup-menu__link" to="/" onClick={togglePopupMenu} >Главная</Link></li>
            <li><Link className={`link popup-menu__link ${compareUrl(["/movies"]) ? "popup-menu__link_active" : ""}`} to="/movies" onClick={togglePopupMenu} >Фильмы</Link></li>
            <li><Link className={`link popup-menu__link ${compareUrl(["/saved-movies"]) ? "popup-menu__link_active" : ""}`} to="/saved-movies" onClick={togglePopupMenu} >Сохранённые фильмы</Link></li>
          </ul>
          <Link className="link popup-menu__link popup-menu__link_account" to="/profile" onClick={togglePopupMenu} >Аккаунт</Link>
        </nav>


      </div>
    </div>
  );
}

export default PopupMenu;
