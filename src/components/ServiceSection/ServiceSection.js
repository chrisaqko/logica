import React from "react";
import { Link } from 'react-router-dom'
import SectionTitle from "../SectionTitle/SectionTitle";
import Services from "../../api/Services";



const ServiceSection = (props) => {

    const ClickHandler = () => {
        window.scrollTo(10, 0);
    }

    const { SectionTitleShow = true, ServiceBtn = false } = props

    return (
        <div className={"" + props.hclass}>
            <div className="container">
                {SectionTitleShow && (
                    <SectionTitle subtitle={'Nuestros servicios'} title={'Las mejores soluciones para usted'} />
                )}
                <div className="wpo-service-wrap">
                <div className="row align-items-stretch g-4">
                {Services.slice(0, 3).map((service, item) => (
                    <div className="col-lg-4 col-md-6 col-12 d-flex" key={item}>
                        <div className="wpo-service-item d-flex flex-column h-100 w-100">
                            <div className="wpo-service-img">
                                <img src={service.image} alt="" />
                            </div>
                            <div className="wpo-service-content d-flex flex-column flex-grow-1">
                                <span>{service.subtitle}</span>
                                <h2>{service.title}</h2>
                                <p>{service.description}</p>
                                <div className="mt-auto">
                                    <Link to={`/service-single/${service.slug}`} onClick={ClickHandler}>Leer más</Link>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                </div>
                    {ServiceBtn && (
                        <div className="service-btn">
                            <Link onClick={ClickHandler} className="theme-btn-s2" to="/service">Todos los Servicios</Link>
                        </div>
                    )}
                </div>
            </div>
        </div>

    );
}

export default ServiceSection;



