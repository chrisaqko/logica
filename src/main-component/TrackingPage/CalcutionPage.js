import React, { Fragment } from 'react';
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import CalculationForm from '../../components/CalculationSection/CalculationForm';
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar'
import Logo from '../../images/logo.svg'

const TrackingPage = (props) => {


    return (
        <Fragment>
            <HeaderTop />
            <Navbar hclass={'wpo-site-header'} Logo={Logo} />
            <PageTitle pageTitle={'Cotización'} pagesub={'Cotización'} />
            <section className="wpo-calculation-section-s3 section-padding" >
                <div className="container">
                    <div className="wpo-calculation-section-wrapper">
                        <div className="row align-items-center">
                            <div className="col-lg-10 col-md-12 col-12">
                                <CalculationForm SectionTitleShow={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <Footer hclass={'wpo-site-footer'} NewsletterShow={false} InstagramShow={false} FooterShape={false} upperContactArea={true} />
            <Scrollbar />
        </Fragment>
    )
};
export default TrackingPage;



