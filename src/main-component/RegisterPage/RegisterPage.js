import React, { useState } from "react";
import logo from "../../images/logo_logica01.svg";
import { setDocument } from "../../firebase/firestore";
import { useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
} from "mdb-react-ui-kit";

function App() {
  const [formData, setFormData] = useState({
    email: "",
    empresa: "",
    usuario: "",
    telefono: "",
    contraseña: "",
    confirmarContraseña: "",
  });

  const [mensaje, setMensaje] = useState("");

  const handleChange = (e) => {
    const fieldName = e.target.name;
    const value = e.target.value;

    setFormData({ ...formData, [fieldName]: value });

    validateField(fieldName, value);
  };

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      email,
      empresa,
      usuario,
      telefono,
      contraseña,
      confirmarContraseña,
    } = formData;

    if (
      !email ||
      !empresa ||
      !usuario ||
      !telefono ||
      !contraseña ||
      !confirmarContraseña
    ) {
      setMensaje("Todos los campos son obligatorios.");
      return;
    }

    if (contraseña !== confirmarContraseña) {
      setMensaje("Las contraseñas no coinciden.");
      return;
    }

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        contraseña
      );
      const uid = userCredential.user.uid;
      console.log("Prueba " + uid);

      await setDocument("Usuarios", uid, {
        email,
        empresa,
        usuario,
        telefono,
      });

      navigate("/home");
      console.log("Usuario registrado con exito");
    } catch (error) {
      console.error("Error al registrar:", error);
    }
  };

  const validateField = (name, value) => {
    let err = "";

    switch (name) {
      case "email":
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
          err = "Ingrese un correo válido.";
        break;

      case "telefono":
        if (!/^[0-9+]*$/.test(value))
          err = "Solo se permiten números y el símbolo +.";
        break;

      case "contraseña":
        if (!/^[\s\S]{12,18}$/.test(value))
          err = "La contraseña debe tener entre 12 y 18 caracteres. Puede incluir espacios y caracteres especiales.";
        break;

      case "confirmarContraseña":
        if (value !== formData.contraseña)
          err = "Las contraseñas no coinciden.";
        break;

      default:
        break;
    }

    setErrors((prev) => ({ ...prev, [name]: err }));
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
                Cree una cuenta para iniciar sesión
              </h5>
              <form onSubmit={handleSubmit}>
                <MDBInput
                  wrapperClass="mb-4"
                  label="Correo electrónico"
                  name="email"
                  type="email"
                  size="lg"
                  value={formData.email}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "email", value: e.target.value },
                    })
                  }
                />
                {errors.email && (
                  <p className="text-danger small mb-3">{errors.email}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Nombre de la empresa"
                  name="empresa"
                  type="text"
                  size="lg"
                  value={formData.empresa}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "empresa", value: e.target.value },
                    })
                  }
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Nombre del usuario"
                  name="usuario"
                  type="text"
                  size="lg"
                  value={formData.usuario}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "usuario", value: e.target.value },
                    })
                  }
                />
                <MDBInput
                  wrapperClass="mb-4"
                  label="Teléfono"
                  name="telefono"
                  type="phone"
                  size="lg"
                  value={formData.telefono}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "telefono", value: e.target.value },
                    })
                  }
                />
                {errors.telefono && (
                  <p className="text-danger small mb-3">{errors.telefono}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Contraseña"
                  name="contraseña"
                  type="password"
                  size="lg"
                  value={formData.contraseña}
                  onChange={(e) =>
                    handleChange({
                      target: { name: "contraseña", value: e.target.value },
                    })
                  }
                />
                {errors.contraseña && (
                  <p className="text-danger small mb-3">{errors.contraseña}</p>
                )}
                <MDBInput
                  wrapperClass="mb-4"
                  label="Confirmar contraseña"
                  name="confirmarContraseña"
                  type="password"
                  size="lg"
                  value={formData.confirmarContraseña}
                  onChange={(e) =>
                    handleChange({
                      target: {
                        name: "confirmarContraseña",
                        value: e.target.value,
                      },
                    })
                  }
                />
                {errors.confirmarContraseña && (
                  <p className="text-danger small mb-3">
                    {errors.confirmarContraseña}
                  </p>
                )}
                <MDBBtn
                  type="submit"
                  className="mb-4 px-5"
                  color="dark"
                  size="lg"
                >
                  Registrarse
                </MDBBtn>
              </form>
              <div className="d-flex flex-row justify-content-start">
                <a href="#!" className="small text-muted me-1">
                  Términos de uso.
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
}

export default App;
