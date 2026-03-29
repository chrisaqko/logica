import React, { useEffect, useState } from 'react';
import { collection, getDocs, getDoc } from "firebase/firestore"; 
import { firestore } from "../../firebase/firebase"; 
import '../OrderHistory/OrderHistory.css';
import { useNavigate } from "react-router-dom";

const OrderControl = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [orderBy, setOrderBy] = useState('fecha');
  const [sortOrder, setSortOrder] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const navigate = useNavigate();

  const fetchPedidosWithSolicitud = async () => {
    try {
      const collectionRef = collection(firestore, 'Pedidos');
      const snapshot = await getDocs(collectionRef);

      const pedidosConSolicitud = await Promise.all(
        snapshot.docs.map(async (docSnap) => {
          const pedidoData = docSnap.data();


          let solicitudData = {};
          if (pedidoData.solicitudServicioRef) {
            try {
              const solicitudSnap = await getDoc(pedidoData.solicitudServicioRef);
              if (solicitudSnap.exists()) {
                solicitudData = solicitudSnap.data();
              }
            } catch (error) {
              console.error("Error al obtener solicitud de servicio:", error);
            }
          }

          return {
            id: docSnap.id,
            ...pedidoData,
            solicitudServicio: solicitudData
          };
        })
      );

      setOrders(pedidosConSolicitud);
    } catch (error) {
      console.error("Error fetching pedidos: ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPedidosWithSolicitud();
  }, []);

  useEffect(() => {
    let filtered = [...orders];

    if (statusFilter) {
      filtered = filtered.filter(order =>
        order.estado?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (startDate) {
      filtered = filtered.filter(order => new Date(order.fecha) >= new Date(startDate));
    }

    if (endDate) {
      filtered = filtered.filter(order => new Date(order.fecha) <= new Date(endDate));
    }

    filtered.sort((a, b) => {
      let aValue, bValue;

      switch (orderBy) {
        case 'fecha':
          aValue = new Date(a.fecha);
          bValue = new Date(b.fecha);
          break;
        case 'estado':
          aValue = a.estado?.toLowerCase();
          bValue = b.estado?.toLowerCase();
          break;
        default:
          return 0;
      }

      if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
      if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });

    setFilteredOrders(filtered);
  }, [orders, statusFilter, startDate, endDate, orderBy, sortOrder]);

  return (
    <section className="order-history section-padding">
      <div className="container">
        <h2 className="section-title">Historial de Pedidos</h2>

        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <>
            <div className="filtro-contenedor">
              <label className="filtro-label">
                Ordenar por: 
                <select
                  className="filtro-select"
                  value={orderBy}
                  onChange={(e) => setOrderBy(e.target.value)}
                >
                  <option value="fecha">Fecha</option>
                  <option value="estado">Estado</option>
                </select>
              </label>

              {orderBy === 'fecha' && (
                <label className="filtro-label">
                  Orden:
                  <select
                    className="filtro-select"
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                  >
                    <option value="asc">Ascendente</option>
                    <option value="desc">Descendente</option>
                  </select>
                </label>
              )}

              {orderBy === 'estado' && (
                <label className="filtro-label">
                  Estado:
                  <select
                    className="filtro-select"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                  >
                    <option value="">Todos</option>
                    <option value="en camino a bodega">Camino a bodega</option>
                    <option value="en bodega">En bodega</option>
                    <option value="preparacion">Camino a Aerolinea/Puerto</option>
                    <option value="en vuelo/naviera">Viajando</option>
                    <option value="aduanas">Aduanas</option>
                    <option value="listo para retirar">Listo para entrega</option>
                    <option value="listo para retirar pagado">Listo para entrega pagado</option>
                  </select>
                </label>
              )}
            </div>

            <div className="order-table">
              <table>
                <thead>
                  <tr>
                    <th>Fecha</th>
                    <th>Empresa</th>
                    <th>Consignatario</th>
                    <th>Volumen</th>
                    <th>Peso</th>
                    <th>Estado</th>
                    <th>Administrar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{order.fecha ? new Date(order.fecha).toISOString().split('T')[0] : ''}</td>
                      <td>{order.nombreEmpresa}</td>
                      <td>{order.consignatario}</td>
                      <td>{order.volumen}</td>
                      <td>{order.peso}</td>
                      <td>
                        <span className={`status ${order.estado
                            ?.toLowerCase()
                            .replace(/\s/g, "-")
                            .replace(/\//g, "-")}`}>
                          {order.estado}
                        </span>
                      </td>
                      <td>
                        <button
                          className="administrar-btn"
                          onClick={() => navigate(`/admin/orden/${order.id}`)}
                        >
                          Administrar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </section>
  );
};

export default OrderControl;