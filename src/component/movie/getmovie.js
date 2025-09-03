import React, { useEffect, useState } from "react";
import { BsFillStarFill, BsShare } from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import CelebCard from "../utils/moviecard/celebcard";
import MovieCarousel from "../utils/moviecard/movieCarousel";

const MoviePage = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const getMovie = async () => {
      try {
        const res = await fetch(
          `https://itp-movie-backend.vercel.app/movie/get/${movieId}`,
          {
            method: "GET",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.ok) setMovie(data.data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    getMovie();
  }, [movieId]);

  if (loading)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#141414",
        }}
      >
        {/* Netflix C loader */}
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "6px solid #e50914",
            borderTop: "6px solid transparent",
            borderRadius: "50%",
            animation: "spin 1s linear infinite",
          }}
        />
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg);}
              100% { transform: rotate(360deg);}
            }
          `}
        </style>
      </div>
    );

  if (!movie)
    return (
      <div
        style={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          color: "#fff",
          backgroundColor: "#141414",
        }}
      >
        Movie not found
      </div>
    );

  return (
    <div
      style={{
        backgroundColor: "#141414",
        color: "#fff",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Banner */}
      <div
        style={{
          position: "relative",
          backgroundImage: `url(${movie.landscapeImgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "60vh",
          width: "100%",
          display: "flex",
          alignItems: "center",
          padding: "20px 40px",
        }}
      >
        {/* Dark overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.6)",
            zIndex: 1,
          }}
        />
        <div style={{ display: "flex", gap: "20px", zIndex: 2, width: "100%" }}>
          {/* Poster */}
          <div style={{ minWidth: "220px", position: "relative" }}>
            <img
              src={movie.portraitImgUrl}
              alt={movie.title}
              style={{ width: "220px", borderRadius: "8px" }}
            />
            <p
              style={{
                position: "absolute",
                bottom: "8px",
                left: "8px",
                background: "#e50914",
                padding: "2px 6px",
                fontSize: "12px",
                borderRadius: "4px",
              }}
            >
              In Cinemas
            </p>
          </div>

          {/* Info */}
          <div style={{ maxWidth: "700px" }}>
            <h1
              style={{
                fontSize: "32px",
                fontWeight: "bold",
                marginBottom: "10px",
              }}
            >
              {movie.title}
            </h1>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
                marginBottom: "8px",
              }}
            >
              <BsFillStarFill style={{ color: "#f5c518", fontSize: "20px" }} />
              <span style={{ fontSize: "18px", fontWeight: "bold" }}>
                {movie.rating}/10
              </span>
              <span style={{ fontSize: "16px", color: "#aaa" }}>
                {movie.duration} mins
              </span>
              <span style={{ fontSize: "16px", color: "#aaa" }}>
                {movie.genre.join(", ")}
              </span>
            </div>
            <p
              style={{
                fontSize: "16px",
                lineHeight: "1.5",
                marginBottom: "16px",
                color: "#ddd",
              }}
            >
              {movie.description}
            </p>
            <button
              style={{
                padding: "10px 20px",
                backgroundColor: "#e50914",
                color: "#fff",
                border: "none",
                borderRadius: "4px",
                fontWeight: "bold",
                cursor: "pointer",
              }}
              onClick={() => navigate(`/buy-ticket/${movieId}`)}
            >
              Book Tickets
            </button>
          </div>

          {/* Share Button */}
          <div style={{ marginLeft: "auto", zIndex: 2 }}>
            <Link
              to="https://www.google.com/"
              style={{ textDecoration: "none" }}
            >
              <button
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "6px",
                  padding: "8px 12px",
                  backgroundColor: "rgba(0,0,0,0.6)",
                  border: "1px solid #fff",
                  borderRadius: "4px",
                  cursor: "pointer",
                  color: "#fff",
                }}
              >
                <BsShare /> Share
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Cast */}
      {movie.cast.length > 0 && (
        <div style={{ padding: "30px 40px" }}>
          <h2 style={{ marginBottom: "12px" }}>Cast</h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              1024: { slidesPerView: 3, spaceBetween: 15 },
              1440: { slidesPerView: 6, spaceBetween: 20 },
            }}
            modules={[Pagination]}
          >
            {movie.cast.map((c, i) => (
              <SwiperSlide key={i}>
                <CelebCard {...c} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Crew */}
      {movie.crew.length > 0 && (
        <div style={{ padding: "0 40px 30px 40px" }}>
          <h2 style={{ marginBottom: "12px" }}>Crew</h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 },
              640: { slidesPerView: 2, spaceBetween: 10 },
              1024: { slidesPerView: 3, spaceBetween: 15 },
              1440: { slidesPerView: 6, spaceBetween: 20 },
            }}
            modules={[Pagination]}
          >
            {movie.crew.map((c, i) => (
              <SwiperSlide key={i}>
                <CelebCard {...c} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* You might also like */}
      <div style={{ padding: "30px 40px", paddingBottom: "60px" }}>
        <h2 style={{ marginBottom: "12px" }}>You might also like</h2>
        <MovieCarousel />
      </div>
    </div>
  );
};

export default MoviePage;
