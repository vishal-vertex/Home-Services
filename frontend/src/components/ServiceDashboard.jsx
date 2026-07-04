import React from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/ServiceDashboard.css";

const ServiceDashboard = () => {
  const navigate = useNavigate();

  return (
    <div>
        <h1>Service Dashboard</h1>
        <div className="dashboard-container">
            <p>Congratulations! You have successfully logged in.</p>
            <p>Your details has been successfully added.</p>
            <p>Now user can view your services.</p>
            <p>Thank you for choosing our platform!</p>
            <br />
            <p>We are excited to have you on board and look forward to providing you with the best service experience.</p>
            <p>If you have any questions or need assistance, please don't hesitate to reach out to our support team.</p>
            <p>Helpdesk: auragene.tech@gmail.com</p>
            
            
            <br />
            <button className="btn" onClick={() => navigate('/')}>Go to Home</button>
        </div>
    </div>
  )
}

export default ServiceDashboard