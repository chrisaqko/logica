import React from 'react';
import './MissionVision.css';

const MissionVision = () => {
    return (
        <section className="wpo-mission-vision-section section-padding">
            <div className="container">
                <div className="row">
                    <div className="col col-lg-6 col-md-12 col-12">
                        <div className="wpo-mission">
                            <h2>Misión</h2>
                            <p>
                            Somos una empresa dispuesta a resolver sus necesidades de logística, 
                            trámites aduanales y reorganización de sus procesos internos, en forma segura ágil, 
                            rentable, eficaz y siempre en pos de la mejora continua.
                            </p>
                        </div>
                    </div>
                    <div className="col col-lg-6 col-md-12 col-12">
                        <div className="wpo-vision">
                            <h2>Visión</h2>
                            <p>
                            Ser el mejor asesor logístico y organizacional, con excelente servicio, actitud, 
                            responsabilidad y compromiso hacia nuestros clientes, en forma personalizada, eficaz y eficiente.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default MissionVision;