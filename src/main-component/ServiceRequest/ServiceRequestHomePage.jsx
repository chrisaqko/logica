import React, { Fragment } from "react";
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import Navbar from '../../components/Navbar/Navbar';
import Instructions from '../../components/Instructions/Instructions';
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Logo from "../../images/logo.svg";
import ServiceForm from "./ServiceForm";

const VariableManagerHomepage = () => {
  return (
    <Fragment>
      <HeaderTop/>
      <Navbar hclass={'wpo-site-header'} Logo={Logo} />
      <Instructions/>
      <ServiceForm />
      <Footer hclass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </Fragment>
  );
};

export default VariableManagerHomepage;