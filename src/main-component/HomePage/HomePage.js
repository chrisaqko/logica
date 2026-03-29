import React, { Fragment } from "react";
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import Navbar from "../../components/Navbar/Navbar";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import FunFact from "../../components/FunFact/FunFact";
import About from "../../components/about/about";
import ServiceSection from "../../components/ServiceSection/ServiceSection";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Logo from "../../images/logo.svg";
import { Link } from "react-router-dom";



const HomePage = () => {
  return (
    <Fragment>
      <HeaderTop />
      <Navbar hclass={"wpo-site-header"} Logo={Logo} />
      <HeroSlider />

      <FunFact hclass={"wpo-fun-fact-section"} />
      <About hclass={"wpo-about-section section-padding"} />
      <ServiceSection
        hclass={"wpo-service-area section-padding"}
        ServiceBtn={true}
      />
      <Footer hclass={"wpo-site-footer"} upperContactArea={true} />
      <Scrollbar />
    </Fragment>
  );
};
export default HomePage;
