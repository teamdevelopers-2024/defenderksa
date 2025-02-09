import React from "react";
import { useTranslation } from "react-i18next"; // Import the translation hook
import HeroImage from "../assets/img/hero-img.png";

function Hero() {
  const { t } = useTranslation(); // Initialize the translation function

  return (
    <section id="hero" className="hero section light-background">
      <div className="container xl:px-28">
        <div className="row gy-4">
          <div
            className="col-lg-6 order-2 order-lg-1 d-flex flex-column justify-content-center text-center text-md-start"
            data-aos="fade-up"
          >
            <h2>{t("hero.heading")}</h2> {/* Translated heading */}
          </div>
          <div
            className="col-lg-6 order-1 order-lg-2 hero-img"
            data-aos="zoom-out"
          >
            <img src={HeroImage} className="img-fluid animated" alt="" />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
