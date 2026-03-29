import React, { useState } from "react";
import moment from "moment-timezone";
import Datetime from "react-datetime";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Card, Form, Button, InputGroup } from '@themesberg/react-bootstrap';
import { updateDocument } from "../../firebase/firestore";
import { useAuth } from "../../contexts/authContext";


export const GeneralInfoForm = () => {
  const { currentUser } = useAuth();
  const [isEditable, setIsEditable] = useState(false);


  const [formData, setFormData] = useState({
    empresa: currentUser?.empresa || "",
    nombre: currentUser?.nombre || "",
    apellido: currentUser?.apellido || "",
    email: currentUser?.email || "",
    telefono: currentUser?.telefono || "",
    direccion: currentUser?.direccion || "",
    ciudad: currentUser?.ciudad||"",
    provincia: currentUser?.provincia ||"",
    zip: currentUser?.zip||""
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const collection = "Usuarios";
    const documentKey = currentUser.uid;

    const updateResults = await Promise.all(
      Object.entries(formData).map(([field, value]) =>
        updateDocument(collection, documentKey, field, value)
      )
    );

    const anyFailed = updateResults.some((r) => !r.success);
    if (!anyFailed) {
      alert("Datos actualizados correctamente en Firestore.");
      window.location.reload();
    } else {
      alert("Ocurrió un error al actualizar algunos datos.");
    }
  };

  return (
    <Card border="light" className="bg-white shadow-sm mb-4">
      <Card.Body>
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h5 className="mb-0">Información de usuario</h5>
          <Form.Check
            type="switch"
            id="toggle-edit"
            label={isEditable ? "Edición Activada" : "Edición Desactivada"}
            checked={isEditable}
            onChange={() => setIsEditable(!isEditable)}
          />
        </div>
        <Form onSubmit={handleSubmit}>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="empresa">
                <Form.Label>Empresa</Form.Label>
                <Form.Control
                  id="empresa"
                  disabled={!isEditable}
                  required
                  type="text"
                  value={formData.empresa}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control
                  id="nombre"
                  disabled={!isEditable}
                  required
                  type="text"
                  value={formData.nombre}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="apellido">
                <Form.Label>Apellido</Form.Label>
                <Form.Control
                  id="apellido"
                  disabled={!isEditable}
                  required
                  type="text"
                  value={formData.apellido}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col md={6} className="mb-3">
              <Form.Group id="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  id="email"
                  disabled={!isEditable}
                  required
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col md={6} className="mb-3">
              <Form.Group id="telefono">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  id="telefono"
                  disabled={!isEditable}
                  required
                  type="number"
                  value={formData.telefono}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>

          <h5 className="my-4">Dirección</h5>
          <Row>
            <Col sm={9} className="mb-3">
              <Form.Group id="direccion">
                <Form.Label>Dirección</Form.Label>
                <Form.Control
                  id="direccion"
                  disabled={!isEditable}
                  required
                  type="text"
                  value={formData.direccion}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={4} className="mb-3">
              <Form.Group id="ciudad">
                <Form.Label>Ciudad</Form.Label>
                <Form.Control
                  id="ciudad"
                  disabled={!isEditable}
                  required
                  type="text"
                  value={formData.ciudad}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
            <Col sm={4} className="mb-3">
              <Form.Group id="Provincia">
                <Form.Label>Provincia</Form.Label>
                <Form.Select
                  id="provincia"
                  disabled={!isEditable}
                  value={formData.provincia}
                  onChange={handleChange}
                >
                  <option value="">Seleccione un provincia</option>
                  <option value="SJ">San Jose</option>
                  <option value="CA">Cartago</option>
                  <option value="AL">Alajuela</option>
                  <option value="HE">Heredia</option>
                  <option value="PU">Puntarenas</option>
                  <option value="LI">Limon</option>
                  <option value="GU">Guanacaste</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col sm={4}>
              <Form.Group id="zip">
                <Form.Label>ZIP</Form.Label>
                <Form.Control
                  id="zip"
                  disabled={!isEditable}
                  required
                  type="text"
                  value={formData.zip}
                  onChange={handleChange}
                />
              </Form.Group>
            </Col>
          </Row>
          <div className="mt-3">
            <Button
              variant="primary"
              type="submit"
              style={{ backgroundColor: "#177265", borderColor: "#177265" }}
              disabled={!isEditable}
            >
              Guardar
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};