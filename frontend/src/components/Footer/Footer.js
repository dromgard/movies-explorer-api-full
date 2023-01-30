import React from "react";

function Footer() {
  return (
    <footer className="footer">
      <h2 className="footer__title">Учебный проект Яндекс.Практикум х BeatFilm.</h2>
      <div className="footer__container">
        <p className="footer__text footer__text_copyright">&copy; {new Date().getFullYear()}</p>
        <div className="footer__info">
          <a
            href="https://practicum.yandex.ru/web/"
            className="footer__text link"
            target="_blank"
            rel="noreferrer">Яндекс.Практикум</a>
          <a
            href="https://github.com/dromgard"
            className="footer__text link"
            target="_blank"
            rel="noreferrer">Github</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
