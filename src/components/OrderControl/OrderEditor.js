import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getDocument, updateDocumentById } from '../../firebase/firestore'; 
import '../OrderHistory/OrderHistory.css';
import emailjs from 'emailjs-com';

const ServiceRequestEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [order, setOrder] = useState(null);
  const [note, setNote] = useState('');
  const [peso, setPeso] = useState('');
  const [altura, setAltura] = useState('');
  const [ancho, setAncho] = useState('');
  const [largo, setLargo] = useState('');
  const [volumen, setVolumen] = useState(0);
  const [hazmat, setHazmat] = useState(false);
  const [loading, setLoading] = useState(true);

  // MODAL
  const [showModal, setShowModal] = useState(false);
  const [estadoPendiente, setEstadoPendiente] = useState('');

  useEffect(() => {
    const vol =
      (parseFloat(altura) || 0) *
      (parseFloat(ancho) || 0) *
      (parseFloat(largo) || 0);
    setVolumen(vol);
  }, [altura, ancho, largo]);

  useEffect(() => {
    const loadOrder = async () => {
      const result = await getDocument('Pedidos', id);
      if (result.success) {
        const data = result.data;
        setOrder(data);
        setNote(data.nota || '');
        setPeso(data.peso || '');
        setAltura(data.altura || '');
        setAncho(data.ancho || '');
        setLargo(data.largo || '');
        setHazmat(data.hazmat || false);

        const vol = (data.altura || 0) * (data.ancho || 0) * (data.largo || 0);
        setVolumen(vol);
      } else {
        alert('No se encontró el pedido.');
        navigate('/admin/ordenes');
      }
      setLoading(false);
    };
    loadOrder();
  }, [id, navigate]);

  const handleUpdate = async (estado) => {
    if (!note.trim()) {
      alert("Debe agregar una nota para continuar.");
      return;
    }

    try {
      await updateDocumentById('Pedidos', id, { 
        estado, 
        nota: note.trim(),
        peso,
        altura,
        ancho,
        largo,
        volumen,
        hazmat
      });

      const templateParams = {
        to_email: order.correoEmpresa,
        company_name: order.nombreEmpresa,
        tracking_id: order.trackingId,
        status: estado,
        admin_note: note.trim(),
      };

      if (estado === 'listo para retirar') {
        await emailjs.send(
          'service_pjt8xvu',
          'template_dy3ae17', 
          templateParams,
          '9LGAqbrguK6NMdsYI'
        );
      } else {
        await emailjs.send(
          'service_pjt8xvu',
          'template_upkpz4i', 
          templateParams,
          '9LGAqbrguK6NMdsYI'
        );
      }

      alert("Pedido actualizado y correo enviado");
      navigate('/admin/ordenes');
    } catch (err) {
      alert("Error actualizando el pedido o enviando el correo");
      console.error(err);
    }
  };

  const abrirModal = (estado) => {
    setEstadoPendiente(estado);
    setShowModal(true);
  };

  const cerrarModal = () => {
    setShowModal(false);
    setEstadoPendiente('');
  };

  const confirmarCambio = () => {
    handleUpdate(estadoPendiente);
    cerrarModal();
  };

  if (loading) return <p>Cargando pedido...</p>;

  return (
    <section className="order-history section-padding">
      <div className="container">
        <h2 className="section-title">Administrar Pedido</h2>

        <div className="filtro-contenedor">
          <p><strong>Empresa:</strong> {order.nombreEmpresa}</p>
          <p><strong>Estado actual:</strong> {order.estado}</p>
          <p><strong>Correo:</strong> {order.correoEmpresa}</p>
          <p><strong>Tracking ID:</strong> {order.trackingId}</p>

          {order.URLComprobantePago && (
            <div style={{ marginTop: '20px' }}>
              <p><strong>Comprobante de Pago:</strong></p>
              {order.URLComprobantePago.endsWith(".pdf") ? (
                <a href={order.URLComprobantePago} target="_blank" rel="noopener noreferrer">
                  Ver PDF del Comprobante
                </a>
              ) : (
                <img
                  src={order.URLComprobantePago}
                  alt="Comprobante de pago"
                  style={{ maxWidth: '100%', maxHeight: '400px', marginTop: '10px', border: '1px solid #ccc' }}
                />
              )}
            </div>
          )}

          <textarea
            rows={4}
            placeholder="Agregar una nota de motivo..."
            value={note}
            onChange={(e) => setNote(e.target.value)}
          />

          <div style={{ marginTop: '20px', display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
            <button className="administrar-btn" onClick={() => abrirModal('en camino a bodega')}>Camino a bodega</button>
            <button className="administrar-btn" onClick={() => abrirModal('en bodega')}>En bodega</button>
            <button className="administrar-btn" onClick={() => abrirModal('preparacion')}>Camino a Aerolinea/Puerto</button>
            <button className="administrar-btn" onClick={() => abrirModal('en vuelo/naviera')}>Viajando</button>
            <button className="administrar-btn" onClick={() => abrirModal('aduanas')}>Aduanas</button>
            <button className="administrar-btn" onClick={() => abrirModal('listo para retirar')}>Listo para entrega</button>
            <button className="administrar-btn" onClick={() => abrirModal('listo para retirar pagado')}>Listo para entrega pagado</button>
            <button className="administrar-btn" onClick={() => navigate('/admin/ordenes')}>Volver</button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal-confirm">
          <div className="modal-content">
            <h3>Confirmar cambio de estado</h3>
            <p>
              ¿Seguro que querés cambiar el estado a
              <strong> {estadoPendiente}</strong>?
            </p>
            <button onClick={confirmarCambio}>Sí, confirmar</button>
            <button onClick={cerrarModal}>Cancelar</button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ServiceRequestEditor;
