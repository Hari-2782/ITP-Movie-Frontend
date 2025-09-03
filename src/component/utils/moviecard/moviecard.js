import React from "react";
import { BsFillStarFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import "./MovieCard.css";

const MovieCard = ({ movie }) => {
  const navigate = useNavigate();
  if (!movie) return null;

  const { _id, title, genre = [], rating, portraitImgUrl } = movie;

  return (
    <div className="movie-card" onClick={() => navigate(`/movies/${_id}`)}>
      {/* Top-left cinema logo */}
      <div className="cinemagi-logo">C</div>

      <div className="poster-wrapper">
        <img src={portraitImgUrl} alt={title} className="movie-poster" />

        {/* Gradient overlay behind text */}
        <div className="text-overlay">
          <h3 className="movie-title">{title}</h3>
          <div className="movie-rating">
            <BsFillStarFill className="star" /> {rating}/10
          </div>
        </div>

        {/* Book Now button only on hover */}
        <button
          className="book-btn"
          onClick={(e) => {
            e.stopPropagation();
            navigate(`/movies/${_id}`);
          }}
        >
          Book Now
        </button>
      </div>
    </div>
  );
};

export default MovieCard;
