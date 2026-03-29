import React from "react";
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import Navbar from '../../components/Navbar/Navbar';
import Logo from '../../images/logo_logica01.svg'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import PageTitle from '../../components/pagetitle/PageTitle'
import { Col, Row, Button, Dropdown } from '@themesberg/react-bootstrap';
import { ProfileCardWidget } from "../../components/Widgets/Widgets";
import { GeneralInfoForm } from "../../components/Forms/Forms";
import Footer from "../../components/footer/Footer";
//Revisar con Naths si puedo quitar el primer div o lo vamos a querer para algo mas 
const ProfilePage = () => {
  return (
    <>
    <HeaderTop />
    <Navbar hclass={'wpo-site-header'} Logo={Logo} />
    <PageTitle pageTitle={'Perfil'} pagesub={'Profile'} />
     <div className="container px-3 px-md-5 py-4">
      <Row>
        <Col xs={12} xl={8}>
          <GeneralInfoForm />
        </Col>

        <Col xs={12} xl={4}>
          <Row>
            <Col xs={12}>
              <ProfileCardWidget />
            </Col>
          </Row>
        </Col>
      </Row>
      </div>
      <Footer hclass={"wpo-site-footer-s2"} />
    </>
  );
};

export default ProfilePage;