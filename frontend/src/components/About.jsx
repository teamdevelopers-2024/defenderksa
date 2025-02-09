import React from "react";
import { useTranslation } from "react-i18next"; // Import the translation hook

import AboutImage from "../assets/img/about.png";

function About() {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <section id="about" className="about section xl:px-28">
      <div className="container">
        <div className="row gy-4">
          <div className="col-lg-6 position-relative" data-aos="fade-up">
            <img src={AboutImage} className="img-fluid" alt={t("aboutUs.imageAlt")} />
          </div>

          <div className="col-lg-6 ps-lg-4 content d-flex flex-column justify-content-center" data-aos="fade-up"
            >
            <h3>{t("aboutUs.title")}</h3>
            <p>{t("aboutUs.description")}</p>
            <ul>
              <li>
                <i className="bi bi-diagram-3"></i>
                <div>
                  <h5>{t("aboutUs.qualityTitle")}</h5>
                  <p>{t("aboutUs.qualityDescription")}</p>
                </div>
              </li>
              <li>
                <i className="bi bi-fullscreen-exit"></i>
                <div>
                  <h5>{t("aboutUs.performanceTitle")}</h5>
                  <p>{t("aboutUs.performanceDescription")}</p>
                </div>
              </li>
              <li>
                <i className="bi bi-broadcast"></i>
                <div>
                  <h5>{t("aboutUs.trustedTitle")}</h5>
                  <p>{t("aboutUs.trustedDescription")}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
