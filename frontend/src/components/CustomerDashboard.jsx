import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "../styles/CustomerDashboard.css";

const CustomerDashboard = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  // ✅ Grab userId from the URL query
  const userId = searchParams.get("userId");

  const [problemDescription, setProblemDescription] = useState("");
  const [problemImage, setProblemImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("user_id", userId); // use dynamic userId from URL
    formData.append("problem_description", problemDescription);
    formData.append("problem_image", problemImage);

    if(!formData.get("problem_image") || !formData.get("problem_description")) {
      alert("Please provide both a problem description and an image.");
      return;
    }

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/problem/upload`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        // ✅ Redirect with both userId and predicted_category in query
        navigate(`/CustomerResult?userId=${userId}&category=${data.predicted_category}`);
      } else {
        alert("Error: " + data.message);
      }
    } catch (error) {
      console.error("Error uploading problem:", error);
      alert("Server error, please try again");
    }
  };

  return (
    <div>
      <h1>Customer Dashboard</h1>
      <div className="cd-card">
      <h2>Mention your Problem</h2>
      <form onSubmit={handleSubmit}>
        
        <p>Upload the image copy of the problem</p>
        <input
          className="btn"
          type="file"
          placeholder="Upload Image Proof"
          onChange={(e) => setProblemImage(e.target.files[0])}
        />
        <br />
        <textarea
          placeholder="Describe your problem"
          value={problemDescription}
          onChange={(e) => setProblemDescription(e.target.value)}
        />

        <button type="submit" className="btn">Submit Problem</button>
      </form>
      </div>
    </div>
  );
};

export default CustomerDashboard;
