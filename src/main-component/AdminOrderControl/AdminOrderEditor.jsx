import React, { Fragment } from 'react';
import HeaderTopS2 from "../../components/HeaderTopS2/HeaderTopS2";
import HeaderS2Admin from "../../components/HeaderS2Admin/HeaderS2Admin";
import Footer from '../../components/footer/Footer';
import PageTitle from '../../components/pagetitle/PageTitle';
import ServiceRequestEditor from '../../components/OrderHistory/ServiceRequestEditor'; 
import OrderEditor from '../../components/OrderControl/OrderEditor';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '../../images/logo.svg';

const AdminOrderEditor = () => {
  return (
    <Fragment>
      <HeaderTopS2 />
      <HeaderS2Admin Logo={Logo} />
      <PageTitle pageTitle={'Administrar Solicitud'} pagesub={'Editar solicitud'} />
      <OrderEditor />
      <Footer hclass={'wpo-site-footer-s3'} NewsletterShow={false} InstagramShow={false} FooterShape={false} />
      <Scrollbar />
    </Fragment>
  );
};

export default AdminOrderEditor;
 