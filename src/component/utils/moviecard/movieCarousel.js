import React, { useEffect, useState, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import MovieCard from "./moviecard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const MovieCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);

  const slidesPerGroup = 3;

  const getMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://itp-movie-backend.vercel.app/movie/getall`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
        }
      );
      const data = await res.json();
      if (data.ok) setMovies(data.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const handlePrev = () => {
    if (swiperRef.current) swiperRef.current.slidePrev();
  };

  const handleNext = () => {
    if (swiperRef.current) swiperRef.current.slideNext();
  };

  const containerStyle = {
    position: "relative",
    width: "100%",
    padding: "20px 0",
  };

  const arrowStyle = {
    position: "absolute",
    top: "50%",
    transform: "translateY(-50%)",
    background: "rgba(255,0,0,0.8)",
    border: "none",
    color: "#fff",
    cursor: "pointer",
    padding: "10px",
    borderRadius: "50%",
    zIndex: 10,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    transition: "opacity 0.3s ease",
    opacity: 0,
  };

  const leftArrowStyle = { ...arrowStyle, left: "-40px" };
  const rightArrowStyle = { ...arrowStyle, right: "-40px" };

  const loaderCardStyle = {
    width: "180px",
    height: "270px",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #b30000 25%, #ff1a1a 50%, #b30000 75%)",
    backgroundSize: "200% 100%",
    animation: "pulseRed 1.5s infinite",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const loaderCircleStyle = {
    width: "40px",
    height: "40px",
    border: "4px solid #444",
    borderTop: "4px solid #e50914", // red C part
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  };

  return (
    <div
      style={containerStyle}
      className="sliderout"
      onMouseEnter={() => {
        document
          .querySelectorAll(".carousel-arrow")
          .forEach((el) => (el.style.opacity = 1));
      }}
      onMouseLeave={() => {
        document
          .querySelectorAll(".carousel-arrow")
          .forEach((el) => (el.style.opacity = 0));
      }}
    >
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={3}
        spaceBetween={10}
        grabCursor={true}
        speed={600}
        modules={[Navigation]}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 5 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 15 },
          1440: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {loading
          ? // Show loading cards
            [...Array(6)].map((_, i) => (
              <SwiperSlide key={i}>
                <div style={loaderCardStyle}>
                  <div style={loaderCircleStyle}></div>
                </div>
              </SwiperSlide>
            ))
          : // Show real movie cards
            movies.map((movie) => (
              <SwiperSlide key={movie._id}>
                <MovieCard movie={movie} />
              </SwiperSlide>
            ))}
      </Swiper>

      {/* Left Arrow */}
      <button
        style={leftArrowStyle}
        className="carousel-arrow"
        onClick={handlePrev}
      >
        <BsChevronLeft size={30} />
      </button>

      {/* Right Arrow */}
      <button
        style={rightArrowStyle}
        className="carousel-arrow"
        onClick={handleNext}
      >
        <BsChevronRight size={30} />
      </button>

      <style>
        {`
          @keyframes pulseRed {
            0% { background-position: 200% 0; }
            100% { background-position: -200% 0; }
          }
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}
      </style>
    </div>
  );
};

export default MovieCarousel;
