import React, { useState } from "react";
import { doPasswordReset } from "../../firebase/auth";
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBCardImage,
} from "mdb-react-ui-kit";
import { Link } from "react-router-dom";
import logo from "../../images/logo_logica01.svg"; 

const ResetPasswordPage = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleReset = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    try {
      await doPasswordReset(email);
      setMessage("Se ha enviado un correo para restablecer tu contraseña.");
    } catch (err) {
      console.error("Error enviando email de recuperación ", err.message);
      setError("Error al enviar correo, verifica que el email sea válido.");
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">

            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="reset password form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex justify-content-center align-items-center mt-2 mb-4">
                <img
                  src={logo}
                  alt="Lógica Transport"
                  style={{ maxHeight: "60px" }}
                />
              </div>

              <h4 className="fw-normal mb-4" style={{ letterSpacing: "1px" }}>
                Restablecer Contraseña
              </h4>

              <h4
                className="fw-normal mb-4"
                style={{ letterSpacing: "1px", fontSize: "0.9rem", color: "#888888" }}>
                   Correo electrónico
                </h4>
                            
              {message && (
                <div className="alert alert-success" role="alert">
                  {message}
                </div>
              )}
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <MDBInput
                type="email"
                size="lg"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
              />

              <MDBBtn color="dark" size="lg" onClick={handleReset}>
                Enviar enlace de recuperación
              </MDBBtn>

              <div className="mt-3">
                <Link to="/login">Volver al inicio de sesión</Link>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default ResetPasswordPage;