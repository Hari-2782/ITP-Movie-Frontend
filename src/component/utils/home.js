import React, { useState, useEffect, useRef } from "react";
import MovieCarousel from "./moviecard/movieCarousel";
import UpcomingCarousel from "./moviecard/upComingCarousel";

// Updated anime + Hollywood movie data with high-quality images
const nowPlayingMovies = [
  {
    id: 1,
    title: "Demon Slayer",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1286/99889.jpg",
  },
  {
    id: 2,
    title: "Jujutsu Kaisen",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1171/109222.jpg",
  },
  {
    id: 3,
    title: "Avengers: Endgame",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/0/0d/Avengers_Endgame_poster.jpg",
  },
  {
    id: 4,
    title: "My Hero Academia",
    imageUrl: "https://cdn.myanimelist.net/images/anime/10/78745.jpg",
  },
  {
    id: 5,
    title: "Inception",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/7/7f/Inception_ver3.jpg",
  },
];

const upcomingMovies = [
  {
    id: 11,
    title: "Spider-Man: No Way Home",
    imageUrl:
      "https://upload.wikimedia.org/wikipedia/en/f/f9/Spider-Man_No_Way_Home_poster.jpg",
  },
  {
    id: 12,
    title: "Chainsaw Man",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1806/126216.jpg",
  },
  {
    id: 13,
    title: "Solo Leveling",
    imageUrl: "https://cdn.myanimelist.net/images/anime/1678/142926.jpg",
  },
];

const MovieCard = ({ title, imageUrl }) => {
  const cardRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.1 }
    );
    if (cardRef.current) observer.observe(cardRef.current);
    return () => {
      if (cardRef.current) observer.unobserve(cardRef.current);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        flexShrink: 0,
        width: "180px",
        overflow: "hidden",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.5)",
        cursor: "pointer",
        transform: visible ? "translateY(0)" : "translateY(20px)",
        opacity: visible ? 1 : 0,
        transition: "opacity 0.8s ease-out, transform 0.8s ease-out",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
      onMouseLeave={(e) =>
        (e.currentTarget.style.transform = visible
          ? "translateY(0) scale(1)"
          : "translateY(20px) scale(1)")
      }
    >
      <img
        src={imageUrl}
        alt={title}
        style={{ width: "100%", borderRadius: "12px", display: "block" }}
      />
    </div>
  );
};

const Carousel = ({ title, movies }) => {
  const scrollContainerRef = useRef(null);
  const scroll = (offset) => {
    if (scrollContainerRef.current)
      scrollContainerRef.current.scrollLeft += offset;
  };

  return (
    <div style={{ padding: "40px 0" }}>
      <h2
        style={{
          fontSize: "28px",
          fontWeight: "bold",
          color: "#dc2626",
          marginBottom: "24px",
        }}
      >
        {title}
      </h2>
      <div style={{ position: "relative" }}>
        <div
          ref={scrollContainerRef}
          style={{
            display: "flex",
            gap: "16px",
            overflowX: "auto",
            padding: "8px",
            scrollBehavior: "smooth",
            msOverflowStyle: "none",
            scrollbarWidth: "none",
          }}
        >
          {movies.map((m) => (
            <MovieCard key={m.id} {...m} />
          ))}
        </div>
        <button
          onClick={() => scroll(-200)}
          style={{
            position: "absolute",
            left: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            borderRadius: "0 8px 8px 0",
            padding: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          &lt;
        </button>
        <button
          onClick={() => scroll(200)}
          style={{
            position: "absolute",
            right: 0,
            top: "50%",
            transform: "translateY(-50%)",
            background: "rgba(0,0,0,0.6)",
            color: "white",
            borderRadius: "8px 0 0 8px",
            padding: "8px",
            border: "none",
            cursor: "pointer",
          }}
        >
          &gt;
        </button>
      </div>
      <style>{`div::-webkit-scrollbar { display: none; }`}</style>
    </div>
  );
};

const App = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const banners = [
    {
      img: "https://4kwallpapers.com/images/wallpapers/peacemaker-eagly-5120x2880-22805.jpg",
      text: "CineMagic: Feel the Thrill of Hollywood",
    },
    {
      img: "https://4kwallpapers.com/images/wallpapers/spider-man-no-way-home-doctor-strange-2021-movies-willem-4480x2520-6975.jpg",
      text: "CineMagic: Dive into Anime Worlds",
    },
    {
      img: "https://4kwallpapers.com/images/walls/thumbs_3t/17296.jpg",
      text: "CineMagic: Explore Mind-Bending Stories",
    },
    {
      img: "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/aAp0AkCBsMUDFCuLyd3MTcJ6ZV5.jpg",
      text: "CineMagic: Witness Epic Anime Battles",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBanner((prev) => (prev + 1) % banners.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div
      className="homeRoot"
      style={{
        background: "var(--bg)",
        color: "var(--text)",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
        overflowX: "hidden",
      }}
    >
      {/* Hero */}
      <section
        className="homeHero"
        style={{
          position: "relative",
          height: "70vh",
          overflow: "hidden",
          width: "100vw",
        }}
      >
        {banners.map((b, i) => (
          <img
            key={i}
            src={b.img}
            alt="banner"
            style={{
              position: "absolute",
              inset: 0,
              width: "100%",
              height: "100%",
              objectFit: "cover",
              objectPosition: "center", // keep top visible; crop bottom
              opacity: currentBanner === i ? 1 : 0,
              transition: "opacity 1.2s ease-in-out",
              transform: "scale(1.1)",
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            bottom: "120px",
            left: "50%",
            transform: "translateX(-50%)",
            textAlign: "center",
          }}
        >
          <h1
            className="homeHeroTitle"
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              textShadow: "2px 2px 10px var(--bg)",
              transition: "opacity 1s, transform 1s",
              opacity: 1,
              color: "var(--text)",
            }}
          >
            {banners[currentBanner].text}
          </h1>
        </div>
        <div
          className="homeHeroCta"
          style={{
            position: "absolute",
            bottom: "40px",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          <button
            style={{
              padding: "12px 32px",
              background: "var(--accent)",
              border: "none",
              borderRadius: "9999px",
              color: "#fff",
              fontWeight: "600",
              fontSize: "16px",
              cursor: "pointer",
            }}
          >
            🎟 Book Tickets
          </button>
        </div>
      </section>

      {/* Now Showing + Coming Soon */}
      <main className="homeMain" style={{ padding: "0 40px" }}>
        <div style={{ padding: "40px 0" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "var(--accent)",
              marginBottom: "24px",
            }}
          >
            Now Showing
          </h2>
          <MovieCarousel />
        </div>
        <div style={{ padding: "40px 0" }}>
          <h2
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              color: "var(--accent)",
              marginBottom: "24px",
            }}
          >
            Coming Soon
          </h2>
          <UpcomingCarousel />
        </div>
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "var(--bg)",
          textAlign: "center",
          padding: "20px",
          marginTop: "40px",
          color: "var(--muted)",
        }}
      >
        <p>© {new Date().getFullYear()} CineMagic. All rights reserved.</p>
      </footer>
      <style>{`
        @media (max-width: 768px) {
          .homeHero { height: 60vh !important; }
          .homeHeroTitle { font-size: 22px !important; padding: 0 12px; }
          .homeHeroCta button { padding: 10px 20px !important; font-size: 14px !important; }
          .homeMain { padding: 0 16px !important; }
          /* Narrower cards in carousels */
          .homeMain [style*='overflow-x: auto'] > div { width: 140px !important; }
          /* Hide scroll arrows on mobile */
          .homeMain button { display: none !important; }
        }
      `}</style>
    </div>
  );
};

export default App;
