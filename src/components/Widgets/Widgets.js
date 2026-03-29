import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAngleDown,
  faAngleUp,
  faChartArea,
  faChartBar,
  faChartLine,
  faFlagUsa,
  faFolderOpen,
  faGlobeEurope,
  faPaperclip,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  faAngular,
  faBootstrap,
  faReact,
  faVuejs,
} from "@fortawesome/free-brands-svg-icons";
import {
  Col,
  Row,
  Card,
  Image,
  Button,
  ListGroup,
  ProgressBar,
  Dropdown,
} from "@themesberg/react-bootstrap";
import {
  faClipboard,
  faFileAlt,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { getDocument } from "../../firebase/firestore";
import { auth } from "../../firebase/firebase";
import { useAuth } from "../../contexts/authContext";

export const ProfileCardWidget = () => {
  const { userLoggedIn, currentUser } = useAuth();

  const usuario = currentUser?.usuario || "-";
  const nombre = currentUser?.nombre || "-";
  const apellido = currentUser?.apellido || "-";
  const empresa = currentUser?.empresa || "-";
  const email = currentUser?.email || "-";
  const telefono = currentUser?.telefono || "-";
  const direccion = currentUser?.direccion || "-";
  return (
    <Card border="light" className="text-center p-0 mb-4 ">
      <div
        style={{ backgroundColor: "#f0f2f5", height: "100px" }}
        className="profile-cover rounded-top"
      />
      <Card.Body className="pb-5">
        <div
          className="user-avatar large-avatar rounded-circle mx-auto mt-n7 mb-4"
          style={{
            width: "100px",
            height: "100px",
            backgroundColor: "#d1d1d1",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "1.5rem",
            fontWeight: "bold",
            color: "#666",
          }}
        >
          <FontAwesomeIcon icon={faUser} />
        </div>
        <Card.Title>{`${nombre} ${apellido}`}</Card.Title>
        <Card.Subtitle className="text-gray mb-4">{empresa}</Card.Subtitle>
        <Card.Subtitle className="fw-normal mb-2">{email}</Card.Subtitle>
        <Card.Subtitle className="fw-normal mb-2">{telefono}</Card.Subtitle>
        <Card.Subtitle className="fw-normal mb-2">{direccion}</Card.Subtitle>

        <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center py-5">
          <div className="d-flex">
            <Button
              variant="primary"
              className="center-middle"
              style={{ backgroundColor: "#177265", borderColor: "#177265" }}
              href="/history"
            >
              <FontAwesomeIcon icon={faClipboard} className="me-2" />
              Historial de Solicitudes
            </Button>
          </div>
        </div>
      </Card.Body>
    </Card>
  );
};
