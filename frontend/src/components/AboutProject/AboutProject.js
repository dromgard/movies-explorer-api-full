import React from "react";

function AboutProject() {
  return (
    <section className="about-project">
      <h2 className="section-title">О проекте</h2>
      <div className="about-project__info">
        <p className="about-project__subtitle">Дипломный проект включал 5 этапов</p>
        <p className="about-project__subtitle about-project__subtitle_320">На выполнение диплома ушло 5 недель</p>
        <p className="section-text">Составление плана, работу над бэкендом, вёрстку,
          добавление функциональности и финальные доработки.</p>
        <p className="section-text">У каждого этапа был мягкий и жёсткий дедлайн, которые нужно
          было соблюдать, чтобы успешно защититься.</p>
      </div>
      <div className="about-project__plan">
        <div className="about-project__plan-subtitle about-project__plan-subtitle_done">1 неделя</div>
        <div className="about-project__plan-subtitle">4 недели</div>
        <p className="about-project__plan-text">Back-end</p>
        <p className="about-project__plan-text">Front-end</p>
      </div>

    </section>
  );
}

export default AboutProject;
