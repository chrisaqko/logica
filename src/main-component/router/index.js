import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "../HomePage/HomePage";
import HomePage2 from "../HomePage2/HomePage2";
import HomePage3 from "../HomePage3/HomePage3";
import AboutPage from "../AboutPage/AboutPage";
import ServicePages from "../ServicePage/ServicePage";
import ServicePagesS2 from "../ServicePageS2/ServicePageS2";
import ServicePagesS3 from "../ServicePageS3/ServicePageS3";
import ServiceSinglePage from "../ServiceSinglePage/ServiceSinglePage";
import ProjectPage from "../ProjectPage/ProjectPage";
import ProjectPageS2 from "../ProjectPageS2/ProjectPageS2";
import ProjectPageS3 from "../ProjectPageS3/ProjectPageS3";
import ProjectSinglePage from "../ProjectSinglePage/ProjectSinglePage";
import CalculationPage from "../TrackingPage/CalcutionPage.js";
import TrackingLatamCargoPage from "../TrackingPage/TrackingLatamCargoPage.js";
import TrackingAviancaPage from "../TrackingPage/TrackingAviancaPage.js";
import ShopPage from "../ShopPage/ShopPage";
import ProductSinglePage from "../ProductSinglePage";
import CartPage from "../CartPage";
import CheckoutPage from "../CheckoutPage";
import OrderRecived from "../OrderRecived";
import BlogPage from "../BlogPage/BlogPage";
import BlogPageLeft from "../BlogPageLeft/BlogPageLeft";
import BlogPageFullwidth from "../BlogPageFullwidth/BlogPageFullwidth";
import BlogDetails from "../BlogDetails/BlogDetails";
import BlogDetailsLeftSiide from "../BlogDetailsLeftSiide/BlogDetailsLeftSiide";
import BlogDetailsFull from "../BlogDetailsFull/BlogDetailsFull";
import ContactPage from "../ContactPage/ContactPage";
import ErrorPage from "../ErrorPage/ErrorPage";
import OrderHistoryPage from "../OrderHistoryPage/OrderHistoryPage";
import LoginPage from "../LoginPage/LoginPage";
import AdminHomePage from "../AdminHomePage/AdminHomePage";
import VariableManagerPage from "../AdminVariableModule/VariablesManagerHomepage.jsx";
import RegisterPage from "../RegisterPage/RegisterPage";
import ProfilePage from "../Profile/ProfilePage";
import ResetPasswordPage from "../ResetPasswordPage/ResetPasswordPage";
import ServiceRequestHomePage from "../ServiceRequest/ServiceRequestHomePage.jsx";
import AdminServiceManager from "../AdminServiceManager/AdminServiceManager.jsx";
import AdminServiceEditor from '../AdminServiceManager/AdminServiceEditor.jsx';
import OrderStatus from "../OrderStatusManager/OrderStatusHomepage.jsx";
import AdminReportsPage from '../AdminReports/AdminReportsPage.jsx'
import PaymentPage from '../PaymentPage/PaymentPage.js'
import AdminOrderControl from "../AdminOrderControl/AdminOrderControl.jsx";
import AdminOrderEditor from "../AdminOrderControl/AdminOrderEditor.jsx";
const AllRoute = () => {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="home" element={<Homepage />} />
          <Route path="home-2" element={<HomePage2 />} />
          <Route path="home-3" element={<HomePage3 />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="service" element={<ServicePages />} />
          <Route path="service-s2" element={<ServicePagesS2 />} />
          <Route path="service-s3" element={<ServicePagesS3 />} />
          <Route path="service-single/:slug" element={<ServiceSinglePage />} />
          <Route path="project" element={<ProjectPage />} />
          <Route path="project-s2" element={<ProjectPageS2 />} />
          <Route path="project-s3" element={<ProjectPageS3 />} />
          <Route path="project-single/:slug" element={<ProjectSinglePage />} />
          <Route path="calculation" element={<CalculationPage />} />
          <Route path="tracking-latamcargo" element={<TrackingLatamCargoPage />} />
          <Route path="tracking-avianca" element={<TrackingAviancaPage />} />
          <Route path="shop" element={<ShopPage />} />
          <Route path="shop-single/:slug" element={<ProductSinglePage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="order_received" element={<OrderRecived />} />
          <Route path="blog" element={<BlogPage />} />
          <Route path="blog-left-sidebar" element={<BlogPageLeft />} />
          <Route path="blog-fullwidth" element={<BlogPageFullwidth />} />
          <Route path="blog-single/:slug" element={<BlogDetails />} />
          <Route
            path="blog-single-left-sidebar/:slug"
            element={<BlogDetailsLeftSiide />}
          />
          <Route
            path="blog-single-fullwidth/:slug"
            element={<BlogDetailsFull />}
          />
          <Route path="contact" element={<ContactPage />} />
          <Route path="404" element={<ErrorPage />} />
          <Route path="/ordenes" element={<OrderHistoryPage />} />
          <Route path="/order-status" element={<OrderStatus />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/variables" element={<VariableManagerPage />} />
          <Route path="/admin/solicitudes" element={<AdminServiceManager />} />
          <Route path="/admin/reporteria" element={ <AdminReportsPage /> } />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/history" element={<OrderHistoryPage/>}/>
          <Route path="/reset-password" element={<ResetPasswordPage />} />
          <Route path="/admin/solicitud/:id" element={<AdminServiceEditor />} />
          <Route path="/pagar/:id" element={<PaymentPage />} />
          <Route path="/admin/ordenes" element={<AdminOrderControl/>} />
          <Route path="/admin/orden/:id" element={<AdminOrderEditor />} />
          <Route path="/request-service" element={<ServiceRequestHomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default AllRoute;
