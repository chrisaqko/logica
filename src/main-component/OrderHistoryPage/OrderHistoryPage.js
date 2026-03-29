import React, { Fragment } from 'react';
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/footer/Footer';
import PageTitle from '../../components/pagetitle/PageTitle';
import OrderHistory from '../../components/OrderHistory/OrderHistory';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '../../images/logo.svg';

const OrderHistoryPage = () => {
  return (
    <Fragment>
        <HeaderTop />
      <Navbar hclass={'wpo-site-header'} Logo={Logo} />
      <PageTitle pageTitle={'Historial de Pedidos'} pagesub={'Pedidos'} />
      <OrderHistory />
      <Footer hclass={'wpo-site-footer-s3'} NewsletterShow={false} InstagramShow={false} FooterShape={false} />
      <Scrollbar />
    </Fragment>
  );
};

export default OrderHistoryPage;