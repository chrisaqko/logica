import React, { useState, useEffect } from "react";
import { getDocument, setDocument } from "../../firebase/firestore";
import { toast } from "react-toastify";

const AirTariffsForm = () => {
  useEffect(() => {
    async function fetchData() {
      let resultado = await getDocument("tarifasAereas", "gmUlcjdtp85tnz0sdDy5");
      setTarifas(resultado.data);
    }
    fetchData();
  }, []);

  const [tarifas, setTarifas] = useState({
    collFee: "",
    terminalFee: "",
    fuelSurcharge: "",
    securitySurcharge: "",
    airportDelivery: "",
    usoTerminal: "",
    airFreight: "",
  });

  const handleChange = (campo, valor) => {
    setTarifas((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleGuardar = async () => {
    let result = await setDocument(
      "tarifasAereas",
      "gmUlcjdtp85tnz0sdDy5",
      tarifas
    );
    if (result.success) {
      toast.success("¡Tarifas guardadas con éxito!");
    } else {
      toast.error("No se pudo guardar la información");
    }
    console.log("Tarifas guardadas:", tarifas);
  };

  const formatLabel = (key) => {
    const labels = {
      airFreight: "AIR FREIGHT",
      airportDelivery: "AIRPORT DELIVERY",
      securitySurcharge: "SECURITY SURCHARGE",
      fuelSurcharge: "FUEL SURCHARGE",
      terminalFee: "TERMINAL FEE",
      usoTerminal: "USO TERMINAL",
      collFee: "COLL FEE",
    };
    return labels[key] || key;
  };

  return (
    <section className="wpo-calculation-section-s3 section-padding">
      <div
        className="wpo-calculation-section-wrapper"
        style={{ paddingRight: 0 }}
      >
        <div className="col-md-12 col-12">
          <div className="wpo-contact-form-area">
            <div className="wpo-section-title text-center">
              <span>Tarifas de Servicio</span>
              <h2>Servicio Aéreo</h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGuardar();
              }}
              className="contact-validation-active"
            >
              <div className="shipt-info">
                <div className="row">
                  {Object.entries(tarifas).map(([clave, valores]) => (
                    <div className="col-lg-6 col-md-6 col-12 mb-4" key={clave}>
                      <div className="wpo-service-item">
                        <div className="wpo-service-icon">
                          <i className="fi flaticon-airplane"></i>
                        </div>
                        <div className="wpo-service-text">
                          <h5>{formatLabel(clave)}</h5>
                          <div className="form-group mb-3">
                            <label className="form-label">
                              Precio por kilo ($)
                            </label>
                            <input
                              type="number"
                              className="form-control"
                              value={valores}
                              onChange={(e) =>
                                handleChange(clave, e.target.value)
                              }
                              placeholder=""
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="submit-area mt-4 text-center">
                <button type="submit" className="theme-btn">
                  Guardar Tarifas
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AirTariffsForm;
