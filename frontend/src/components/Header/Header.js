import React from "react";
import { Link } from "react-router-dom";
import Navigation from "../Navigation/Navigation";
import NavigationAuth from "../NavigationAuth/NavigationAuth";

function Header({ loggedIn, isMainPage, togglePopupMenu }) {
  return (
    <header className={`header ${isMainPage ? '' : 'header_light-theme'}`}>
      <Link className="button logo" to="/" aria-label="Перейти на страницу 'О Проекте'" />
      {loggedIn ? <Navigation /> : <NavigationAuth />}
      <button
        className={`button header__burger-menu ${loggedIn ? "" : "header__burger-menu_invisible"}`}
        type="button"
        title="Открыть меню"
        aria-label="Открыть меню"
        onClick={togglePopupMenu}
      />
    </header>
  );
};

export default Header;
