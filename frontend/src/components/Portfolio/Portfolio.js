import React from "react";

function Portfolio() {
  return (
    <section className="portfolio">
      <h2 className="portfolio__title">Портфолио</h2>
      <ul className="portfolio__container">
        <li className="portfolio__links">
          <a
            href="https://github.com/dromgard/how-to-learn"
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer">Статичный сайт</a>
        </li>
        <li className="portfolio__links">
          <a
            href="https://github.com/dromgard/russian-travel"
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer">Адаптивный сайт</a>
        </li>
        <li className="portfolio__links">
          <a
            href="https://github.com/dromgard/react-mesto-api-full"
            className="portfolio__link link"
            target="_blank"
            rel="noreferrer">Одностраничное приложение</a>
        </li>
      </ul>
    </section>
  );
}

export default Portfolio;
