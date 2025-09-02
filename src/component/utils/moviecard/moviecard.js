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
      <img src={portraitImgUrl} alt={title} className="movie-poster" />

      <div className="movie-overlay">
        <h3 className="movie-title">{title}</h3>
        <p className="movie-genre">{Array.isArray(genre) ? genre.join(", ") : ""}</p>
        <div className="movie-rating">
          <BsFillStarFill className="star" />
          {rating}/10
        </div>
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
