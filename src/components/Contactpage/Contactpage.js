import React from 'react';
import ContactForm from '../ContactFrom/ContactForm'
import ContactMap from './ContactMap';
import WhatsApp from "../../images/WhatsAppButtonGreenSmall.svg";

const Contactpage = () => {

    return (
        <div>
            <ContactMap />
            <section className="wpo-contact-pg-section section-padding pt-0">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="wpo-contact-form-area">
                                <div className="wpo-contact-title">
                                    <h2>Contáctenos</h2>
                                    <p>Ponemos a su disposición múltiples canales de contacto.
                                        Puede completar el siguiente form para que nuestro equipo se contacte con usted o su empresa.</p>
                                </div>
                                <ContactForm />
                            </div>
                        </div>
                        <div className="col col-lg-4">
                            <div className="office-info">
                                <div className="office-info-item">
                                    <div className="office-info-icon">
                                        <div className="icon">
                                            <i className="fi flaticon-phone-call"></i>
                                        </div>
                                    </div>
                                    <div className="office-info-text">
                                        <h2>Contactenos por WhatsApp</h2>
                                        <a aria-label="Chat on WhatsApp" href="https://wa.me/50661884060" target="_blank"> <img alt="Chat on WhatsApp" src={WhatsApp}/> </a>
                                    </div>
                                </div>
                                <div className="office-info-item">
                                    <div className="office-info-icon">
                                        <div className="icon">
                                            <i className="fi flaticon-phone-call"></i>
                                        </div>
                                    </div>
                                    <div className="office-info-text">
                                        <h2>Llámenos:</h2>
                                        <p>+506 2253 2834</p>
                                    </div>
                                </div>
                                <div className="office-info-item">
                                    <div className="office-info-icon">
                                        <div className="icon">
                                            <i className="fi flaticon-email-3"></i>
                                        </div>
                                    </div>
                                    <div className="office-info-text">
                                        <h2>Escríbanos al:</h2>
                                        <p>lruiz@logicatransport.com</p>
                                    </div>
                                </div>
                                <div className="office-info-item">
                                    <div className="office-info-icon">
                                        <div className="icon">
                                            <i className="fi flaticon-clock"></i>
                                        </div>
                                    </div>
                                    <div className="office-info-text">
                                        <h2>Nuestro Horario:</h2>
                                        <p>(L-V) 08:00 am to 05:00 pm</p>
                                    </div>
                                </div>
                                <div className="office-info-item">
                                    <div className="office-info-icon">
                                        <div className="icon">
                                            <i className="fi flaticon-location-1"></i>
                                        </div>
                                    </div>
                                    <div className="office-info-text">
                                        <h2>Nuestra ubicación:</h2>
                                        <p> Ofiplaza East San Pedro, San José CR</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )


}

export default Contactpage;
