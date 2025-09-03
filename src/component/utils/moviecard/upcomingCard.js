import React from "react";
import { useNavigate } from "react-router-dom";
import { BsFillStarFill } from "react-icons/bs";
import "./MovieCard.css";

const UpcomingCard = ({ Movie }) => {
  const { title, portraitImgUrl, rating } = Movie || {};
  const navigate = useNavigate();

  if (!Movie) return null;

  return (
    <div
      className="upcoming-card"
      onClick={() => navigate(`/movies/${Movie._id || ""}`)}
      style={{
        position: "relative",
        width: "180px",
        height: "270px",
        borderRadius: "8px",
        overflow: "hidden",
        cursor: "pointer",
        backgroundColor: "#111",
        transition: "transform 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      {/* Movie image */}
      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundImage: `url(${portraitImgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      {/* Gradient overlay for readability */}
      <div
        style={{
          position: "absolute",
          bottom: "0",
          left: "0",
          width: "100%",
          height: "60px",
          background: "linear-gradient(180deg, transparent, rgba(0,0,0,0.8))",
        }}
      ></div>

      {/* Title and rating */}
      <div
        style={{
          position: "absolute",
          bottom: "8px",
          left: "8px",
          color: "#fff",
          width: "calc(100% - 16px)",
          zIndex: 2,
        }}
      >
        <p
          style={{
            margin: 0,
            fontWeight: "600",
            fontSize: "14px",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          {title}
        </p>
        {rating !== undefined && (
          <div
            style={{ display: "flex", alignItems: "center", marginTop: "4px" }}
          >
            <BsFillStarFill style={{ color: "#FFD700", marginRight: "4px" }} />
            <span style={{ fontSize: "12px" }}>{rating}/10</span>
          </div>
        )}
      </div>

      {/* Book Now button, only visible on hover */}
      <button
        style={{
          position: "absolute",
          bottom: "8px",
          left: "50%",
          transform: "translateX(-50%)",
          padding: "6px 12px",
          fontSize: "12px",
          fontWeight: "600",
          backgroundColor: "#e50914",
          color: "#fff",
          border: "none",
          borderRadius: "4px",
          opacity: 0,
          transition: "opacity 0.3s",
          cursor: "pointer",
        }}
        className="book-btn"
        onClick={(e) => {
          e.stopPropagation();
          navigate(`/movies/${Movie._id || ""}`);
        }}
      >
        Book Now
      </button>

      <style>
        {`
          .upcoming-card:hover .book-btn {
            opacity: 1;
          }
        `}
      </style>
    </div>
  );
};

export default UpcomingCard;
