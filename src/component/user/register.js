import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import "./auth.css";

export default function Signup() {
  const [formData, setFormData] = useState({ name: "", email: "" });
  const [errors, setErrors] = useState({});

  // Background images
  const bgImages = [
    "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg",
    "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/mrapJp0qb6Fvo3IW9IrjCK9IgSo.jpg",
    "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
  ];
  const [bgIndex, setBgIndex] = useState(0);

  // Change background every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    const validationErrors = {};
    if (!formData.name) validationErrors.name = "Name is required";
    if (!formData.email) validationErrors.email = "Email is required";

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      const response = await fetch(
        "https://itp-movie-backend.vercel.app/user/register",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        }
      );
      const data = await response.json();
      if (data.ok) {
        toast.success(data.message, { autoClose: 2000 });
        window.location.href = "/login";
        setFormData({ name: "", email: "" });
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      toast.error(error.message, { autoClose: 2000 });
    }
  };

  return (
    <div
      className="auth-container"
      style={{
        backgroundImage: `url(${bgImages[bgIndex]})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        transition: "background-image 1s ease-in-out",
      }}
    >
      <div className="auth-box">
        <h2 className="auth-title">Register</h2>
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              placeholder="Enter Your Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            {errors.name && <span className="form-error">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="text"
              placeholder="Enter Your Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            {errors.email && <span className="form-error">{errors.email}</span>}
          </div>

          <button type="submit" className="btn-main">
            Register
          </button>

          <p className="auth-link">
            Already have an account? <Link to="/login">Login</Link>
          </p>
        </form>
      </div>
    </div>
  );
}
