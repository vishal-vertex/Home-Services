import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/ServiceLogin.css";

const ServiceLogin = () => {
  const navigate = useNavigate();

  // State for all fields
  const [formData, setFormData] = useState({
    shop_name: "",
    owner_name: "",
    email: "",
    phone: "",
    category: "",
    experience: "",
    address: "",
    place: "",
    district: "",
    country: "",
    pincode: "",
    description: ""
  });

  
  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    if(formData.shop_name === "" || formData.owner_name === "" || formData.email === "" || formData.phone === "" || formData.category === "" || formData.experience === "" || formData.address === "" || formData.place === "" || formData.district === "" || formData.country === "" || formData.pincode === "" || formData.description === "") {
      alert("Please fill all the fields");
      return;
    }





    try {
      const response = await fetch("http://localhost:5000/service/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // "Service Added"
        navigate("/serviceDashboard"); // redirect after signup
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error signing up:", error);
      alert("Server error, please try again");
    }
  };

  return (
    <div>
      <h1>Service Provider Signup</h1>
      
      
      <form onSubmit={handleSubmit} className="glassmorphism">
        <div className="Outercontainer">
          <div className="service-signup-container">
            <input className="service-signup-input" name="shop_name" placeholder="Shop Name" onChange={handleChange} />
            <input className="service-signup-input" name="owner_name" placeholder="Owner Name" onChange={handleChange} />
            <input className="service-signup-input" name="email" type="email" placeholder="Email" onChange={handleChange} />
            <input className="service-signup-input" name="phone" placeholder="Phone" onChange={handleChange} />
            <input className="service-signup-input" name="category" placeholder="Category" onChange={handleChange} />
            <input className="service-signup-input" name="experience" placeholder="Experience" onChange={handleChange} />
          </div>
          <div className="service-signup-container">
          <input className="service-signup-input" name="address" placeholder="Address" onChange={handleChange} />
          <input className="service-signup-input" name="place" placeholder="Place" onChange={handleChange} />
          <input className="service-signup-input" name="district" placeholder="District" onChange={handleChange} />
          <input className="service-signup-input" name="country" placeholder="Country" onChange={handleChange} />
          <input className="service-signup-input" name="pincode" placeholder="Pincode" onChange={handleChange} />
          <textarea className="service-signup-input" name="description" placeholder="Description" onChange={handleChange}></textarea>
          </div>
        </div>
        <br />
        <br />
        <button type="submit" className="btn">Signup</button>
      </form>
      
    </div>
  );
};

export default ServiceLogin;
