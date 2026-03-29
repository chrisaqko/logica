import React, { Fragment, useState } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Collapse from "@mui/material/Collapse";
import { NavLink } from "react-router-dom";
import "./style.css";

const baseMenus = [
  {
    id: 1,
    title: "Inicio",
    link: "/home",
    submenu: [
      {
        id: 11,
        title: "Página de Inicio",
        link: "/home",
      },
    ],
  },
  {
    id: 2,
    title: "Nosotros",
    link: "/contact",
  },
  {
    id: 3,
    title: "Servicios",
    link: "#",
    submenu: [
      {
        id: 31,
        title: "Transporte Aéreo",
        link: "/service-single/Air-Transport",
      },
      {
        id: 32,
        title: "Transporte Marítimo",
        link: "/service-single/Ocean-Transport2",
      },
      {
        id: 33,
        title: "Solicitar Servicio",
        link: "/request-service",
      },
    ],
  },
  {
    id: 4,
    title: "Cotización",
    link: "/calculation",
  },
  {
    id: 5,
    title: "Pedidos",
    link: "#",
    submenu: [
      {
        id: 51,
        title: "Solicitudes",
        link: "/ordenes",
      },
      {
        id: 52,
        title: "Rastrear Pedido - Envío Marítimo",
        link: "/tracking-latamcargo",
      },
      {
        id: 53,
        title: "Rastrear Pedido - Envío Aéreo",
        link: "/tracking-avianca",
      },
      {
        id: 54,
        title: "Estado de Pedidos",
        link: "/order-status",
      },
    ],
  },
  {
    id: 6,
    title: "Contacto",
    link: "/contact",
  },
];

const adminExtraMenus = [
  {
    id: 7,
    title: "Dashboard de Administración",
    link: "/admin",
  },
];

const MobileMenu = ({ userRole }) => {
  const [openId, setOpenId] = useState(0);
  const [menuActive, setMenuState] = useState(false);

  // Aquí se construye el menú final
  let menus = [...baseMenus];

  // Si es admin, agregamos las opciones extra en el submenu de "Inicio"
  if (userRole === "admin") {
    const homeMenuIndex = menus.findIndex((menu) => menu.id === 1);
    if (homeMenuIndex !== -1) {
      menus[homeMenuIndex].submenu = [
        ...menus[homeMenuIndex].submenu,
        ...adminExtraMenus,
      ];
    } else {
      // Si por alguna razón no existe "Inicio", lo agregamos
      menus.unshift({
        id: 1,
        title: "Inicio",
        link: "/home",
        submenu: [...adminExtraMenus],
      });
    }
  }

  const ClickHandler = () => {
    window.scrollTo(10, 0);
    setMenuState(false); // cerrar menú al hacer click en enlace
  };

  return (
    <div>
      <div className={`mobileMenu ${menuActive ? "show" : ""}`}>
        <div className="menu-close">
          <div className="clox" onClick={() => setMenuState(false)}>
            <i className="ti-close"></i>
          </div>
        </div>

        <ul className="responsivemenu">
          {menus.map((item) => (
            <ListItem
              className={item.id === openId ? "active" : null}
              key={item.id}
            >
              {item.submenu ? (
                <Fragment>
                  <p
                    onClick={() => setOpenId(item.id === openId ? 0 : item.id)}
                    style={{ cursor: "pointer" }}
                  >
                    {item.title}{" "}
                    <i
                      className={
                        item.id === openId ? "fa fa-angle-up" : "fa fa-angle-down"
                      }
                    ></i>
                  </p>
                  <Collapse in={item.id === openId} timeout="auto" unmountOnExit>
                    <List className="subMenu">
                      {item.submenu.map((submenu) => (
                        <ListItem key={submenu.id}>
                          <NavLink
                            onClick={ClickHandler}
                            className="active"
                            to={submenu.link}
                          >
                            {submenu.title}
                          </NavLink>
                        </ListItem>
                      ))}
                    </List>
                  </Collapse>
                </Fragment>
              ) : (
                <NavLink className="active" to={item.link} onClick={ClickHandler}>
                  {item.title}
                </NavLink>
              )}
            </ListItem>
          ))}
        </ul>
      </div>

      <div className="showmenu mobail-menu" onClick={() => setMenuState(!menuActive)}>
        <button type="button" className="navbar-toggler open-btn">
          <span className="icon-bar first-angle"></span>
          <span className="icon-bar middle-angle"></span>
          <span className="icon-bar last-angle"></span>
        </button>
      </div>
    </div>
  );
};

export default MobileMenu;

