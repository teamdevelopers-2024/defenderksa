import React from "react";
import { useTranslation } from "react-i18next"; // Import the translation hook

function Footer() {
  const { t } = useTranslation(); // Initialize translation function

  return (
    <footer id="footer" className="footer xl:px-28">
      <div className="container copyright text-center mt-4">
        <p>
          © <span>{t("footer.copyright")}</span> <strong className="px-1 sitename">{t("footer.siteName")}</strong> <span>{t("footer.allRights")}</span>
        </p>
        <div className="credits">
          {t("footer.designedBy")} <a className="font-medium" href="https://www.zeecodesolutions.com/">{t("footer.companyName")}</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
