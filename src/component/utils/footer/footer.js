import React from 'react';
import './Footer.css'; // Assuming this is your CSS file for footer styles
import { Link } from 'react-router-dom'; // Import Link from react-router-dom

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-links">
                <Link to="/">HOME</Link>
                <Link to="/movie">MOVIES</Link>
                <Link to="/feedback">customer review</Link>
                <Link to="/offer">DEALS AND EXCLUSIVES</Link>
                <Link to="/advertise">ADVERTISE</Link>
                <Link to="/about">ABOUT US</Link>
                <Link to="/careers">CAREERS</Link>
                <Link to="/contact">CONTACT US</Link>
                <Link to="/events">EVENTS</Link>
                <Link to="/disclaimer">DISCLAIMER</Link>
                <Link to="/terms">TERMS AND CONDITIONS</Link>
            </div>
            <div className="footer-subscribe">
                <p>SUBSCRIBE FOR NEWSLETTER</p>
                <input type="text" placeholder="ENTER EMAIL" />
            </div>
            <p>&copy; 2024 Your Company. All Rights Reserved.</p>
        </footer>
    );
}

export default Footer;
