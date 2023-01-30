import React from "react";
import { Link } from "react-router-dom";

function NavigationAuth() {
  return (
    <nav className="navigation-auth">
      <ul className="navigation-auth__list">
        <li><Link className="link navigation-auth__link" to="/signup" >Регистрация</Link></li>
        <li><Link className="link navigation-auth__link navigation-auth__link_login" to="/signin" >Войти</Link></li>
      </ul>
    </nav>
  )
};

export default NavigationAuth;
