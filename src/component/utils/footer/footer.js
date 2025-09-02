import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";

function Footer() {
  return (
    <footer className="footer-modern">
      {/* Links Section */}
      <div className="footer-links">
        <Link to="/">Home</Link>
        <Link to="/movie">Movies</Link>
        <Link to="/feedback">Customer Reviews</Link>
        <Link to="/offer">Deals & Exclusives</Link>
        <Link to="/advertise">Advertise</Link>
        <Link to="/about">About Us</Link>
        <Link to="/careers">Careers</Link>
        <Link to="/contact">Contact Us</Link>
        <Link to="/events">Events</Link>
        <Link to="/disclaimer">Disclaimer</Link>
        <Link to="/terms">Terms & Conditions</Link>
      </div>

      {/* Newsletter Subscribe */}
      <div className="footer-subscribe">
        <p>Subscribe to Our Newsletter</p>
        <div className="subscribe-box">
          <input type="email" placeholder="Enter your email" />
          <button>Subscribe</button>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-copy">
        <p>&copy; 2024 Your Company. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
