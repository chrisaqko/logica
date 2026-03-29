import React, { useRef, useState, useMemo, useCallback } from "react";
import Icon from "../../images/arrow.svg";
import { storage } from "../../firebase/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { updateDocument } from "../../firebase/firestore";
import { useParams } from "react-router-dom";

export default function PaymentUploader({
  accept = "image/*,application/pdf",
  maxSizeMb = 5,
  onChange,
  label = "Pago de Servicios",
  subtitle = "Adjunta una imagen o PDF del comprobante para tu pedido.",
  allowMultiple = false,
  confirmLabel = "Confirmar pago",
  onConfirm,
  disclaimerText = "NOTA: Una vez recibido por nuestro equipo, el pago será verificado y el estado de tu pedido se actualizará.",
}) {
  const { id: pedidoId } = useParams();
  const inputRef = useRef(null);
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [progress, setProgress] = useState(0);

  const maxBytes = useMemo(() => maxSizeMb * 1024 * 1024, [maxSizeMb]);

  const isImage = useMemo(() => {
    if (!file) return false;
    return file.type?.startsWith("image/");
  }, [file]);

  const openPicker = () => inputRef.current?.click();

  const validate = useCallback(
    (f) => {
      if (!f) return "";
      if (f.size > maxBytes) return `El archivo supera ${maxSizeMb} MB.`;
      const allowed = accept.split(",").map((s) => s.trim());
      const ok = allowed.some((a) =>
        a.endsWith("/*")
          ? f.type?.startsWith(a.replace("/*", "/"))
          : f.type === a
      );
      return ok ? "" : "Tipo de archivo no permitido.";
    },
    [accept, maxBytes, maxSizeMb]
  );

  const applyFile = useCallback(
    (f) => {
      const v = validate(f);
      setError(v);
      if (!v) {
        setFile(f);
        onChange?.(f);
      }
    },
    [onChange, validate]
  );

  const onInputChange = (e) => {
    const { files } = e.target;
    if (!files || files.length === 0) return;

    if (!allowMultiple && files.length > 1) {
      setError("Solo puedes subir un archivo.");
      return;
    }
    const f = files[0];
    if (f) applyFile(f);
  };

  const uploadComprobante = (pedidoId, file) => {
    return new Promise((resolve, reject) => {
      const path = `pedidos/${pedidoId}/comprobantes/${Date.now()}_${
        file.name
      }`;
      const storageRef = ref(storage, path);
      const task = uploadBytesResumable(storageRef, file);

      task.on(
        "state_changed",
        (snap) => {
          const p = Math.round((snap.bytesTransferred / snap.totalBytes) * 100);
          setProgress(p);
        },
        (err) => reject(err),
        async () => {
          const url = await getDownloadURL(task.snapshot.ref);
          resolve({ url, path });
        }
      );
    });
  };

  const handleConfirm = async () => {
    if (!file || error) return;
    try {
      setIsSubmitting(true);
      setProgress(0);

      const { url, path } = await uploadComprobante(pedidoId, file);

      await updateDocument("Pedidos", pedidoId, "URLComprobantePago", url);

      alert("Comprobante enviado. Nuestro equipo verificará el pago.");
    } catch (e) {
      console.error(e);
      alert("Ocurrió un error al subir el comprobante. Intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
      setProgress(0);
      onConfirm?.(file);
    }
  };

  const onDrop = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      setDragActive(false);

      const files = e.dataTransfer.files;
      if (!files || files.length === 0) return;

      if (!allowMultiple && files.length > 1) {
        setError("Solo puedes arrastrar un archivo.");
        return;
      }

      const f = files[0];
      if (f) applyFile(f);
    },
    [allowMultiple, applyFile]
  );

  const onDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!dragActive) setDragActive(true);
  };

  const onDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  };

  const clearFile = () => {
    setFile(null);
    setError("");
    if (inputRef.current) inputRef.current.value = "";
    onChange?.(null);
  };

  const dropStyles = {
    border: "2px dashed #dcdcdc",
    borderRadius: 12,
    background: dragActive ? "#f4f6ff" : "#f8f8f8",
    transition: "background 180ms ease, border-color 180ms ease",
    padding: "32px",
    textAlign: "center",
    cursor: "pointer",
  };

  const previewBox = {
    border: "1px solid #ececec",
    borderRadius: 12,
    padding: "16px",
    background: "#fff",
  };

  return (
    <div className="wpo-contact-form-area">
      <div className="wpo-section-title">
        <span>{label}</span>
        <h2>{subtitle}</h2>
      </div>
      <div
        className="payment-info-box"
        style={{
          background: "#f7f7f7",
          border: "1px solid #ececec",
          borderRadius: 12,
          padding: "18px 20px",
          marginBottom: 20,
        }}
      >
        <h5 style={{ marginBottom: 4 }}>
          <b>Lógica Transport Lodetrans LTL SA</b>
        </h5>
        <p style={{ marginTop: 0, marginBottom: 12 }}>
          Cédula Jurídica: <b>3-101-738243</b>
        </p>

        <h6 style={{ marginBottom: 6, marginTop: 0 }}>
          <b>Banco Promérica</b>
        </h6>

        <p style={{ fontWeight: "bold", marginBottom: 4 }}>
          Cuenta en colones:
        </p>
        <ul style={{ listStyle: "disc", paddingLeft: 22, margin: 0 }}>
          <li>
            Cuenta Promérica:{" "}
            <span style={{ whiteSpace: "nowrap" }}>30000002139471</span>
          </li>
          <li>
            Cuenta Cliente:{" "}
            <span style={{ whiteSpace: "nowrap" }}>11610300021394717</span>
          </li>
          <li>
            Cuenta IBAN:{" "}
            <span style={{ whiteSpace: "nowrap" }}>CR88011610300021394717</span>
          </li>
        </ul>

        <p style={{ fontWeight: "bold", marginTop: 12, marginBottom: 4 }}>
          Cuenta en dólares:
        </p>
        <ul style={{ listStyle: "disc", paddingLeft: 22, margin: 0 }}>
          <li>
            Cuenta Promérica:{" "}
            <span style={{ whiteSpace: "nowrap" }}>40000002139489</span>
          </li>
          <li>
            Cuenta Cliente:{" "}
            <span style={{ whiteSpace: "nowrap" }}>11610400021394899</span>
          </li>
          <li>
            Cuenta IBAN:{" "}
            <span style={{ whiteSpace: "nowrap" }}>CR83011610400021394899</span>
          </li>
        </ul>
      </div>

      <form
        className="contact-validation-active"
        onSubmit={(e) => e.preventDefault()}
      >
        <div className="shipt-info">
          <div className="row">
            <div className="form-group col-12">
              <div
                role="button"
                onClick={() => {
                  if (!file) {
                    openPicker();
                  }
                }}
                onDrop={onDrop}
                onDragOver={onDragOver}
                onDragLeave={onDragLeave}
                style={dropStyles}
              >
                <p className="mb-1" style={{ fontWeight: 600 }}>
                  Arrastra y suelta el archivo aquí
                </p>
                <p className="text-muted" style={{ marginBottom: 12 }}>
                  o haz clic para seleccionar desde tu dispositivo
                </p>
                <button
                  type="button"
                  className="theme-btn"
                  disabled={file}
                  style={
                    file
                      ? {
                          opacity: 0.6,
                          cursor: "not-allowed",
                          pointerEvents: "none",
                        }
                      : {}
                  }
                >
                  Elegir archivo{" "}
                  <i>
                    <img src={Icon} alt="" />
                  </i>
                </button>
                <div className="mt-2 text-muted" style={{ fontSize: 12 }}>
                  Formatos permitidos: JPG, PNG o PDF · Máx. {maxSizeMb} MB
                </div>

                <input
                  ref={inputRef}
                  type="file"
                  accept={accept}
                  onChange={onInputChange}
                  className="d-none"
                  multiple={allowMultiple}
                  aria-label="Seleccionar comprobante de pago"
                />
              </div>

              {error && <div className="error mt-2">{error}</div>}
            </div>

            {file && (
              <div className="form-group col-12 mt-3">
                <div style={previewBox} className="d-flex align-items-center">
                  <div
                    style={{
                      width: 80,
                      height: 80,
                      borderRadius: 10,
                      border: "1px solid #eee",
                      overflow: "hidden",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      background: "#fafafa",
                      marginRight: 16,
                      flexShrink: 0,
                    }}
                  >
                    {isImage ? (
                      <img
                        src={URL.createObjectURL(file)}
                        alt="Vista previa"
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    ) : (
                      <span style={{ fontSize: 12, color: "#666" }}>PDF</span>
                    )}
                  </div>

                  <div className="flex-grow-1">
                    <div style={{ fontWeight: 600 }} className="text-truncate">
                      {file.name}
                    </div>
                    <div className="text-muted" style={{ fontSize: 12 }}>
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </div>
                    <div className="mt-2 d-flex gap-2">
                      <button
                        type="button"
                        className="theme-btn"
                        onClick={openPicker}
                        style={{ marginRight: 8 }}
                      >
                        Cambiar{" "}
                        <i>
                          <img src={Icon} alt="" />
                        </i>
                      </button>
                      <button
                        type="button"
                        className="theme-btn btn-danger"
                        onClick={clearFile}
                      >
                        Quitar
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div
          className="payment-info-box"
          style={{
            background: "#f7f7f7",
            border: "1px solid #ececec",
            borderRadius: 12,
            padding: "14px 16px",
            marginTop: 12,
          }}
        >
          <small className="text-muted">{disclaimerText}</small>
        </div>

        <div className="clearfix error-handling-messages"></div>
        <div
          className="submit-area"
          style={{
            marginTop: 20,
            display: "flex",
            justifyContent: "center",
          }}
        >
          <button
            type="button"
            onClick={handleConfirm}
            disabled={!file || !!error || isSubmitting}
            style={{
              backgroundColor: "#FF7F50",
              border: "none",
              color: "#fff",
              padding: "14px 36px",
              fontSize: "16px",
              fontWeight: "700",
              textTransform: "uppercase",
              borderRadius: "0",
              cursor:
                !file || !!error || isSubmitting ? "not-allowed" : "pointer",
              opacity: !file || !!error || isSubmitting ? 0.6 : 1,
              letterSpacing: "1px",
              transition: "background-color 0.2s ease-in-out",
            }}
            onMouseOver={(e) => {
              if (!file || !!error || isSubmitting) return;
              e.currentTarget.style.backgroundColor = "#FF6A33";
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.backgroundColor = "#FF7F50";
            }}
          >
            {isSubmitting ? "Enviando..." : confirmLabel}
          </button>

          <div id="c-loader">
            <i className="ti-reload"></i>
          </div>
        </div>
      </form>
    </div>
  );
}
