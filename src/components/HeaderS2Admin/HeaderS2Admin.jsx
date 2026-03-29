import React, { useState } from "react";
import { Link } from "react-router-dom";
import MobileMenu from "../MobileMenu/MobileMenu";
import Logo from "../../images/logo_logica01.svg";

const HeaderS2Admin = (props) => {
  const [menuActive, setMenuState] = useState(false);

  const SubmitHandler = (e) => {
    e.preventDefault();
  };

  const ClickHandler = () => {
    window.scrollTo(10, 0);
  };

  return (
    <header id="header" className={"" + props.hclass}>
      <div className="wpo-site-header">
        <nav className="navigation navbar navbar-expand-lg navbar-light">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-1 col-md-3 col-3 d-lg-none dl-block">
                <MobileMenu />
              </div>
              <div className="col-lg-2 col-md-6 col-6 dl-block ps-lg-4 ps-3">
                <div className="navbar-header">
                  <Link
                    onClick={ClickHandler}
                    className="navbar-brand"
                    to="/admin"
                  >
                    <img
                      src={Logo}
                      alt="logo"
                      style={{ paddingLeft: "50px" }}
                    />
                  </Link>
                </div>
              </div>
              <div className="col col-lg-9">
                <div
                  id="navbar"
                  className="collapse navbar-collapse navigation-holder"
                >
                  <button className="menu-close">
                    <i className="ti-close"></i>
                  </button>
                  <ul className="nav navbar-nav mb-2 mb-lg-0">
                    <li className="menu-item-has-children">
                      <Link onClick={ClickHandler}>Inicio</Link>
                      <ul className="sub-menu">
                        <li>
                          <Link onClick={ClickHandler} to="/home">
                            Página de Inicio
                          </Link>
                        </li>
                            <li>
                              <Link onClick={ClickHandler} to="/admin">
                                Dashboard de Administración
                              </Link>
                            </li>
                      </ul>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/admin/variables">
                        Gestión de Tarifas
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/admin/ordenes">
                        Gestión de Ordenes
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/admin/solicitudes">
                        Gestión de Solicitudes
                      </Link>
                    </li>
                    <li>
                      <Link onClick={ClickHandler} to="/admin/reporteria">
                        Reportería
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default HeaderS2Admin;
