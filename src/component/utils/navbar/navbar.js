import React, { useState, useEffect } from "react";
import { BiSearch, BiUserCircle } from "react-icons/bi";
import { BsMoon, BsSun } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { Link } from "react-router-dom";
import "./Navbar.css";

const Navbar = ({ onToggleTheme, currentTheme }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

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

        {/* Right Section - Auth Buttons + Theme Toggle */}
        <div className="nav-right">
          <button
            type="button"
            className="btn theme-toggle-btn"
            onClick={onToggleTheme}
            aria-label="Toggle theme"
            title={currentTheme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {currentTheme === 'light' ? <BsMoon className="theme-icon" /> : <BsSun className="theme-icon" />}
          </button>
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

        {/* Mobile Toggle */}
        <button
          className="mobile-toggle"
          aria-label="Toggle navigation"
          onClick={() => setMobileOpen((v) => !v)}
        >
          <GiHamburgerMenu />
        </button>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="mobile-menu" onClick={() => setMobileOpen(false)}>
          <div className="mobile-menu-panel" onClick={(e) => e.stopPropagation()}>
            <Link to="/" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Home
            </Link>
            <Link to="/movie" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Movies
            </Link>
            <Link to="/offer" className="mobile-link" onClick={() => setMobileOpen(false)}>
              Offers
            </Link>
            <button
              className="mobile-btn"
              onClick={() => { onToggleTheme?.(); }}
            >
              {currentTheme === 'light' ? (
                <><BsMoon style={{ marginRight: 8 }} /> Dark mode</>
              ) : (
                <><BsSun style={{ marginRight: 8 }} /> Light mode</>
              )}
            </button>
            <div className="mobile-divider" />
            {isLoggedIn ? (
              <>
                <Link to="/profile" className="mobile-link" onClick={() => setMobileOpen(false)}>
                  Profile
                </Link>
                <button className="mobile-btn" onClick={handleLogout}>Logout</button>
              </>
            ) : (
              <button className="mobile-btn" onClick={() => (window.location.href = "/login")}>Login</button>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
