import React from "react";
import { Link } from "react-router-dom";

import logo from "../../images/logo_logica01.svg";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import LogoutIcon from "@mui/icons-material/Logout";

const HeaderTop = () => {
  const { userLoggedIn, currentUser, loadingUserData, userData } = useAuth();
  console.log("🔍 currentUser:", currentUser);
  console.log("🔍 userLoggedIn:", userLoggedIn);
  console.log("🔍 userData:", userData);
  console.log("🔍 loadingUserData:", loadingUserData);

  if (loadingUserData) return null;
  console.log("HeaderTop montado");
  return (
    <div className="topbar">
      <div className="container-fluid px-lg-4">
        <div className="row align-items-center">
          <div className="col-lg-2 col-12 d-lg-block d-none">
            <Link className="navbar-brand" to="/">
              <img src={logo} alt="" />
            </Link>
          </div>
          <div className="col-lg-9 col-12">
            <div className="contact-info-wrap d-flex justify-content-between align-items-center">
              <div className="contact-info">
                <div className="icon">
                  <i className="fi flaticon-phone-call"></i>
                </div>
                <div className="info-text">
                  <span>Llámenos al:</span>
                  <p>(+506) 2253 2834</p>
                </div>
              </div>
              <div className="contact-info">
                <div className="icon">
                  <i className="fi flaticon-email"></i>
                </div>
                <div className="info-text">
                  <span>Escríbanos al:</span>
                  <p>lruiz@logicatransport.com</p>
                </div>
              </div>
              <div className="contact-info">
                <div className="icon">
                  <i className="fi flaticon-clock"></i>
                </div>
                <div className="info-text">
                  <span>Horario:</span>
                  <p>(L-V) 08:00 am to 05:00 pm</p>
                </div>
              </div>
              <div className="contact-info">
                <div className="icon">
                  <i className="fi flaticon-user"></i>
                </div>
                <div
                  className="info-text"
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  {userLoggedIn && currentUser && userData ? (
                    <>
                      <div className="flex flex-col leading-tight">
                        <Link to="/profile">{userData.usuario}</Link>
                        <p className="text-sm text-gray-600 m-0">Perfil</p>
                      </div>
                      <button
                        onClick={doSignOut}
                        className="flex items-center justify-center p-2 text-white rounded"
                        style={{ backgroundColor: "#177265" }}
                        onMouseOver={(e) =>
                          (e.currentTarget.style.backgroundColor = "#125d51")
                        }
                        onMouseOut={(e) =>
                          (e.currentTarget.style.backgroundColor = "#177265")
                        }
                      >
                        <LogoutIcon fontSize="small" />
                      </button>
                    </>
                  ) : (
                    <>
                      <Link to="/login">Iniciar Sesión</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
