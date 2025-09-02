import React, { useState, useEffect, useRef } from "react";

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
      img:
        "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/pj1wFbZF3gpEg7F0EreXTvZNZTG.jpg",
      text: "CineMagic: Feel the Thrill of Hollywood",
    },
    {
      img: "https://4kwallpapers.com/images/walls/thumbs_3t/22621.jpg",
      text: "CineMagic: Dive into Anime Worlds",
    },
    {
      img:
        "https://media.themoviedb.org/t/p/w1066_and_h600_bestv2/iux1vKPT7Vw1AzetZb4Jz6wfYsm.jpg",
      text: "CineMagic: Explore Mind-Bending Stories",
    },
    {
      img: "https://4kwallpapers.com/images/walls/thumbs_3t/23673.jpg",
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
      style={{
        background: "#0f172a",
        color: "white",
        minHeight: "100vh",
        fontFamily: "Arial, sans-serif",
      }}
    >
      {/* Hero */}
      <section
        style={{ position: "relative", height: "90vh", overflow: "hidden" }}
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
            style={{
              fontSize: "40px",
              fontWeight: "bold",
              textShadow: "2px 2px 10px black",
              transition: "opacity 1s, transform 1s",
              opacity: 1,
            }}
          >
            {banners[currentBanner].text}
          </h1>
        </div>
        <div
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
              background: "#dc2626",
              border: "none",
              borderRadius: "9999px",
              color: "white",
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
      <main style={{ padding: "0 40px" }}>
        <Carousel title="Now Showing" movies={nowPlayingMovies} />
        <Carousel title="Coming Soon" movies={upcomingMovies} />
      </main>

      {/* Footer */}
      <footer
        style={{
          background: "#111827",
          textAlign: "center",
          padding: "20px",
          marginTop: "40px",
          color: "#9ca3af",
        }}
      >
        <p>© {new Date().getFullYear()} CineMagic. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default App;
