import React, { useState } from "react";
import MaritimeTariffsForm from "./MaritimeTariffsForm";
import AirTariffsForm from "./AirTariffsForm";

const VariableManager = () => {
  const [selectedForm, setSelectedForm] = useState(null);

  return (
    <>
      <section className="static-hero">
        <div className="hero-container">
          <div className="hero-inner">
            <div className="container">
              <div className="slide-title ">
                <h2>Gestión de Tarifas</h2>
              </div>
              <div className="slide-text">
                <p>Configure las tarifas a cobrar según el tipo de servicio.</p>
              </div>
              <div className="clearfix"></div>
              <div className="row justify-content-center mb-4">
                <div className="col-auto">
                  <button
                    className={`theme-btn ${
                      selectedForm === "maritime" ? "active" : ""
                    }`}
                    onClick={() => setSelectedForm("maritime")}
                  >
                    Servicio Marítimo
                  </button>
                </div>
                <div className="col-auto">
                  <button
                    className={`theme-btn ${
                      selectedForm === "air" ? "active" : ""
                    }`}
                    onClick={() => setSelectedForm("air")}
                  >
                    Servicio Aéreo
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <div className="row justify-content-center">
        <div className="col-lg-10">
          {selectedForm === "maritime" && <MaritimeTariffsForm />}
          {selectedForm === "air" && <AirTariffsForm />}
        </div>
      </div>
    </>
  );
};

export default VariableManager;
