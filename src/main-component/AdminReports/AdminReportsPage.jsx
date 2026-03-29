import React, { Fragment } from "react";
import HeaderTopS2 from "../../components/HeaderTopS2/HeaderTopS2";
import HeaderS2Admin from "../../components/HeaderS2Admin/HeaderS2Admin";
import Footer from "../../components/footer/Footer";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Logo from "../../images/logo.svg";
import AdminReports from "./AdminReports";
import PageTitle from '../../components/pagetitle/PageTitle';


const AdminReportsPage = () => {
  return (
    <Fragment>
      <HeaderTopS2 />
      <HeaderS2Admin Logo={Logo} />
      <PageTitle pageTitle={'Reporteria'} />
      <AdminReports />
      <Footer hclass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </Fragment>
  );
};

export default AdminReportsPage;