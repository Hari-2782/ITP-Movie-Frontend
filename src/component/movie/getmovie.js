import React, { useEffect, useState } from "react";
import {
  BsShare,
  BsStarFill,
  BsStarHalf,
  BsStar,
  BsFacebook,
  BsTwitter,
  BsInstagram,
  BsLink45Deg,
} from "react-icons/bs";
import { Link, useNavigate, useParams } from "react-router-dom";
import CelebCard from "../utils/moviecard/celebcard";
import MovieCarousel from "../utils/moviecard/movieCarousel";
import "./getmovie.css";

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
          backgroundColor: "var(--bg)",
        }}
      >
        {/* Netflix C loader */}
        <div
          style={{
            width: "60px",
            height: "60px",
            border: "6px solid var(--accent)",
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
          color: "var(--text)",
          backgroundColor: "var(--bg)",
        }}
      >
        Movie not found
      </div>
    );

  // Row styles migrated to CSS classes.

  // Render stars for IMDb style (rating is out of 10)
  const renderStars = (rating10) => {
    if (typeof rating10 !== "number") return null;
    const rating5 = Math.max(0, Math.min(5, rating10 / 2));
    const full = Math.floor(rating5);
    const half = rating5 - full >= 0.5 ? 1 : 0;
    const empty = 5 - full - half;
    const stars = [];
    for (let i = 0; i < full; i++)
      stars.push(<BsStarFill key={`f${i}`} color="#f5c518" />);
    if (half) stars.push(<BsStarHalf key="h" color="#f5c518" />);
    for (let i = 0; i < empty; i++)
      stars.push(<BsStar key={`e${i}`} color="#f5c518" />);
    return (
      <div style={{ display: "flex", gap: 2, alignItems: "center" }}>
        {stars}
      </div>
    );
  };

  // Build cast list: show API cast if present; else show exactly one empty placeholder card
  const castFiltered = Array.isArray(movie.cast)
    ? movie.cast.filter((c) => c && c.name)
    : [];
  const castDisplay =
    castFiltered.length > 0
      ? castFiltered
      : [{ name: "", image: "", role: "" }];

  return (
    <div className="moviePage">
      {/* Hero */}
      <div
        className="hero"
        style={{ backgroundImage: `url(${movie.landscapeImgUrl})` }}
      >
        {/* Gradient overlay */}
        <div className="heroOverlay" />
        <div className="heroGrid">
          {/* Poster */}
          <div className="posterWrap">
            <img
              className="posterImg"
              src={movie.portraitImgUrl}
              alt={movie.title}
            />
          </div>

          {/* Details */}
          <div className="details">
            <h1 className="title">{movie.title}</h1>
            <div className="subline">
              <span style={{ marginRight: 12 }}>{movie.duration} mins</span>
            </div>
            {(() => {
              const genres = Array.isArray(movie.genre)
                ? movie.genre
                : typeof movie.genre === "string"
                ? movie.genre
                    .split(",")
                    .map((g) => g.trim())
                    .filter(Boolean)
                : [];
              return genres.length ? (
                <div className="genre-chips">
                  {genres.map((g, i) => (
                    <span key={i} className="genre-chip">
                      {g}
                    </span>
                  ))}
                </div>
              ) : null;
            })()}

            {/* Meta and actions */}
            <div className="metaRow">
              {/* Rating column: User Score (circle) with IMDb underneath */}
              {typeof movie.rating === "number" && (
                <div className="rating-column">
                  {/* User Score circle based on rating */}
                  {(() => {
                    const pct = Math.round(
                      Math.min(Math.max(movie.rating * 10, 0), 100)
                    );
                    const circleStyle = {
                      width: 54,
                      height: 54,
                      borderRadius: "50%",
                      background: `conic-gradient(#21d07a ${pct *
                        3.6}deg, #23443b 0)`,
                      display: "grid",
                      placeItems: "center",
                      boxShadow: "0 2px 8px rgba(0,0,0,0.4)",
                    };
                    const innerStyle = {
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: "var(--bg-elev)",
                      color: "var(--text)",
                      display: "grid",
                      placeItems: "center",
                      fontSize: 12,
                      fontWeight: 700,
                    };
                    return (
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 10,
                        }}
                      >
                        <div style={circleStyle}>
                          <div style={innerStyle}>{pct}%</div>
                        </div>
                        <div style={{ fontWeight: 700 }}>User Score</div>
                      </div>
                    );
                  })()}
                  {/* IMDb rating (stars + badge) underneath */}
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 10 }}
                  >
                    {renderStars(movie.rating)}
                    <div
                      style={{
                        background: "#f5c518",
                        color: "#000",
                        fontWeight: 800,
                        padding: "2px 6px",
                        borderRadius: 4,
                        lineHeight: 1,
                        fontSize: 12,
                      }}
                      title={`IMDb ${movie.rating}/10`}
                    >
                      IMDb {movie.rating}/10
                    </div>
                  </div>
                </div>
              )}

              {/* Book tickets */}
              <button
                className="bookBtn"
                onClick={() => navigate(`/buy-ticket/${movieId}`)}
              >
                Book Tickets
              </button>

              {/* Share */}
              <Link to="#" style={{ textDecoration: "none" }}>
                <button className="shareBtn">
                  <BsShare /> Share
                </button>
              </Link>
            </div>

            {/* Overview */}
            {movie.description && (
              <div style={{ marginTop: 20 }}>
                <h3 className="sectionHeading">Overview</h3>
                <p className="overviewText">{movie.description}</p>
              </div>
            )}

            {/* Featured Crew (first up to 6) */}
            {Array.isArray(movie.crew) &&
              movie.crew.filter((m) => m && m.name).length > 0 && (
                <div className="crewGrid">
                  {movie.crew
                    .filter((m) => m && m.name)
                    .slice(0, 6)
                    .map((m, idx) => (
                      <div key={idx}>
                        <div style={{ fontWeight: 700, color: "var(--text)" }}>{m.name}</div>
                        <div style={{ color: "var(--muted)", fontSize: 14 }}>
                          {m.role || ""}
                        </div>
                      </div>
                    ))}
                </div>
              )}
          </div>
        </div>
      </div>

      {/* Cast + Right Info Panel */}
      <div className="rowSection">
        <h2 className="rowTitle">Top Billed Cast</h2>
        <div className="castGrid">
          {/* Left: scroller with placeholders */}
          <div className="castScroller">
            {castDisplay.map((c, i) => (
              <div key={i} className="castItem">
                <CelebCard {...c} />
              </div>
            ))}
          </div>

          {/* Right: info panel */}
          <aside className="rightPanel">
            {/* Watch/CTA placeholder to match layout spacing */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                background: "var(--bg-elev)",
                border: "1px solid rgba(0,0,0,0.12)",
                padding: "8px 12px",
                borderRadius: 8,
                marginBottom: 12,
                fontWeight: 700,
              }}
            >
              <span
                style={{
                  background: "#2aa6df",
                  color: "#fff",
                  borderRadius: 8,
                  padding: "6px 10px",
                }}
              >
                Watch Now
              </span>
              <span style={{ color: "var(--muted)", fontSize: 12 }}>
                Surface on Apple TV+
              </span>
            </div>

            {/* Social icons */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: 12,
                padding: "6px 0",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
                marginBottom: 12,
              }}
            >
              <BsFacebook size={20} />
              <BsTwitter size={20} />
              <BsInstagram size={20} />
              <BsLink45Deg size={22} />
            </div>

            {/* Info items */}
            <div style={{ display: "grid", gap: 14 }}>
              <div>
                <div style={{ color: "var(--muted)", fontWeight: 700 }}>Status</div>
                <div style={{ color: "var(--text)" }}>{movie.status || "-"}</div>
              </div>
              <div>
                <div style={{ color: "var(--muted)", fontWeight: 700 }}>
                  Original Language
                </div>
                <div style={{ color: "var(--text)" }}>
                  {movie.language || movie.originalLanguage || "-"}
                </div>
              </div>
              <div>
                <div style={{ color: "var(--muted)", fontWeight: 700 }}>Budget</div>
                <div style={{ color: "var(--text)" }}>
                  {movie.budget ? `$${movie.budget.toLocaleString()}` : "-"}
                </div>
              </div>
              <div>
                <div style={{ color: "var(--muted)", fontWeight: 700 }}>Revenue</div>
                <div style={{ color: "var(--text)" }}>
                  {movie.revenue ? `$${movie.revenue.toLocaleString()}` : "-"}
                </div>
              </div>
            </div>
          </aside>
        </div>

        {/* Divider and link below */}
        <div className="divider" />
        <div className="linkText">Full Cast & Crew</div>
      </div>

      {/* Crew */}
      {movie.crew.length > 0 && (
        <div className="crewSection">
          <h2 className="rowTitle">Crew</h2>
          <div className="castScroller">
            {movie.crew.map((c, i) => (
              <div key={i} className="castItem">
                <CelebCard {...c} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* You might also like */}
      <div className="recommendSection">
        <h2 className="rowTitle">You might also like</h2>
        <MovieCarousel />
      </div>
    </div>
  );
};

export default MoviePage;
