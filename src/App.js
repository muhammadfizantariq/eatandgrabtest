import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import Footer from "./pages/Footer/Footer";
import Navbar from "../src/Navbar";
import { ToastContainer } from "react-toastify";
import "primereact/resources/themes/lara-light-indigo/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "react-toastify/dist/ReactToastify.css";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";
import Menu from "./pages/Menu/Menu";
import Job from "./pages/Job/Job";
import OrderSuccess from "./pages/Order/OrderSuccess";

const LayoutWrapper = () => {

  return (
    <div className="min-h-screen bg-gray-50">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/job" element={<Job />} />
        <Route path="/order-success" element={<OrderSuccess />} />
      </Routes>
      <div className="">
        <Footer />
      </div>
    </div>
  );
};

function App() {
  return (
    <Router>
      <LayoutWrapper />
    </Router>
  );
}

export default App;
