import React, { useState, useEffect } from "react";
import { getDocument } from "../../firebase/firestore";
import Icon from "../../images/arrow.svg";

const oceanFreighDefaultValues = {
  oceanFreight: 185,
  BL: 35,
  handlingFee: 60,
  GRI: 20,
  SED: 0,
  bunker: 70,
  dgCargo: 0,
  apmTerminal: 0,
  thc: 25,
  marchamoElect: 20,
  collFee: 0,
  iva: 15.6,
};

const airFreightDefaultValues = {
  airFreight: 185,
  airportDelivery: 55,
  SED: 0,
  securitySurcharge: 10,
  fullSurcharge: 25,
  guiaAerea: 45,
  DG: 0,
  usoTerminal: 35,
  terminalFee: 45,
  collFee: 0,
  iva: 13,
};

const CalculationForm = (props) => {
  const [formData, setFormData] = useState({
    weight: "",
    volume: "",
    hazmat: false,
    sed: "",
    freightType: "",
  });

  useEffect(() => {
    async function fetchData() {
      let resultadoAereas = await getDocument(
        "tarifasAereas",
        "gmUlcjdtp85tnz0sdDy5"
      );
      let resultadoMaritimas = await getDocument(
        "tarifasMaritimo",
        "ZmEwCJ73Ds0po1EBbvqS"
      );
      setTarifasAereas(resultadoAereas.data);
      setTarifasMaritimas(resultadoMaritimas.data);
    }
    fetchData();
  }, []);

  const [tarifasAereas, setTarifasAereas] = useState({
    collFee: "",
    terminalFee: "",
    fuelSurcharge: "",
    securitySurcharge: "",
    airportDelivery: "",
    usoTerminal: "",
    airFreight: "",
  });

  const [tarifasMaritimas, setTarifasMaritimas] = useState({
    gri: { weight: "", measure: "" },
    collFree: { weight: "", measure: "" },
    apm: { weight: "", measure: "" },
    oceanFreight: { weight: "", measure: "" },
  });

  const [errors, setErrors] = useState({});
  const [submitStatus, setSubmitStatus] = useState(null);
  const [quoteDetails, setQuoteDetails] = useState(null);

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.weight) newErrors.weight = "Ingrese el peso";
    if (!formData.volume) newErrors.volume = "Ingrese el volumen";
    if (!formData.sed) newErrors.sed = "Ingrese la cantidad de SED";
    if (!formData.freightType)
      newErrors.freightType = "Seleccione el tipo de envío";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const calculateAirFreightValues = (formData) => {
    const values = airFreightDefaultValues;

    values.airFreight = Math.max(
      (formData.weight / 2.2) * tarifasAereas.airFreight,
      formData.volume * 4.72 * tarifasAereas.airFreight,
      airFreightDefaultValues.airFreight
    );
    values.airportDelivery = Math.max(
      (formData.weight / 2.2) * tarifasAereas.airportDelivery,
      formData.volume * 4.72 * tarifasAereas.airportDelivery,
      airFreightDefaultValues.airportDelivery
    );
    values.SED = 25 * formData.sed;
    values.securitySurcharge = Math.max(
      (formData.weight / 2.2) * tarifasAereas.securitySurcharge,
      formData.volume * 4.72 * tarifasAereas.securitySurcharge,
      airFreightDefaultValues.securitySurcharge
    );
    values.fullSurcharge = Math.max(
      (formData.weight / 2.2) * tarifasAereas.fuelSurcharge,
      formData.volume * 4.72 * tarifasAereas.fuelSurcharge,
      airFreightDefaultValues.fullSurcharge
    );
    values.DG = formData.hazmat ? 150 : 0;
    values.usoTerminal = Math.max(
      (formData.weight / 2.2) * tarifasAereas.usoTerminal,
      formData.volume * 4.72 * tarifasAereas.usoTerminal,
      airFreightDefaultValues.usoTerminal
    );
    values.collFee = Math.max(values.airFreight * 0.03, 10);
    return values;
  };

  const calculateOceanFreightValues = (formData) => {
    const values = oceanFreighDefaultValues;

    values.oceanFreight = Math.max(
      formData.weight * tarifasMaritimas.oceanFreight.weight,
      formData.volume * tarifasMaritimas.oceanFreight.measure,
      oceanFreighDefaultValues.oceanFreight
    );
    values.GRI = Math.max(
      formData.weight * tarifasMaritimas.gri.weight,
      formData.volume * tarifasMaritimas.gri.measure,
      oceanFreighDefaultValues.GRI
    );
    values.SED = 25 * formData.sed;
    values.DG = formData.hazmat ? 250 : 0;
    values.apmTerminal = Math.max(
      formData.volume * tarifasMaritimas.apm.measure,
      30
    );
    values.thc = Math.max(
      formData.volume * 0.095,
      oceanFreighDefaultValues.thc
    );
    values.collFee = Math.max(
      10,
      values.oceanFreight * tarifasMaritimas.collFree.measure
    );

    return values;
  };

  const calculateTotal = (valores) => {
    return Object.values(valores).reduce((acc, val) => acc + val, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      if (formData.freightType === "air") {
        const result = calculateAirFreightValues(formData);
        setQuoteDetails(result);
      } else if (formData.freightType === "ocean") {
        const result = calculateOceanFreightValues(formData);
        setQuoteDetails(result);
      }

      setSubmitStatus("success");
    } else {
      setSubmitStatus("error");
    }
  };
  const { SectionTitleShow = false } = props;

  const formatLabel = (key) => {
    const labels = {
      airFreight: "AIR FREIGHT",
      airportDelivery: "AIRPORT DELIVERY",
      securitySurcharge: "SECURITY SURCHARGE",
      fullSurcharge: "FULL SURCHARGE",
      guiaAerea: "GUIA AEREA",
      usoTerminal: "USO TERMINAL",
      terminalFee: "TERMINAL FEE",
      collFee: "COLL FEE",
      iva: "IVA",
      oceanFreight: "OCEAN FREIGHT",
      handlingFee: "HANDLING FEE",
      bunker: "BUNKER",
      dgCargo: "DG CARGO",
      apmTerminal: "APM TERMINAL",
      thc: "THC",
      marchamoElect: "MARCHAMO ELECT",
    };
    return labels[key] || key;
  };

  return (
    <div className="wpo-contact-form-area">
      {SectionTitleShow && (
        <div className="wpo-section-title">
          <span>Cotización de Servicio</span>
          <h2>Calcule el precio estimado del servicio que necesita.</h2>
        </div>
      )}
      <form onSubmit={handleSubmit} className="contact-validation-active">
        <div className="shipt-info">
          <h5>INFORMACIÓN DEL PEDIDO:</h5>
          <div className="row">
            <div className="form-group col-lg-6 col-md-6 col-12">
              <label htmlFor="weight" className="form-label">
                Peso (libras)
              </label>
              <input
                type="number"
                className="form-control"
                id="weight"
                name="weight"
                placeholder="Ej: 150"
                value={formData.weight}
                onChange={handleChange}
              />
              {errors.weight && <div className="error">{errors.weight}</div>}
            </div>

            <div className="form-group col-lg-6 col-md-6 col-12">
              <label htmlFor="volume" className="form-label">
                Volumen (Pies Cúbicos)
              </label>
              <input
                type="number"
                className="form-control"
                id="volume"
                name="volume"
                placeholder="Ej: 30"
                value={formData.volume}
                onChange={handleChange}
              />
              {errors.volume && <div className="error">{errors.volume}</div>}
            </div>

            <div className="form-group col-lg-6 col-md-6 col-12">
              <label htmlFor="sed" className="form-label">
                Cantidad de Declaraciones (SED)
              </label>
              <input
                type="number"
                className="form-control"
                id="sed"
                name="sed"
                placeholder="Ej: 2"
                value={formData.sed}
                onChange={handleChange}
              />
              {errors.sed && <div className="error">{errors.sed}</div>}
            </div>

            <div className="form-group col-lg-6 col-md-6 col-12">
              <label className="form-label d-block" htmlFor="hazmat">
                Material Peligroso
              </label>
              <div className="form-check">
                <input
                  type="checkbox"
                  className="form-check-input"
                  id="hazmat"
                  name="hazmat"
                  checked={formData.hazmat}
                  onChange={handleChange}
                  style={{ width: "22px", height: "22px" }}
                />
                <label className="form-check-label ms-2" htmlFor="hazmat">
                  Sí, contiene material peligroso
                </label>
              </div>
              <small className="form-text text-muted">
                Marca esta opción solo si tu envío contiene materiales
                peligrosos como químicos, baterías de litio, aerosoles, etc.
              </small>
            </div>

            <div className="form-group col-lg-6 col-md-6 col-12">
              <label htmlFor="freightType" className="form-label">
                Tipo de Envío
              </label>
              <select
                id="freightType"
                name="freightType"
                className="form-control"
                value={formData.freightType}
                onChange={handleChange}
              >
                <option disabled value="">
                  Seleccione una opción
                </option>
                <option value="air">Transporte Aéreo</option>
                <option value="ocean">Transporte Marítimo</option>
              </select>
              {errors.freightType && (
                <div className="error">{errors.freightType}</div>
              )}
            </div>
          </div>
        </div>
        <div className="submit-area">
          <button type="submit" className="theme-btn">
            Cotizar{" "}
            <i>
              <img src={Icon} alt="" />
            </i>
          </button>
          <div id="c-loader">
            <i className="ti-reload"></i>
          </div>
        </div>
        <div className="clearfix error-handling-messages">
          {submitStatus === "success" && <div id="c-success">Thank you</div>}
          {submitStatus === "error" && (
            <div id="c-error">
              Error occurred while sending email. Please try again later.
            </div>
          )}
        </div>
      </form>
      {quoteDetails && (
        <div className="quote-table mt-4">
          <h5>DETALLES</h5>
          <table className="table table-bordered">
            <thead>
              <tr>
                <th>Concepto</th>
                <th>Monto (USD)</th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(quoteDetails).map(([key, value]) => (
                <tr key={key}>
                  <td>{formatLabel(key)}</td>
                  <td>${value.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr>
                <td>
                  <strong>Total</strong>
                </td>
                <td>
                  <strong>${calculateTotal(quoteDetails).toFixed(2)}</strong>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      )}
    </div>
  );
};

export default CalculationForm;
