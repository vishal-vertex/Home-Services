import React from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {

  const navigate = useNavigate();

  return (
    <div>

      <h1>Local Home Services</h1>

      <div className="card-container">
      <button
        className="btn"
        onClick={() => navigate("/customer-login")}
      >
        Customer Login
      </button>

      <button
        className="btn"
        onClick={() => navigate("/service-login")}
      >
        Service Provider Login
      </button>
      </div>
    </div>
  );
};

export default Home;