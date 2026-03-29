import React, { useEffect, useState } from 'react';
import { collection, getDocs } from "firebase/firestore"; 
import { firestore } from "../../firebase/firebase"; 
import './OrderHistory.css';
import { useNavigate } from "react-router-dom";

const ServiceRequestHistory = () => {
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [orderBy, setOrderBy] = useState('fechaDesc');
  const [sortOrder, setSortOrder] = useState('desc');
  const [statusFilter, setStatusFilter] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [clientFilter, setClientFilter] = useState('');
  const navigate = useNavigate();


  const fetchOrdersWithId = async () => {
    try {
      const collectionRef = collection(firestore, 'Solicitudservicio');
      const snapshot = await getDocs(collectionRef);
      const ordersWithId = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setOrders(ordersWithId);
    } catch (error) {
      console.error("Error fetching orders with id: ", error);
    } finally {
      setLoading(false);
    }
  };

   useEffect(() => {
    fetchOrdersWithId();  
  }, []);


   useEffect(() => {
    let filtered = [...orders];

      if (clientFilter) {
    filtered = filtered.filter(order =>
      order.nombreEmpresa?.toLowerCase().includes(clientFilter.toLowerCase())
    );
  }

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
      case 'cliente':
        aValue = a.nombreEmpresa?.toLowerCase();
        bValue = b.nombreEmpresa?.toLowerCase();
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
}, [orders, clientFilter, statusFilter, startDate, endDate, orderBy, sortOrder]);

 return (
    <section className="order-history section-padding">
      <div className="container">
        <h2 className="section-title">Historial de Solicitudes</h2>

        {loading ? (
          <p>Cargando datos...</p>
        ) : (
          <>
            <div className="filtro-contenedor">

                <label className="filtro-label">
                  Ordenar por: 
                    <select className="filtro-select"
                    value={orderBy}
                    onChange={(e) => setOrderBy(e.target.value)}
                  >
                    <option value="fecha">Fecha</option>
                    <option value="cliente">Cliente</option>
                    <option value="estado">Estado</option>
                  </select>
                </label>

                {orderBy === 'fecha' && (
                  <label label className="filtro-label">
                    Fecha: 
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

                {orderBy === 'cliente' && (
                  <label label className="filtro-label">
                    Cliente: 
                    <input
                      className="filtro-input"
                      type="text"
                      value={clientFilter}
                      onChange={(e) => setClientFilter(e.target.value)}
                    />
                  </label>
                )}

                {orderBy === 'estado' && (
                  <label label className="filtro-label">
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
                    <th>Correo</th>
                    <th>Tracking ID</th>
                    <th>Estado</th>
                    <th>Administrar</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredOrders.map((order, index) => (
                    <tr key={index}>
                      <td>{new Date(order.fecha).toISOString().split('T')[0]}</td>
                      <td>{order.nombreEmpresa}</td>
                      <td>{order.consignatario}</td>
                      <td>{order.correoEmpresa}</td>
                      <td>{order.trackingId}</td>
                      {/**<td className={`status ${order.estado.toLowerCase()}`}>
                          {order.estado}
                      </td> */}
                      <td>
                        <span className={`status ${order.estado.toLowerCase()}`}>
                          {order.estado}</span>
                      </td>
                      <td>
                        <button
                          className="administrar-btn"
                          onClick={() => navigate(`/admin/solicitud/${order.id}`)}>
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

export default ServiceRequestHistory;