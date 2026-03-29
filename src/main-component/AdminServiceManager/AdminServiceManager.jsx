import React, { Fragment } from 'react';
import HeaderTopS2 from "../../components/HeaderTopS2/HeaderTopS2";
import HeaderS2Admin from "../../components/HeaderS2Admin/HeaderS2Admin";
import Footer from '../../components/footer/Footer';
import PageTitle from '../../components/pagetitle/PageTitle';
import ServiceRequestHistory from '../../components/OrderHistory/ServiceRequestHistory';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '../../images/logo.svg';

const AdminServiceManager = () => {
  return (
    <Fragment>
        <HeaderTopS2 />
      <HeaderS2Admin Logo={Logo} />
      <PageTitle pageTitle={'Historial de Solicitudes'} pagesub={'Servicios'} />
      <ServiceRequestHistory />
      <Footer hclass={'wpo-site-footer-s3'} NewsletterShow={false} InstagramShow={false} FooterShape={false} />
      <Scrollbar />
    </Fragment>
  );
};

export default AdminServiceManager;