import React, { Fragment } from "react";
import HeaderTop from "../../components/HeaderTop/HeaderTop";
import Navbar from "../../components/Navbar/Navbar";
import HeroSlider from "../../components/HeroSlider/HeroSlider";
import FunFact from "../../components/FunFact/FunFact";
import About from "../../components/about/about";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Logo from "../../images/logo.svg";
import OrderStatus from "./OrderStatus";
import PageTitle from '../../components/pagetitle/PageTitle';

const OrderStatusHomepage = () => {
  return (
    <Fragment>
      <HeaderTop />
      <Navbar hclass={"wpo-site-header"} Logo={Logo} />
      <PageTitle pageTitle={'Estado de Pedidos'} pagesub={'Pedidos'} />
      <OrderStatus />
      <Footer hclass={"wpo-site-footer"} upperContactArea={true} />
      <Scrollbar />
    </Fragment>
  );
};

export default OrderStatusHomepage;


