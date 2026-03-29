import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from "../../images/logo_logica01.svg"
import Services from '../../api/Services'
/* image */
import Img1 from '../../images/instragram/1.jpg'
import Img2 from '../../images/instragram/2.jpg'
import Img3 from '../../images/instragram/3.jpg'
import Img4 from '../../images/instragram/4.jpg'
import Img5 from '../../images/instragram/5.jpg'
import Img6 from '../../images/instragram/6.jpg'


const ClickHandler = () => {
    window.scrollTo(10, 0);
}

const Footer = (props) => {
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');

    const validateEmail = (email) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        return re.test(String(email).toLowerCase());
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateEmail(email)) {
            setError('');
            console.log('Email is valid:', email);
        } else {
            setError('Please enter a valid email address.');
        }
    };

    const { upperContactArea = false, InstagramShow = false, NewsletterShow = true, FooterShape = true } = props

    return (
        <footer className={'' + props.hclass}>
            {upperContactArea && (
                <div className="upper-contact-area">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="contact-grids">
                                    <div className="grid">
                                    <div className="icon">
                                        <i className="fi flaticon-location-1"></i>
                                    </div>
                                    <div className="details">
                                        <h5>Dirección:</h5>
                                        <p>Ofiplaza East San Pedro, San José CR</p>
                                    </div>
                                    </div>
                                    <div className="grid">
                                        <div className="icon">
                                            <i className="fi flaticon-email"></i>
                                        </div>
                                        <div className="details">
                                            <h5>Correo:</h5>
                                            <p>lruiz@logicatransport.com</p>
                                        </div>
                                    </div>
                                    <div className="grid">
                                        <div className="icon">
                                            <i className="fi flaticon-phone-call"></i>
                                        </div>
                                        <div className="details">
                                            <h5>Teléfono:</h5>
                                            <p>(+506) 2253 2834</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <div className="upper-footer">
                <div className="container">
                    <div className="row gy-4 align-items-stretch">
                        <div className="col col-lg-4 col-md-6 col-12">
                            <div className="widget about-widget h-100 d-flex flex-column">
                                <div className="logo widget-title">
                                    <img src={logo} alt='' />
                                </div>
                                <p>Ponemos 30 años de experiencia a su disposición para ofrecer el mejor servicio.</p>                           
                            </div>
                        </div>
                        <div className="col col-lg-2 col-md-6 col-12">
                            <div className="widget link-widget h-100 d-flex flex-column">
                                <div className="widget-title">
                                    <h3>Navegación</h3>
                                </div>
                                <ul>
                                    <li><Link onClick={ClickHandler} to="/about">Sobre Nosotros</Link></li>
                                    <li><Link onClick={ClickHandler} to="/contact">Contacto</Link></li>
                                    <li><Link onClick={ClickHandler} to="/calculation">Cotización de Servicios</Link></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col col-lg-3 col-md-6 col-12">
                            <div className="widget link-widget service-link-widget h-100 d-flex flex-column">
                                <div className="widget-title">
                                    <h3>Todos los Servicios</h3>
                                </div>
                                <ul>
                                    {Services.slice(0, 3).map((fservic, index) => (
                                        <li key={index}><Link onClick={ClickHandler} to={`/service-single/${fservic.slug}`}>{fservic.title}</Link></li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        {/*{NewsletterShow && (
                            <div className="col col-lg-3 col-md-6 col-12">
                                <div className="widget newsletter-widget">
                                    <div className="widget-title">
                                        <h3>Newsletter</h3>
                                    </div>
                                    <p>etiam sed est eu tempus need Temer diam congue laoret cursus nam nunc fam interdum
                                        Viverra.</p>
                                    <form onSubmit={handleSubmit}>
                                        <div className="input-1">
                                            <input
                                                type="email"
                                                className="form-control"
                                                placeholder="Email Address *"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                            />
                                        </div>
                                        {error && <div className="error-message" style={{ color: 'red' }}>{error}</div>}
                                        <div className="submit clearfix">
                                            <button type="submit">
                                                <i className="ti-email"></i>
                                            </button>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        )}*/}
                        {/*{InstagramShow &&
                            (
                                <div className="col col-lg-3 col-md-6 col-12">
                                    <div className="widget instagram">
                                        <div className="widget-title">
                                            <h3>Galería</h3>
                                        </div>
                                        <ul className="d-flex">
                                            <li><img src={Img1}
                                                alt="" /></li>
                                            <li><img src={Img2}
                                                alt="" /></li>
                                            <li><img src={Img3}
                                                alt="" /></li>
                                            <li><img src={Img4}
                                                alt="" /></li>
                                            <li><img src={Img5}
                                                alt="" /></li>
                                            <li><img src={Img6}
                                                alt="" /></li>
                                        </ul>
                                    </div>
                                </div>
                            )
                        }*/}
                    </div>
                </div>
                {FooterShape && (
                    <div>
                        <div className="vector-1"></div>
                        <div className="vector-2"></div>
                        <div className="vector-3"></div>
                        <div className="vector-4"></div>
                        <div className="vector-5"></div>
                        <div className="vector-6"></div>
                        <div className="vector-7"></div>
                        <div className="vector-8"></div>
                    </div>
                )}
            </div>
            <div className="wpo-lower-footer">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-6 col-md-12  col-12">
                            <p className="copyright">Copyright &copy;<span>2025</span>
                                <span className="copyright-icon">|</span> Todos los derechos reservados. 
                            </p>
                        </div>
                        <div className="col-lg-6 col-md-12  col-12">
                            <p className="link"><Link onClick={ClickHandler} to="/blog">Términos y Condiciones de Servicio</Link> <span>||</span> <Link onClick={ClickHandler} to="/blog">Política de Privacidad</Link></p>
                        </div>
                    </div>
                </div>
            </div>

        </footer >
    )
}

export default Footer;









