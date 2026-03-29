import React, { useState, useEffect } from "react";
import { getDocument, setDocument } from "../../firebase/firestore";
import { toast } from "react-toastify";

const FormularioMaritimo = () => {
  useEffect(() => {
    async function fetchData() {
      let resultado = await getDocument(
        "tarifasMaritimo",
        "ZmEwCJ73Ds0po1EBbvqS"
      );
      setTarifas(resultado.data);
    }
    fetchData();
  }, []);

  const [tarifas, setTarifas] = useState({
    gri: { weight: "", measure: "" },
    collFree: { weight: "", measure: "" },
    apm: { weight: "", measure: "" },
    oceanFreight: { weight: "", measure: "" },
  });

  const handleChange = (tipo, campo, valor) => {
    setTarifas((prev) => ({
      ...prev,
      [tipo]: {
        ...prev[tipo],
        [campo]: valor,
      },
    }));
  };

  const handleGuardar = async () => {
    let result = await setDocument(
      "tarifasMaritimo",
      "ZmEwCJ73Ds0po1EBbvqS",
      tarifas
    );
    if (result.success) {
      toast.success("¡Tarifas guardadas con éxito!");
    } else {
      toast.error("No se pudo guardar la información");
    }
    console.log("Tarifas guardadas:", tarifas);
  };

  const formatoNombre = (clave) => {
    const nombres = {
      oceanFreight: "OCEAN FREIGHT",
      apm: "APM",
      gri: "GRI",
      collFree: "COLL FEE",
    };
    return nombres[clave] || clave;
  };

  return (
    <section className="wpo-calculation-section-s3 section-padding">
        <div className="wpo-calculation-section-wrapper" style={{paddingRight: 0}}>
            <div className="col-md-12 col-12">
              <div className="wpo-contact-form-area">
                <div className="wpo-section-title text-center">
                  <span>Tarifas de Servicio</span>
                  <h2>Servicio Marítimo</h2>
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
                        <div
                          className="form-group col-lg-6 col-md-6 col-12"
                          key={clave}
                        >
                          <div className="wpo-service-item">
                            <div className="wpo-service-icon">
                              <i className="fi flaticon-ship"></i>
                            </div>
                            <div className="personal-info">
                              <h5>{formatoNombre(clave)}</h5>

                              <div className="form-group mb-3">
                                <label className="form-label">Peso ($)</label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={valores.weight}
                                  onChange={(e) =>
                                    handleChange(
                                      clave,
                                      "weight",
                                      e.target.value
                                    )
                                  }
                                  placeholder="-"
                                />
                              </div>

                              <div className="form-group mb-3">
                                <label className="form-label">
                                  Volumen ($)
                                </label>
                                <input
                                  type="number"
                                  className="form-control"
                                  value={valores.measure}
                                  onChange={(e) =>
                                    handleChange(
                                      clave,
                                      "measure",
                                      e.target.value
                                    )
                                  }
                                  placeholder="Ingrese el costo por volumen"
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

export default FormularioMaritimo;
