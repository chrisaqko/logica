import React, { Fragment } from "react";
import Scrollbar from "../../components/scrollbar/scrollbar";
import Footer from "../../components/footer/Footer";
import HeaderTopS2 from "../../components/HeaderTopS2/HeaderTopS2";
import HeaderS2Admin from "../../components/HeaderS2Admin/HeaderS2Admin";
import Logo from "../../images/logo.svg";
import FunFact from "../../components/FunFact/FunFact";
import ServiceSectionS2 from "../../components/ServiceSectionS2/ServiceSectionS2";

const HomePage2 = () => {
  return (
    <Fragment>
      <HeaderTopS2 />   
      <HeaderS2Admin Logo={Logo} />
      <div className="admin-dashboard-content section-padding">
        <FunFact hclass={"wpo-fun-fact-section-s2"} />
        <ServiceSectionS2
          hclass={"wpo-service-area-s2 section-padding"}
          ServiceBtn={false}
        />
      </div>
      <Footer hclass={"wpo-site-footer-s2"} />
      <Scrollbar />
    </Fragment>
  );
};

export default HomePage2;
