import React, { useState } from "react";
import { setDocumentWithAutoID } from "../../firebase/firestore";
import { useAuth } from "../../contexts/authContext";
import { toast } from "react-toastify";

const NotificacionServicioForm = () => {
  const { currentUser } = useAuth(); 
  const [formData, setFormData] = useState({
    consignatario: "",
    trackingId: "",
  });

  const handleChange = (campo, valor) => {
    setFormData((prev) => ({
      ...prev,
      [campo]: valor,
    }));
  };

  const handleGuardar = async () => {
    if (!formData.consignatario || !formData.trackingId) {
      toast.error("Por favor complete todos los campos.");
      return;
    }

    const datosAGuardar = {
      ...formData,
      correoEmpresa: currentUser?.email || "sin correo",
      nombreEmpresa: currentUser?.empresa || "Empresa desconocido",
      estado: "Pendiente",
      fecha: new Date().toISOString(),
    };

    const resultado = await setDocumentWithAutoID("Solicitudservicio", datosAGuardar);

    if (resultado.success) {
      toast.success("Notificación enviada con éxito.");
      setFormData({ consignatario: "", trackingId: "" });
    } else {
      toast.error("Error al enviar la notificación.");
    }
  };

  return (
    
    <section className="wpo-calculation-section-s3 section-padding">
      <div className="wpo-calculation-section-wrapper" style={{ paddingRight: 0 }}>
        <div className="col-md-12 col-12">
          <div className="wpo-contact-form-area">
            <div className="wpo-section-title text-center">
              <span>Servicio</span>
              <h2>Iniciar Servicio</h2>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleGuardar();
              }}
              className="contact-validation-active"
            >
              <div className="row">
                <div className="form-group col-lg-6 col-md-6 col-12">
                  <label>Consignatario</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.consignatario}
                    onChange={(e) => handleChange("consignatario", e.target.value)}
                    placeholder="Nombre del consignatario"
                    required
                  />
                </div>

                <div className="form-group col-lg-6 col-md-6 col-12">
                  <label>Tracking ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={formData.trackingId}
                    onChange={(e) => handleChange("trackingId", e.target.value)}
                    placeholder="Código de rastreo"
                    required
                  />
                </div>
              </div>

              <div className="submit-area mt-4 text-center">
                <button type="submit" className="theme-btn">
                  Enviar Solicitud
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default NotificacionServicioForm;
