import React from 'react';
import CountUp from 'react-countup';
import Shape from '../../images/funfact.png'

const FunFact = (props) => {

    return (
        <section className={"" + props.hclass}>
            <div className="container">
                <div className="row">
                    <div className="col col-xs-12">
                        <div className="wpo-fun-fact-grids clearfix">
                            <div className="grid">
                                <div className="info">
                                    <h3><CountUp end={2500} enableScrollSpy /></h3>
                                    <p>Clientes Satisfechos</p>
                                </div>
                            </div>
                            <div className="grid">
                                <div className="info">
                                    <h3><CountUp end={150} enableScrollSpy /></h3>
                                    <p>Proyectos Activos</p>
                                </div>
                            </div>
                            <div className="grid">
                                <div className="info">
                                    <h3><CountUp end={200} enableScrollSpy /></h3>
                                    <p>Expertos en planilla</p>
                                </div>
                            </div>
                            <div className="grid">
                                <div className="info">
                                    <h3><CountUp end={30} enableScrollSpy /></h3>
                                    <p>años de experiencia</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="shape">
                <img src={Shape} alt="" />
            </div>
        </section>
    )

}

export default FunFact;




