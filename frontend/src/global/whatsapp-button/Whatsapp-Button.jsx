import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import { useTranslation } from "react-i18next"; // Import translation hook
import "./WhatsappButton.css";

function WhatsAppButton() {
  const [showMessage, setShowMessage] = useState(false);
  const { t } = useTranslation(); // Initialize translation function

  useEffect(() => {
    const interval = setInterval(() => {
      setShowMessage((prev) => !prev); // Toggle message visibility
    }, 4000); // Show message every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  const handleWhatsAppClick = () => {
    window.open("https://wa.me/+9660552278970", "_blank"); // Replace with your WhatsApp number
  };

  return (
    <div>
      <a>
        <div className="whatsapp-button bottom-[7%] sm:bottom-[10%] right-[3%] sm:right-[1.5%]" onClick={handleWhatsAppClick}>
          <FontAwesomeIcon icon={faWhatsapp} className="whatsapp-icon" />
        </div>
      </a>
      {showMessage && (
        <div className="whatsapp-popup bottom-[17%] right-[3%] sm:bottom-[20%] sm:right-[1.5%]">
          <span className="typing-text">
            {t("whatsapp.message")}{" "}
            <span className="font-bold">{t("whatsapp.contactUs")}</span>{" "}
          </span>
        </div>
      )}
    </div>
  );
}

export default WhatsAppButton;
