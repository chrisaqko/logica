import React from 'react';
import { Link } from 'react-router-dom';


// image
import Ab from '../../images/about/img1.png'
import Abd1 from '../../images/about/img2.png'

const about = (props) => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <section className={"" + props.hclass}>
            <div className="container">
                <div className="wpo-about-section-wrapper">
                    <div className="row align-items-center">
                        <div className="col-xl-6 col-lg-12 col-md-12 col-12">
                            <div className="wpo-about-img">
                                <div className="wpo-about-img-left">
                                    <img src={Ab} alt="" />
                                </div>
                                <div className="about-img-inner">
                                    <div className="about-img-inner-text">
                                        <h2>30 <span>años de <br /> experiencia.</span></h2>
                                        <p>Un servicio completo, de calidad.</p>
                                    </div>
                                    <img src={Abd1} alt="" />
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-6 col-lg-12 col-md-12 col-12">
                            <div className="wpo-about-content ">
                                <div className="wpo-about-content-top">
                                    <h2>Su confianza nos mueve.</h2>
                                    <p>Ponemos a su dispocisión nuestros 30 años de experiencia.</p>
                                </div>
                                <div className="wpo-about-content-progress">
                                    <div className="progress-inner">
                                        <div className="progress yellow">
                                            <span className="progress-left">
                                                <span className="progress-bar"></span>
                                            </span>
                                            <span className="progress-right">
                                                <span className="progress-bar"></span>
                                            </span>
                                            <div className="progress-value">100%</div>
                                            <div className="progress-name"><span>calidad</span></div>
                                        </div>
                                    </div>
                                    <p>Contamos con servicio de carga consolidad marítima, áerea, terrestre; 
                                        Contenedores y furgones completos. </p>
                                </div>
                                <div className="wpo-about-check-wrap">
                                    <div className="wpo-about-check-item">
                                        <p>Ofrecemos todos estos servicio tanto en importación 
                                        como exportación.</p>
                                    </div>
                                    <div className="wpo-about-check-item">
                                        <p>Ofrecemos los servicios de gestiones de aduana, 
                                        almacenes generales y fiscales.</p>
                                    </div>
                                </div>
                                <Link onClick={ClickHandler} to="/service" className="theme-btn-s2">Todos los servicios</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default about;

