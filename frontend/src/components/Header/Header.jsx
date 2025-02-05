import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import i18n from "../../i18n"; // Import i18n setup
import LogoOnly from "../../assets/icons/logo_only.png";
import LogoText from "../../assets/icons/logo-text.png";
import "./Header.css";

const Header = () => {
  const { t } = useTranslation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavActive, setIsNavActive] = useState(false);
  const [isDropdownActive, setIsDropdownActive] = useState(false);
  const [isNavDropdownActive, setIsNavDropdownActive] = useState(false);

  useEffect(() => {
    const toggleScrolled = () => {
      setIsScrolled(window.scrollY > 100);
    };

    const toggleScrollTop = () => {
      const scrollTop = document.querySelector(".scroll-top");
      if (scrollTop) {
        scrollTop.classList.toggle("active", window.scrollY > 100);
      }
    };

    const navmenuScrollspy = () => {
      document.querySelectorAll(".navmenu a").forEach((link) => {
        if (!link.hash) return;
        const section = document.querySelector(link.hash);
        if (section) {
          const position = window.scrollY + 200;
          link.classList.toggle(
            "active",
            position >= section.offsetTop &&
              position <= section.offsetTop + section.offsetHeight
          );
        }
      });
    };

    window.addEventListener("scroll", toggleScrolled);
    window.addEventListener("scroll", toggleScrollTop);
    window.addEventListener("scroll", navmenuScrollspy);
    const firstNavLink = document.querySelector(".navmenu a");
    if (firstNavLink) {
      firstNavLink.classList.add("active");
    }

    return () => {
      window.removeEventListener("scroll", toggleScrolled);
      window.removeEventListener("scroll", toggleScrollTop);
      window.removeEventListener("scroll", navmenuScrollspy);
    };
  }, []);
  // Change Language Function
  const changeLanguage = () => {
    const newLanguage = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLanguage);
    setIsDropdownActive(false);
    setIsNavDropdownActive(false);
  };

  // Toggle Mobile Navigation Menu
  const toggleNavMenu = () => {
    setIsNavActive(!isNavActive);
    setIsNavDropdownActive(false); // Close language dropdown when toggling menu
  };

  return (
    <header
      className={`header ${isScrolled ? "scrolled" : ""} ${
        isNavActive ? "mobile-nav-active" : ""
      } d-flex align-items-center sticky-top`}
    >
      <div className="container-fluid container-xl position-relative d-flex align-items-center justify-content-between">
        {/* Logo */}
        <div className="logo d-flex align-items-center">
          <img src={LogoOnly} className="h-6 w-7" alt="Logo" />
          <img src={LogoText} className="size-40" alt="Logo Text" />
        </div>

        {/* Right Side - Language & Navbar */}
        <div className="flex gap-3 items-center">
          {/* Standalone Language Dropdown */}
          <div className="language-dropdown independant-dropdown">
            <button
              className="dropdown-toggle"
              onClick={() => setIsDropdownActive(!isDropdownActive)}
              aria-label="Toggle language selection"
            >
              {i18n.language === "en" ? "English" : "العربية"}
            </button>
            {isDropdownActive && (
              <ul className="dropdown-menu gap-3">
                <li>
                  <a href="#" onClick={changeLanguage}>
                    {i18n.language === "en" ? "العربية" : "English"}
                  </a>
                </li>
              </ul>
            )}
          </div>

          {/* Navigation Menu */}
          <nav
            id="navmenu"
            className={`navmenu ${isNavActive ? "mobile-nav-active" : ""}`}
          >
            <ul>
              <li>
                <a href="#hero">{t("home")}</a>
              </li>
              <li>
                <a href="#products">{t("ourProducts")}</a>
              </li>
              <li>
                <a href="#about">{t("about")}</a>
              </li>
              <li>
                <a href="#contact">{t("contact")}</a>
              </li>

              {/* Language Dropdown inside Navbar */}
              <li
                className={`language-dropdown ml-4 ${
                  isNavActive ? "hidden" : "block"
                }`}
              >
                <button
                  className="dropdown-toggle"
                  onClick={() => setIsNavDropdownActive(!isNavDropdownActive)}
                  aria-label="Toggle language selection"
                >
                  {i18n.language === "en" ? "English" : "العربية"}
                </button>
                {isNavDropdownActive && (
                  <ul className="dropdown-menu">
                    <li>
                      <a href="#" onClick={changeLanguage}>
                        {i18n.language === "en" ? "العربية" : "English"}
                      </a>
                    </li>
                  </ul>
                )}
              </li>
            </ul>

            {/* Mobile Nav Toggle Button */}
            <div className="d-flex">
              <i
                className={`mobile-nav-toggle d-xl-none bi ${
                  isNavActive ? "bi-x" : "bi-list"
                }`}
                onClick={toggleNavMenu}
                aria-label="Toggle navigation menu"
              ></i>
            </div>
          </nav>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <button
        className="scroll-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        aria-label="Scroll to top"
      >
        <i className="bi bi-arrow-up"></i>
      </button>
    </header>
  );
};

export default Header;
