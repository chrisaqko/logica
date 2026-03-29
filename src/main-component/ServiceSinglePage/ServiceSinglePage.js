import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom'
import Services from '../../api/Services';
import ServiceSidebar from './sidebar'
import HeaderTop from '../../components/HeaderTop/HeaderTop'
import Navbar from '../../components/Navbar/Navbar'
import PageTitle from '../../components/pagetitle/PageTitle'
import Footer from '../../components/footer/Footer';
import Scrollbar from '../../components/scrollbar/scrollbar'
import Logo from '../../images/logo.svg'
const ServiceSinglePage = (props) => {
  

    const { slug } = useParams()
    const serviceDetails = Services.find(item => item.slug === slug)

    return (
        <Fragment>
            <HeaderTop />
            <Navbar hclass={'wpo-site-header'} Logo={Logo} />
            <PageTitle pageTitle={serviceDetails.title} pagesub={'Servicios'} />
            <div className="wpo-service-single-area section-padding">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8 col-12">
                            <div className="wpo-service-single-wrap">
                                <div className="wpo-service-single-item">
                                    <div className="wpo-service-single-main-img">
                                        <img src={serviceDetails.simag} alt="" />
                                    </div>
                                    <div className="wpo-service-single-title">
                                        <h3>{serviceDetails.title}</h3>
                                    </div>
                                    <p>El servicio de transporte aéreo es una solución logística estratégica pensada para movilizar 
                                        pedidos de gran escala con rapidez, seguridad y eficiencia. A través de este servicio, 
                                        las mercancías son trasladadas por medio de aerolíneas comerciales o cargueras, permitiendo 
                                        una cobertura nacional e internacional en tiempos reducidos y con un alto nivel de confiabilidad.</p>
                                    <p>En Lógica Transport, trabajamos de la mano con operadores especializados como LATAM Cargo, Avianca Cargo 
                                        y otras líneas aéreas reconocidas, garantizando el manejo adecuado de cada envío según sus características 
                                        y requerimientos. Este servicio es ideal para empresas que necesitan abastecimiento constante, entregas urgentes 
                                        o que manejan productos de alto valor que requieren condiciones especiales de transporte..
                                    </p>
                                </div>
                                <div className="wpo-service-single-item">
                                    <div className="why-choose-wrap">
                                        <div className="why-choose-left">
                                            <h2>¿Por qué elegir este servicio?</h2>
                                            <p>Cada tipo de servicio se acopla a distintas necesidades, por lo que estas son algunos de los beneficios de este servicio.</p>
                                        </div>
                                        <div className="why-choose-right">
                                            <div className="wpo-choose-check-wrap">
                                                <div className="wpo-choose-check-item">
                                                    <p>Ideal para envíos urgentes o de respuesta rápida</p>
                                                </div>
                                                <div className="wpo-choose-check-item">
                                                    <p>Acceso a rutas y destinos en todo el mundo gracias a alianzas con aerolíneas.</p>
                                                </div>
                                                <div className="wpo-choose-check-item">
                                                    <p>Mayor control sobre la trazabilidad del envío y menor riesgo de pérdida.</p>
                                                </div>
                                                <div className="wpo-choose-check-item">
                                                    <p>Perfecto para productos que requieren condiciones especiales.</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="v-shape">
                                            <img src="assets/images/v-shape.png" alt="" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-12">
                            <ServiceSidebar />
                        </div>
                    </div>
                </div>
            </div>
            <Footer hclass={'wpo-site-footer-s3'} NewsletterShow={false} InstagramShow={false} FooterShape={false} />
            <Scrollbar />
        </Fragment>
    )
};
export default ServiceSinglePage;



