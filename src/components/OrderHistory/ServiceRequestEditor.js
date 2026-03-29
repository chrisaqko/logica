
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocument, updateDocumentById, setDocumentWithAutoID } from '../../firebase/firestore'; 
import '../OrderHistory/OrderHistory.css';
import emailjs from 'emailjs-com';

const ServiceRequestEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [note, setNote] = useState('');
  const [loading, setLoading] = useState(true);



  const [showConfirm, setShowConfirm] = useState(false);
  const [estadoPendiente, setEstadoPendiente] = useState('');

  useEffect(() => {
    const loadOrder = async () => {
      const result = await getDocument('Solicitudservicio', id);
      if (result.success) {
        setOrder(result.data);
        setNote(result.data.nota || '');
      } else {
        alert('No se encontró la solicitud');
        navigate('/admin/solicitudes ');
      }
      setLoading(false);
    };
    loadOrder();
  }, [id, navigate]);


  const solicitarConfirmacion = (estado) => {
    if (!note.trim()) {
      alert("Debe agregar una nota para continuar.");
      return;
    }
    setEstadoPendiente(estado);
    setShowConfirm(true);
  };


  const confirmarCambio = async () => {
    setShowConfirm(false);

    try {
      await updateDocumentById('Solicitudservicio', id, { estado: estadoPendiente, nota: note.trim() });

      if (estadoPendiente === "Completado") {
        const datosAGuardar = {
          consignatario: order.consignatario || "",
          correoEmpresa: order.correoEmpresa || "sin correo",
          nombreEmpresa: order.nombreEmpresa || "Empresa desconocida",
          fecha: new Date().toISOString(),
          trackingId: order.trackingId || "",
          estado: "Requiere atencion"
        };
        await setDocumentWithAutoID("Pedidos", datosAGuardar);
      }

      const templateParams = {
        to_email: order.correoEmpresa,
        company_name: order.nombreEmpresa,
        tracking_id: order.trackingId,
        status: estadoPendiente,
        admin_note: note.trim(),
      };
      await emailjs.send(
        'service_pjt8xvu',
        'template_upkpz4i',
        templateParams,
        '9LGAqbrguK6NMdsYI'
      );

      alert("Solicitud actualizada y correo enviado");
      navigate('/admin/solicitudes');

      

    } catch (err) {
      alert("Error actualizando la solicitud o enviando el correo");
      console.error(err);
    }
  };

  if (loading) return <p>Cargando la solicitud..</p>;

  return (
    <section className="order-history section-padding">
      <div className="container">
        <h2 className="section-title">Administrar Solicitud</h2>

        <div className="filtro-contenedor">
          <p><strong>Empresa:</strong> {order.nombreEmpresa}</p>
          <p><strong>Estado actual:</strong> {order.estado}</p>
          <p><strong>Correo:</strong> {order.correoEmpresa}</p>
          <p><strong>Tracking ID:</strong> {order.trackingId}</p>
          <textarea
            rows={4}
            placeholder="Agregar una nota de motivo..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
            style={{
              width: '100%',
              marginTop: '15px',
              padding: '10px',
              borderRadius: '6px',
              border: '1px solid #ccc',
              resize: 'vertical'
            }}
          />
            <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button type="button" className="administrar-btn" onClick={() => solicitarConfirmacion('Completado')}>Aceptar</button>
            <button type="button" className="administrar-btn" onClick={() => solicitarConfirmacion('Cancelado')}>Rechazar</button>
            <button type="button" className="administrar-btn" onClick={() => solicitarConfirmacion('Pendiente')}>Pendiente</button>
            <button type="button" className="administrar-btn" onClick={() => navigate('/admin/solicitudes')}>Volver</button>
              </div>
        </div>
      </div>


      {/* ===== MODAL ===== */}
      {showConfirm && (
        <div className="modal-confirm">
          <div className="modal-content">
            <p>
              ¿Confirmar cambio de estado a
              <strong> "{estadoPendiente}"</strong>?
            </p>
            <button onClick={confirmarCambio}>Sí</button>
            <button onClick={() => setShowConfirm(false)}>No</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceRequestEditor;
