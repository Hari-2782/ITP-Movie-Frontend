import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { FcGoogle } from "react-icons/fc"; // Google logo
import { FaApple } from "react-icons/fa"; // Apple logo
import "./auth.css";

const Login = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState({});

  // Background images
  const bgImages = [
    "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/cDJ61O1STtbWNBwefuqVrRe3d7l.jpg",
    "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/mrapJp0qb6Fvo3IW9IrjCK9IgSo.jpg",
    "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/mDfJG3LC3Dqb67AZ52x3Z0jU0uB.jpg",
  ];

  const [bgIndex, setBgIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setBgIndex((prev) => (prev + 1) % bgImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") setEmail(value);
    if (name === "otp") setOtp(value);
  };

  const handleRequestOTP = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://itp-movie-backend.vercel.app/user/sendOTP`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        setStep(2);
        toast.success("OTP sent successfully");
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error("Failed to send OTP", { autoClose: 2000 });
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `https://itp-movie-backend.vercel.app/user/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
          credentials: "include",
        }
      );
      const data = await response.json();
      if (response.ok) {
        toast.success("Login successful", { autoClose: 2000 });
        window.location.href = "/";
      } else {
        toast.error(data.message, { autoClose: 2000 });
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error("Failed to verify OTP", { autoClose: 2000 });
    }
  };

  const handleGoogleLogin = () => {
    toast.info("Google login not implemented yet");
  };

  const handleAppleLogin = () => {
    toast.info("Apple login not implemented yet");
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
        <h2 className="auth-title">Login</h2>
        <form onSubmit={handleLogin} className="auth-form">
          {step === 1 && (
            <>
              <div className="form-group">
                <label>Email</label>
                <input
                  type="text"
                  placeholder="Enter Your Email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                />
                {errors.email && (
                  <span className="form-error">{errors.email}</span>
                )}
              </div>
              <button
                type="submit"
                onClick={handleRequestOTP}
                className="btn-main"
              >
                Send OTP
              </button>
            </>
          )}
          {step === 2 && (
            <>
              <div className="form-group">
                <label>OTP</label>
                <input
                  type="text"
                  placeholder="Enter OTP"
                  name="otp"
                  value={otp}
                  onChange={handleChange}
                />
                {errors.otp && <span className="form-error">{errors.otp}</span>}
              </div>
              <button type="submit" className="btn-main">
                Login
              </button>
            </>
          )}
          <p className="auth-link">
            Don't have an account? <Link to="/register">Register</Link>
          </p>
        </form>

        {/* Social logins */}
        <div className="social-login">
          <button className="google-btn" onClick={handleGoogleLogin}>
            <FcGoogle size={22} /> Continue with Google
          </button>
          <button className="apple-btn" onClick={handleAppleLogin}>
            <FaApple size={22} /> Continue with Apple
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
