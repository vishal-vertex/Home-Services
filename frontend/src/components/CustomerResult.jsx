import React, { useState } from "react";
import { useSearchParams } from "react-router-dom";
import "../styles/CustomerResult.css"

const CustomerResult = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  const category = searchParams.get("category");

  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/service/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ user_id: userId, category }),
      });

      const data = await response.json();

      if (response.ok) {
        setServices(data);
      } else {
        alert(data.message || "No services found");
      }
    } catch (error) {
      console.error("Error searching services:", error);
      alert("Server error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h1>Nearby Results</h1>
      <div className="container">
      <p>User ID: {userId}</p>
      <p>Predicted Category: {category}</p>
      <p>You can see the nearby service providers below</p>
<br />
      <button onClick={handleSearch} disabled={loading} className="btn">
        {loading ? "Searching..." : "Search Nearby Service Providers"}
      </button>

      <div style={{ marginTop: "20px" }}>
        {services.length > 0 ? (
          services.map((service, index) => (
            <div key={index} className="result-container">
              <h3>Shop Name: {service.shop_name}</h3>
              <p>Owner Name: {service.owner_name}</p>
              <p>Description: {service.description}</p>
              <p>Experience: {service.experience} years</p>
              <p>Address: {service.address}</p>
              <p>Pincode: {service.pincode}</p>
              <p>District: {service.district}</p>
              <p>Country: {service.country}</p>
              <p>Phone: {service.phone}</p>
              <p>Email: {service.email}</p>
            </div>
          ))
        ) : (
          <p>No services found yet.</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default CustomerResult;
