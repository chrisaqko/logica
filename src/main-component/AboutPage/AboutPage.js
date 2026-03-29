import React, { Fragment } from 'react';
import HeaderTop from '../../components/HeaderTop/HeaderTop';
import Navbar from '../../components/Navbar/Navbar';
import PageTitle from '../../components/pagetitle/PageTitle'
import About from '../../components/about/about';
import ServiceSection from '../../components/ServiceSection/ServiceSection';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar';
import Logo from '../../images/logo.svg'
import MissionVision from '../../components/MissionVision/MissionVision';

const AboutPage = () => {
    return (
        <Fragment>
            <HeaderTop />
            <Navbar hclass={'wpo-site-header'} Logo={Logo} />
            <PageTitle pageTitle={'Sobre Nosotros'} pagesub={'Sobre Nosotros'} />
            <About hclass={'wpo-about-section section-padding'} />
            <MissionVision />
            <ServiceSection hclass={"wpo-service-area section-padding"} ServiceBtn={true} />
            <Footer hclass={'wpo-site-footer-s3'} NewsletterShow={false} InstagramShow={true} FooterShape={false} />
            <Scrollbar />
        </Fragment>
    )
};
export default AboutPage;
