import HeaderTop from "../../components/HeaderTop/HeaderTop";
import Navbar from "../../components/Navbar/Navbar";
import Footer from "../../components/footer/Footer";
import PageTitle from "../../components/pagetitle/PageTitle";
import PaymentUploader from "../../components/PaymentUploader/PaymentUploader";
import Logo from "../../images/logo_logica01.svg";

export default function PedidoPage({ pedido }) {
  return (
    <>
      <HeaderTop />
      <Navbar hclass={"wpo-site-header"} Logo={Logo} />
      <PageTitle pageTitle={"Pago de Pedido"} pagesub={"Pagar"} />
      <section className="wpo-contact-form-area section-padding">
        <div className="container">
          <PaymentUploader 
            accept="image/*,application/pdf"
            maxSizeMb={5}
            onChange={(file) => {
              console.log("Archivo listo para subir:", file);
            }}
          />
        </div>
      </section>

      <Footer hclass={"wpo-site-footer-s2"} />
    </>
  );
}
