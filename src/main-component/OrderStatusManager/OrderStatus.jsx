import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../../firebase/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import "../../components/OrderHistory/OrderHistory.css";
import { useNavigate } from "react-router-dom";

const estadoProgreso = {
  "en camino a bodega": 51,
  "en bodega": 68,
  preparación: 85,
  "en vuelo/naviera": 17,
  aduanas: 32,
  "listo para retirar": 100,
  "en camino a ser entregado": 100,
};

const progresoEstilos = {
  "en camino a bodega": {
    background:
      "linear-gradient(135deg, rgba(186,191,200,0.4), rgba(186,191,200,0.85))",
    boxShadow: "0 2px 8px rgba(186,191,200,0.6)",
  },
  "en bodega": {
    background:
      "linear-gradient(135deg, rgba(132,155,184,0.4), rgba(132,155,184,0.85))",
    boxShadow: "0 2px 8px rgba(132,155,184,0.6)",
  },
  preparación: {
    background:
      "linear-gradient(135deg, rgba(91,117,147,0.4), rgba(91,117,147,0.85))",
    boxShadow: "0 2px 8px rgba(91,117,147,0.6)",
  },
  "en vuelo/naviera": {
    background:
      "linear-gradient(135deg, rgba(73,93,112,0.4), rgba(73,93,112,0.85))",
    boxShadow: "0 2px 8px rgba(73,93,112,0.6)",
  },
  aduanas: {
    background:
      "linear-gradient(135deg, rgba(32,51,62,0.4), rgba(32,51,62,0.85))",
    boxShadow: "0 2px 8px rgba(32,51,62,0.6)",
  },
  "listo para retirar": {
    background:
      "linear-gradient(135deg, rgba(199,86,80,0.4), rgba(199,86,80,0.85))",
    boxShadow: "0 2px 8px rgba(199,86,80,0.6)",
  },
  "en camino a ser entregado": {
    background:
      "linear-gradient(135deg, rgba(100,113,104,0.4), rgba(100,113,104,0.85))",
    boxShadow: "0 2px 8px rgba(100,113,104,0.6)",
  },
};

function OrderStatus() {
  const [user, loading] = useAuthState(auth);
  const [pedidos, setPedidos] = useState([]);
  const [filteredPedidos, setFilteredPedidos] = useState([]);
  const [statusFilter, setStatusFilter] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPedidos = async () => {
      if (loading || !user) return;

      try {
        const pedidosQuery = query(
          collection(firestore, "Pedidos"),
          where("correoEmpresa", "==", user.email)
        );
        const querySnapshot = await getDocs(pedidosQuery);
        const pedidosData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setPedidos(pedidosData);
        setFilteredPedidos(pedidosData);
      } catch (err) {
        console.error("Error al obtener pedidos:", err);
      }
    };

    fetchPedidos();
  }, [user, loading]);

  useEffect(() => {
    let filtered = [...pedidos];

    if (statusFilter) {
      filtered = filtered.filter(
        (p) => p.estado?.toLowerCase() === statusFilter.toLowerCase()
      );
    }

    if (startDate) {
      filtered = filtered.filter(
        (p) => p.fechaCreacion?.toDate() >= new Date(startDate)
      );
    }

    if (endDate) {
      filtered = filtered.filter(
        (p) => p.fechaCreacion?.toDate() <= new Date(endDate)
      );
    }

    setFilteredPedidos(filtered);
  }, [statusFilter, startDate, endDate, pedidos]);

  return (
    <section className="order-history section-padding">
      <div className="container">
        <h2 className="section-title">Historial de Pedidos</h2>

        {pedidos.length === 0 ? (
          <p className="text-muted">No hay pedidos registrados.</p>
        ) : (
          <>
            {/* Filtros */}
            <div className="filtro-contenedor d-flex flex-wrap gap-3">
              <label className="filtro-label">
                Estado:
                <select
                  className="filtro-select"
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                >
                  <option value="">Todos</option>
                  <option value="Listo para retirar pagado">
                    Listo para retirar pagado
                  </option>
                  <option value="en camino a bodega">en camino a bodega</option>
                  <option value="en bodega">en bodega</option>
                  <option value="preparación">preparación</option>
                  <option value="en vuelo/naviera">en vuelo/naviera</option>
                  <option value="aduanas">aduanas</option>
                  <option value="listo para retirar">listo para retirar</option>
                  <option value="en camino a ser entregado">
                    en camino a ser entregado
                  </option>
                </select>
              </label>

              <label className="filtro-label">
                Desde:
                <input
                  type="date"
                  className="filtro-input"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>

              <label className="filtro-label">
                Hasta:
                <input
                  type="date"
                  className="filtro-input"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>

            {/* Tarjetas de pedidos con barra de progreso */}
            {filteredPedidos.length === 0 ? (
              <p className="text-muted mt-4">
                No hay pedidos para mostrar con esos filtros.
              </p>
            ) : (
              <div className="order-cards mt-4">
                {filteredPedidos.map((pedido) => {
                  const progreso =
                    estadoProgreso[pedido.estado?.toLowerCase()] || 0;
                  const estadoKey = pedido.estado?.toLowerCase() || "";
                  const estiloProgreso = progresoEstilos[estadoKey] || {
                    background: "#3498db",
                    boxShadow: "0 2px 6px rgba(52,152,219,0.6)",
                  };

                  return (
                    <div className="order-card" key={pedido.id}>
                      <div className="order-header">
                        <h3>{pedido.numeroCarga}</h3>
                        <span
                          className={`status ${pedido.estado
                            ?.toLowerCase()
                            .replace(/\s/g, "-")
                            .replace(/\//g, "-")}`}
                        >
                          {pedido.estado}
                        </span>
                      </div>

                      <div className="order-details">
                        <div className="info-group">
                          <strong>Tracking ID:</strong> {pedido.trackingId}
                        </div>
                        <div className="info-group">
                          <strong>Consignatario:</strong> {pedido.consignatario}
                        </div>
                        <div className="info-group">
                          <strong>Empresa:</strong> {pedido.nombreEmpresa}
                        </div>
                        <div className="info-group">
                          <strong>Correo Empresa:</strong>{" "}
                          {pedido.correoEmpresa}
                        </div>
                        <div className="info-group">
                          <strong>Fecha:</strong>{" "}
                          {new Date(pedido.fecha).toLocaleDateString("es-CR", {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          })}
                        </div>
                        <div className="info-group">
                          <strong>Dimensiones:</strong> {pedido.largo} m x{" "}
                          {pedido.ancho} m x {pedido.altura} m
                        </div>
                        <div className="info-group">
                          <strong>Peso:</strong> {pedido.peso} kg
                        </div>
                        <div className="info-group">
                          <strong>Volumen:</strong> {pedido.volumen} m³
                        </div>
                        <div className="info-group">
                          <strong>Hazmat:</strong> {pedido.hazmat ? "Sí" : "No"}
                        </div>
                        <div className="info-group">
                          <strong>Nota:</strong> {pedido.nota}
                        </div>
                      </div>

                      <div
                        className="progress-bar-container"
                        role="progressbar"
                        aria-valuenow={progreso}
                        aria-valuemin="0"
                        aria-valuemax="100"
                      >
                        <div
                          className="progress-bar"
                          style={{
                            width: `${progreso}%`,
                            background: estiloProgreso.background,
                            boxShadow: estiloProgreso.boxShadow,
                            borderRadius: "12px 0 0 12px",
                            color: "white",
                            fontWeight: "bold",
                            paddingLeft: "8px",
                          }}
                        >
                          {progreso}%
                        </div>
                      </div>

                      {pedido.estado?.toLowerCase() ===
                        "listo para retirar" && (
                        <button
                          className="pagar-btn"
                          onClick={() => navigate(`/pagar/${pedido.id}`)}
                          style={{
                            marginTop: "12px",
                            backgroundColor: "#4CAF50",
                            color: "white",
                            padding: "8px 16px",
                            border: "none",
                            borderRadius: "4px",
                            cursor: "pointer",
                          }}
                        >
                          Pagar
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}

export default OrderStatus;
