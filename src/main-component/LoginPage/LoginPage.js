import React, { createContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { doSignInWithEmailAndPassword } from "../../firebase/auth";
import { auth, firestore } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";
import logo from "../../images/logo_logica01.svg";

import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from "mdb-react-ui-kit";

const AuthContext = createContext();

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await doSignInWithEmailAndPassword(email, password);
      const user = auth.currentUser;
      const docRef = doc(firestore, "Usuarios", user.uid);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const userData = docSnap.data();
        if (userData.rol === "admin") {
          navigate("/admin");
        } else {
          navigate("/");
        }
      } else {
        setError("No se encontró el perfil del usuario.");
      }
    } catch (err) {
      setError(
        "Credenciales incorrectas. Por favor, verifica tu correo y contraseña."
      );
      console.error("Error al iniciar sesión:", err.message);
    }
  };

  return (
    <MDBContainer className="my-5">
      <MDBCard>
        <MDBRow className="g-0">
          <MDBCol md="6">
            <MDBCardImage
              src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/img1.webp"
              alt="login form"
              className="rounded-start w-100"
            />
          </MDBCol>

          <MDBCol md="6">
            <MDBCardBody className="d-flex flex-column">
              <div className="d-flex justify-content-center align-items-center mt-2 mb-4">
                <img
                  src={logo}
                  alt="Lógica Transport"
                  style={{ maxHeight: "130px" }}
                />
              </div>

              <h5
                className="fw-normal my-4 pb-3"
                style={{ letterSpacing: "1px" }}
              >
                Iniciar sesión en tu cuenta
              </h5>

              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <MDBInput
                wrapperClass="mb-4"
                label="Correo electrónico"
                type="email"
                size="lg"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
              <MDBInput
                wrapperClass="mb-4"
                label="Contraseña"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              />

              <MDBBtn
                className="mb-4 px-5"
                color="dark"
                size="lg"
                onClick={onSubmit}
              >
                Iniciar Sesión
              </MDBBtn>

              <Link className="small text-muted" to="/reset-password">
                ¿Olvidaste tu contraseña?
              </Link>
              <p className="mb-5 pb-lg-2" style={{ color: "#393f81" }}>
                ¿No tienes cuenta?{" "}
                <Link to="/register" style={{ color: "#393f81" }}>
                  Regístrate aquí
                </Link>
              </p>

              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Términos de uso
                </a>
                <a href="#!" className="small text-muted">
                  Política de privacidad
                </a>
              </div>
            </MDBCardBody>
          </MDBCol>
        </MDBRow>
      </MDBCard>
    </MDBContainer>
  );
};

export default LoginPage;
