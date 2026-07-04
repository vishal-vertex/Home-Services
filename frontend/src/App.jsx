import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import CustomerLogin from "./components/CustomerLogin";
import ServiceLogin from "./components/ServiceLogin";
import CustomerDasboard from "./components/CustomerDashboard";
import CustomerSignup from "./components/CustomerSignup";
import CustomerResult from "./components/CustomerResult";
import ServiceDashboard from "./components/ServiceDashboard";
import React from "react";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customer-login" element={<CustomerLogin />} />
        <Route path="/service-login" element={<ServiceLogin />} />
        <Route path="/CustomerDashboard" element={<CustomerDasboard />} />
        <Route path="/CustomerSignup" element={<CustomerSignup />} />
        <Route path="/CustomerResult" element={<CustomerResult />} />
        <Route path="/ServiceDashboard" element={<ServiceDashboard />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;