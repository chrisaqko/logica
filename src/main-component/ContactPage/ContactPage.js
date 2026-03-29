import React, { Fragment } from 'react';
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import Contactpage from '../../components/Contactpage/Contactpage';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '../../images/logo.svg';


const ContactPage = () => {
    return (
        <Fragment>
            <HeaderTop />
            <Navbar hclass={'wpo-site-header'} Logo={Logo} />
            <PageTitle pageTitle={'Contáctenos'} pagesub={'Contacto'} />
            <Contactpage />
            <Footer hclass={'wpo-site-footer-s3'} NewsletterShow={false} InstagramShow={true} FooterShape={false} />
            <Scrollbar />
        </Fragment>
    )
};
export default ContactPage;





