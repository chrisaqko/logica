import React, { useState, useEffect, useMemo } from "react";
import { getCollection } from "../../firebase/firestore";
import "./AdminReports.css";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";

const AdminReports = () => {
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState([]);
  const COLORS = ["#4B7BE5", "#FF6B6B", "#FFA726", "#66BB6A", "#AB47BC"];

  useEffect(() => {
    const fetchOrders = async () => {
      const response = await getCollection("Pedidos");

      if (response.success) {
        setOrders(response.data);
      } else {
        console.error("Error al cargar pedidos:", response.errorMessage);
      }

      setLoading(false);
    };

    fetchOrders();
  }, []);

  const pedidosPorMes = useMemo(() => {
    const conteo = {};
    orders.forEach((order) => {
      if (order.fecha) {
        const fecha = new Date(order.fecha);
        const clave = `${fecha.getMonth() + 1}/${fecha.getFullYear()}`; // mes/año
        conteo[clave] = (conteo[clave] || 0) + 1;
      }
    });
    return conteo;
  }, [orders]);

  const pedidosPorMesData = useMemo(() => {
    return Object.entries(pedidosPorMes)
      .map(([mes, cantidad]) => {
        const [month, year] = mes.split("/").map(Number);
        return {
          mes,
          cantidad,
          fechaOrden: new Date(year, month - 1, 1),
        };
      })
      .sort((a, b) => a.fechaOrden - b.fechaOrden)
      .map(({ fechaOrden, ...rest }) => rest);
  }, [pedidosPorMes]);

  const topClientesPorPedidos = useMemo(() => {
    const conteo = {};
    orders.forEach((order) => {
      if (order.usuario) {
        conteo[order.usuario] = (conteo[order.usuario] || 0) + 1;
      }
    });

    return Object.entries(conteo)
      .map(([usuario, cantidad]) => ({ usuario, cantidad }))
      .sort((a, b) => b.cantidad - a.cantidad)
      .slice(0, 5);
  }, [orders]);

  const pesosPorCliente = useMemo(() => {
    const pesos = {};
    orders.forEach((order) => {
      if (order.usuario && order.peso) {
        pesos[order.usuario] =
          (pesos[order.usuario] || 0) + parseFloat(order.peso);
      }
    });

    return Object.entries(pesos)
      .map(([usuario, peso]) => ({ usuario, peso }))
      .sort((a, b) => b.peso - a.peso)
      .slice(0, 5);
  }, [orders]);

  return (
    <section className="order-history section-padding">
      <div className="container">
        <h2 className="section-title">Reportería</h2>
        <div
          className="dashboard-cards"
          style={{
            display: "flex",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div className="card">
            <h3>Pedidos por Mes</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={pedidosPorMesData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="mes" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="cantidad" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3>Top Clientes por Pedidos</h3>
            <ResponsiveContainer width="100%" height={250}>
              <BarChart data={topClientesPorPedidos} layout="vertical">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="usuario" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="cantidad" fill={COLORS[0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h3>Distribución de Peso por Cliente (Top 5)</h3>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={pesosPorCliente}
                  dataKey="peso"
                  nameKey="usuario"
                  outerRadius={80}
                  label
                >
                  {pesosPorCliente.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminReports;
