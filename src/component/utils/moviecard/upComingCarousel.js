import React, { useEffect, useState, useRef } from "react";
import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import UpcomingCard from "./upcomingCard";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";

const UpcomingCarousel = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const swiperRef = useRef(null);


  const getMovies = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        "https://itp-movie-backend.vercel.app/up/getall",
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
    swiperRef.current?.slidePrev();
  };

  const handleNext = () => {
    swiperRef.current?.slideNext();
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
    borderRadius: "50%",
    cursor: "pointer",
    padding: "10px",
    zIndex: 20,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    opacity: 0.8,
    transition: "transform 0.3s",
  };


  return (
    <div style={containerStyle}>
      <Swiper
        onSwiper={(swiper) => (swiperRef.current = swiper)}
        slidesPerView={3}
        spaceBetween={10}
        grabCursor={true}
        speed={600}
        modules={[Navigation]}
        style={{ overflow: "visible" }}
        breakpoints={{
          320: { slidesPerView: 1, spaceBetween: 5 },
          640: { slidesPerView: 2, spaceBetween: 10 },
          1024: { slidesPerView: 4, spaceBetween: 15 },
          1440: { slidesPerView: 6, spaceBetween: 20 },
        }}
      >
        {!loading &&
          movies &&
          movies.length > 0 &&
          movies.map((movie) => (
            <SwiperSlide key={movie._id}>
              <UpcomingCard Movie={movie} />
            </SwiperSlide>
          ))}
      </Swiper>

      {/* Left Arrow */}
      <button
        style={{ ...arrowStyle, left: "-40px" }}
        onClick={handlePrev}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-50%) scale(1.2)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
        }
      >
        <BsChevronLeft size={30} />
      </button>

      {/* Right Arrow */}
      <button
        style={{ ...arrowStyle, right: "-40px" }}
        onClick={handleNext}
        onMouseEnter={(e) =>
          (e.currentTarget.style.transform = "translateY(-50%) scale(1.2)")
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.transform = "translateY(-50%) scale(1)")
        }
      >
        <BsChevronRight size={30} />
      </button>

      
    </div>
  );
};

export default UpcomingCarousel;
