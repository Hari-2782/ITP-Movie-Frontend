import React, { useState, useEffect } from "react";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = async () => {
    try {
      const res = await fetch(
        "https://itp-movie-backend-me632rlg9-haris-projects-18861f06.vercel.app/user/logout",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      await res.json();
      window.location.href = "/login";
    } catch (err) {
      console.error(err);
      window.location.href = "/";
    }
  };

  const checkLogin = async () => {
    try {
      const res = await fetch(
        "https://itp-movie-backend-me632rlg9-haris-projects-18861f06.vercel.app/user/checklogin",
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      setIsLoggedIn(data.ok);
    } catch {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <header className="header-modern">
      <nav className="navbar">
        {/* Left Section - Search */}
        <div className="nav-left">
          <div className="searchbox">
            <BiSearch className="search-icon" />
            <input type="text" placeholder="Search for movies..." />
          </div>
        </div>

        {/* Center Section - Links */}
        <div className="nav-center">
          <Link to="/" className="nav-link">
            Home
          </Link>
          <Link to="/movie" className="nav-link">
            Movies
          </Link>
          <Link to="/offer" className="nav-link">
            Offers
          </Link>
        </div>

        {/* Right Section - Auth Buttons */}
        <div className="nav-right">
          {isLoggedIn ? (
            <>
              <button className="btn logout-btn" onClick={handleLogout}>
                Logout
              </button>
              <Link to="/profile">
                <BiUserCircle className="user-icon" />
              </Link>
            </>
          ) : (
            <button
              className="btn login-btn"
              onClick={() => (window.location.href = "/login")}
            >
              Login
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
