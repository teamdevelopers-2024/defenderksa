import React from "react";
import { useTranslation } from "react-i18next"; // Import the translation hook

function Contact() {
  const { t } = useTranslation(); // Initialize the translation function

  return (
    <section id="contact" className="contact section xl:px-28">
      <div className="container section-title " data-aos="fade-up">
        <h2>{t("contacts.title")}</h2> {/* Translated section title */}
      </div>

      <div className="container" data-aos="fade-up" data-aos-delay="100">
        <div className="mb-4" data-aos="fade-up" data-aos-delay="100">
          <iframe
            style={{ border: 0, width: "100%", height: "270px" }}
            src="https://www.google.com/maps/embed?pb=..."
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>

        <div className="row gy-4">
          <div className="col-lg-4">
            {/* Address Info */}
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="200">
              <i className="bi bi-geo-alt flex-shrink-0"></i>
              <div>
                <h3>{t("contacts.address")}</h3> {/* Translated address heading */}
                <p>{t("contacts.addressDetails")}</p> {/* Translated address details */}
              </div>
            </div>

            {/* Call Us Info */}
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="300">
              <i className="bi bi-telephone flex-shrink-0"></i>
              <div>
                <h3>{t("contacts.callUs")}</h3> {/* Translated call us heading */}
                <p>{t("contacts.phone")}</p> {/* Translated phone number */}
              </div>
            </div>

            {/* Email Us Info */}
            <div className="info-item d-flex" data-aos="fade-up" data-aos-delay="400">
              <i className="bi bi-envelope flex-shrink-0"></i>
              <div>
                <h3>{t("contacts.emailUs")}</h3> {/* Translated email us heading */}
                <p>{t("contacts.email")}</p> {/* Translated email address */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
