import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/CustomerLogin.css";


const CustomerLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  // ✅ state for loader

  const handleLogin = async () => {
    if (!email) {
      alert("Please enter your email");
      return;
    }

    

    try {
      const response = await fetch("http://localhost:5000/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      if (response.ok) {
        console.log("Customer Login Successful:", data);
        navigate(`/CustomerDashboard/?userId=${data.user_id}`);
      } else {
        alert(data.message || "Login failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Server error, please try again");
    } finally {
      setLoading(false); // hide loader
    }
  };

  return (
    <div>
      <h1>Customer Login</h1>
      <div className="login-container">  
        <input
          className="login-input"
          type="email" 
          placeholder="Enter your email" 
          value={email} 
          onChange={(e) => setEmail(e.target.value)} 
        />
        <br />
        <button className="btn" onClick={handleLogin}>
          Login
        </button>
        <br />
        <p>Don't have an account? Sign up below</p>
        <br />
        <button className="btn" onClick={() => navigate("/CustomerSignup")}>
          Signup
        </button>
      </div>
    </div>
  );
};

export default CustomerLogin;
