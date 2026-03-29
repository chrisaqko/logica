import React from 'react';


const HeaderTopS2 = () => {
    return (
        <div className="topbar s2">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-12 col-12">
                        <div className="contyact-info-wrap">
                            <div className="contact-info">
                                <div className="icon">
                                    <i className="fi flaticon-phone-call"></i>
                                </div>
                                <div className="info-text">
                                    <span>Llámenos al:</span>
                                    <p>2253 2834</p>
                                </div>
                            </div>
                            <div className="contact-info">
                                <div className="icon">
                                    <i className="fi flaticon-email"></i>
                                </div>
                                <div className="info-text">
                                    <span>Escríbanos al:</span>
                                    <p>lruiz@logicatransport.com</p>
                                </div>
                            </div>
                            <div className="contact-info">
                                <div className="icon">
                                    <i className="fi flaticon-clock"></i>
                                </div>
                                <div className="info-text">
                                    <span>Horario:</span>
                                    <p>(L-V) 08:00 am to 05:00 pm</p>
                                </div>
                            </div>
                            {/* <div className="contact-info">
                                <div className="icon">
                                    <i className="fi flaticon-location-1"></i>
                                </div>
                                <div className="info-text">
                                    <span>Dirección:</span>
                                    <p>San Pedro,  San José CR</p>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HeaderTopS2;