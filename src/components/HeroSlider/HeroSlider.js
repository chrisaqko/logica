import React from "react";
import { Navigation, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom'

//nuevas imágenes sin copyright (desde Freepik)
import hero1 from '../../images/slider/banner_slider_1.jpg'
import hero2 from '../../images/slider/banner_slider_2.jpg'
import hero3 from '../../images/slider/banner_slider_3.jpg'
import hero4 from '../../images/slider/banner_slider_2.jpg'
const HeroSlider = () => {
    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }
    return (
        <section className="wpo-hero-slider wpo-hero-slider-s1" >
            <Swiper
                // install Swiper modules
                modules={[Navigation, A11y]}
                spaceBetween={0}
                slidesPerView={1}
                loop={true}
                speed={1800}
                parallax={true}
                navigation
            >
                <SwiperSlide>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero1})` }}>
                        <div className="gradient-overlay"></div>
                        <div className="vector-1"></div>
                        <div className="vector-2"></div>
                        <div className="vector-3"></div>
                        <div className="vector-4"></div>
                        <div className="vector-5"></div>
                        <div className="vector-6"></div>
                        <div className="vector-7"></div>
                        <div className="vector-8"></div>
                        <div className="container">
                            <div className="slide-content">
                                <div className="slide-title">
                                    <h2>Servicios de transporte de clase mundial, confiables y seguros</h2>
                                </div>
                                <div className="slide-text">
                                    <p>En Lógica Transport, nos preocupamos por brindarle una atención única y de calidad</p>
                                </div>
                                <div className="clearfix"></div>
                                <div className="slide-btns">
                                    <Link onClick={ClickHandler} to="/service" className="theme-btn-s2">Nuestros Servicios</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                                <SwiperSlide>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero4})` }}>
                        <div className="gradient-overlay"></div>
                        <div className="vector-1"></div>
                        <div className="vector-2"></div>
                        <div className="vector-3"></div>
                        <div className="vector-4"></div>
                        <div className="vector-5"></div>
                        <div className="vector-6"></div>
                        <div className="vector-7"></div>
                        <div className="vector-8"></div>
                        <div className="container">
                            <div className="slide-content">
                                <div className="slide-title">
                                    <h2>No se lleve ninguna sorpresa</h2>
                                </div>
                                <div className="slide-text">
                                    <p>Cotizá tus servicios</p>
                                </div>
                                <div className="clearfix"></div>
                                <div className="slide-btns">
                                    <Link onClick={ClickHandler} to="/calculation" className="theme-btn-s2">Cotizar</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero2})` }}>
                        <div className="gradient-overlay"></div>
                        <div className="vector-1"></div>
                        <div className="vector-2"></div>
                        <div className="vector-3"></div>
                        <div className="vector-4"></div>
                        <div className="vector-5"></div>
                        <div className="vector-6"></div>
                        <div className="vector-7"></div>
                        <div className="vector-8"></div>
                        <div className="container">
                            <div className="slide-content">
                                <div className="slide-title">
                                    <h2>Misión</h2>
                                </div>
                                <div className="slide-text">
                                    <p>Ser el mejor asesor logístico y organizacional, con excelente servicio,actitud; responsabilidad y compromiso hacia nuestros clientes, en forma personalizada eficaz y eficiente.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className="slide-inner slide-bg-image" style={{ backgroundImage: `url(${hero3})` }}>
                        <div className="gradient-overlay"></div>
                        <div className="vector-1"></div>
                        <div className="vector-2"></div>
                        <div className="vector-3"></div>
                        <div className="vector-4"></div>
                        <div className="vector-5"></div>
                        <div className="vector-6"></div>
                        <div className="vector-7"></div>
                        <div className="vector-8"></div>
                        <div className="container">
                            <div className="slide-content">
                                <div className="slide-title">
                                    <h2>Comunicación y eficiencia como clave de nuestro negocio</h2>
                                </div>
                                <div className="slide-text">
                                    <p>Ofrecemos un canal de comunicación directa, ofreciendo trasparencia y eficiencia al trabajar con sus pedidos</p>
                                </div>
                                <div className="clearfix"></div>
                                <div className="slide-btns">
                                    <Link onClick={ClickHandler} to="/service" className="theme-btn-s2">Nuestros Servicios</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>

                ...
            </Swiper>
        </section>
    );
};

export default HeroSlider;






