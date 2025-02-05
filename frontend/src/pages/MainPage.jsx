import React, { useState, useEffect } from "react";
import Header from "../components/Header/Header";
import Hero from "../components/Hero";
import About from "../components/About";
import AOS from "aos";
import "aos/dist/aos.css"; // Import the AOS CSS
import Products from "../components/Products";
import Contact from "../components/Contact";
import Footer from "../components/Footer";
import WhatsAppButton from "../global/whatsapp-button/Whatsapp-Button";
// import { LanguageProvider } from "../global/LanguageContext";

function MainPage() {
  useEffect(() => {
    // Initialize AOS once the component mounts
    AOS.init();
  }, []);
  return (
    <>
      {/* <LanguageProvider> */}
        <Header />
        <WhatsAppButton />
        <main className="main">
          <Hero />
          <Products />
          <About />
          <Contact />
        </main>
        <Footer />
      {/* </LanguageProvider> */}
    </>
  );
}

export default MainPage;
