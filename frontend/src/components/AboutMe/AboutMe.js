import React from "react";
import photo from "../../images/about-me-me.png"

function AboutMe() {
  return (
    <section className="about-me">
      <h2 className="section-title">Студент</h2>
      <div className="about-me__container">
        <div className="about-me__info">
          <h3 className="about-me__title">Сергей</h3>
          <p className="about-me__subtitle">Фронтенд-разработчик, 33 года</p>
          <p className="about-me__text">Я родился и живу в Москве, закончил факультет прикладного программирования в экономике РГУТИС.
            Не женат. Я люблю кататься на велосипеде и самокате, играю в настолки. Недавно начал кодить.
            Сейчас работаю продакт-менеджером, но в ближайшее время планирую перейти в разработку.</p>
          <a
            href="https://github.com/dromgard"
            className="link about-me__link"
            target="_blank"
            rel="noreferrer">Github</a>
        </div>
        <img className="about-me__photo" src={photo} alt="Сергей. Фронтенд-разработчик, 33 года" />
      </div>

    </section>
  );
}

export default AboutMe;
