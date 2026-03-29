import React, { useContext, useState, useEffect, createContext } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import { totalPrice } from "../../utils";
import { connect } from "react-redux";
import { removeFromCart } from "../../store/actions/action";
import { useAuth } from "../../contexts/authContext";
import { doSignOut } from "../../firebase/auth";
import { useNavigate } from "react-router-dom";
import Logo from "../../images/logo_logica01.svg";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../../firebase/firebase";
import { doc, getDoc } from "firebase/firestore";

const Header = (props) => {
  const [menuActive, setMenuState] = useState(false);
  const [cartActive, setcartState] = useState(false);
  const { currentUser, userData, loadingUserData } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await doSignOut();
    navigate("/login");
  };

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  const { carts } = props;
  if (loadingUserData) return null;

  return (
    <header id="header">
      <div className={"" + props.hclass}>
        <nav className="navigation navbar navbar-expand-lg navbar-light py-5">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-3 col-md-3 col-3">
                {/* Menu mobile SOLO móvil */}
                <div className="d-lg-none">
                  <MobileMenu />
                </div>
              </div>
              <div className="col-md-6 col-6 d-lg-none dl-block">
                <div className="navbar-header">
                  <Link
                    onClick={ClickHandler}
                    className="navbar-brand"
                    to="/home"
                  >
                    <img src={Logo} alt="" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-5 col-md-1 col-1">
                <div
                  id="navbar"
                  className="collapse navbar-collapse navigation-holder"
                >
                  <button className="menu-close">
                    <i className="ti-close"></i>
                  </button>
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    {!loadingUserData && currentUser && (
                      <li className="menu-item-has-children">
                        <Link onClick={ClickHandler}>Inicio</Link>
                        <ul className="sub-menu">
                          <li>
                            <Link onClick={ClickHandler} to="/home">
                              Página de Inicio
                            </Link>
                          </li>
                          {userData?.rol === "admin" && (
                            <li>
                              <Link onClick={ClickHandler} to="/admin">
                                Dashboard de Administración
                              </Link>
                            </li>
                          )}
                        </ul>
                      </li>
                    )}
                    <li>
                      <Link onClick={ClickHandler} to="/contact">
                        Nosotros
                      </Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link onClick={ClickHandler} to="#">
                        Servicios
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link
                            onClick={ClickHandler}
                            to="/service-single/Air-Transport"
                          >
                            Transporte Aéreo
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            to="/service-single/Ocean-Transport2"
                          >
                            Transporte Marítimo
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            to="/request-service"
                          >
                            Solicitar Servicio
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li className="menu-item-has-children">
                      <Link onClick={ClickHandler} to="/calculation">
                        Cotización
                      </Link>
                    </li>
                    <li className="menu-item-has-children">
                      <Link onClick={ClickHandler} to="/#">
                        Pedidos
                      </Link>
                      <ul className="sub-menu">
                        <li>
                          <Link onClick={ClickHandler} to="/ordenes">
                            Solicitudes
                          </Link>
                        </li>
                        <li>
                          <Link
                            onClick={ClickHandler}
                            to="/tracking-latamcargo"
                          >
                            Rastrear Pedido - Envío Marítimo
                          </Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/tracking-avianca">
                            Rastrear Pedido - Envío Aéreo
                          </Link>
                        </li>
                        <li>
                          <Link onClick={ClickHandler} to="/order-status">
                            Estado de Pedidos
                          </Link>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/contact">
                        Contacto
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg2 col-md-3 col-2">
                <div className="header-right">
                  <div className="header-search-form-wrapper">
                    <div className="cart-search-contact">
                      <button
                        onClick={() => setMenuState(!menuActive)}
                        className="search-toggle-btn"
                      >
                        <i
                          className={`fi ${
                            menuActive ? "ti-close" : "flaticon-search"
                          }`}
                        ></i>
                      </button>
                    </div>
                  </div>
                  <div className="close-form">
                    <Link
                      onClick={ClickHandler}
                      className="theme-btn"
                      to="/order-status"
                    >
                      Rastrear Pedido
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};
const mapStateToProps = (state) => {
  return {
    carts: state.cartList.cart,
  };
};

export default connect(mapStateToProps, { removeFromCart })(Header);
