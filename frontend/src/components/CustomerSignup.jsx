import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import "../styles/CustomerSignup.css";

const CustomerSignup = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    place: "",
    district: "",
    country: "",
    pincode: ""
  });

  const handleChange = (e) => {
    setFormData({ 
      ...formData, 
      [e.target.name]: e.target.value 
    });
  };

  const handleSignup = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/user/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Signup Successful:", data);
        navigate("/customer-login"); 
        alert("Signup successful! Please login.");
      } else {
        alert(data.message || "Signup failed");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      alert("Server error, please try again");
    }
  };

  return (
    <div>
      <h1>Customer Signup</h1>
      <div className="signup-container">
      <input className="signup-input" type='text'     name="name" placeholder="Name" value={formData.name} onChange={handleChange} /><br />
      <input className="signup-input" type='email'     name="email" placeholder="Email" value={formData.email} onChange={handleChange} /><br />
      <input className="signup-input" type='number'     name="phone" placeholder="Phone" value={formData.phone} onChange={handleChange} /><br />
      <input className="signup-input" type='text'     name="address" placeholder="Address" value={formData.address} onChange={handleChange} /><br />
      <input className="signup-input" type='text'     name="place" placeholder="Place" value={formData.place} onChange={handleChange} /><br />
      <input className="signup-input" type='text'     name="district" placeholder="District" value={formData.district} onChange={handleChange} /><br />
      <input className="signup-input" type='text'     name="country" placeholder="Country" value={formData.country} onChange={handleChange} /><br />
      <input className="signup-input" type='number'     name="pincode" placeholder="Pincode" value={formData.pincode} onChange={handleChange} /><br />
      
      <button className="btn" onClick={handleSignup}>
        Signup
      </button>
      </div>
    </div>
  );
}
   

export default CustomerSignup;
