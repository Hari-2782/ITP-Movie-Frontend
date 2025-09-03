import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllMovies } from "../../api/movies";
import { BsFillStarFill } from "react-icons/bs";

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const getMovies = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await getAllMovies();
      const payload = res?.data;
      if (payload?.ok) setMovies(payload.data || []);
      else setError(payload?.message || "Failed to load movies");
    } catch (e) {
      setError("Failed to load movies");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getMovies();
  }, []);

  const loaderCardStyle = {
    width: "180px",
    height: "300px",
    borderRadius: "8px",
    background: "linear-gradient(90deg, #b30000 25%, #ff1a1a 50%, #b30000 75%)",
    backgroundSize: "200% 100%",
    animation: "pulseRed 1.5s infinite",
  };

  return (
    <div style={{ padding: "30px 40px", paddingTop: "110px", minHeight: "100vh", boxSizing: "border-box" }}>
      <h2
        style={{ margin: "10px 0 20px", color: "#e50914" }}
      >
        Movies
      </h2>

      {loading && (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", gap: 20 }}>
          {[...Array(8)].map((_, i) => (
            <div key={i} style={loaderCardStyle} />
          ))}
        </div>
      )}

      {!loading && error && (
        <div style={{ textAlign: "center", padding: "40px", color: "#f87171" }}>
          {error}
        </div>
      )}

      {!loading && !error && movies.length > 0 && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: 20,
            alignItems: "start",
          }}
        >
          {movies.map((m) => (
            <div
              key={m._id}
              style={{
                cursor: "pointer",
                border: "none",
                borderRadius: 10,
                overflow: "hidden",
                backgroundColor: "#111",
                position: "relative",
              }}
              onClick={() => navigate(`/movies/${m._id}`)}
            >
              {/* Corner badge to cover top-left border and show 'C' logo */}
              <div
                style={{
                  position: "absolute",
                  top: 6,
                  left: 6,
                  width: 30,
                  height: 30,
                  borderRadius: "50%",
                  backgroundColor: "#e50914",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: 800,
                  fontSize: 14,
                  zIndex: 2,
                  boxShadow: "0 0 0 2px #111",
                }}
                title="Certified"
              >
                C
              </div>
              <div style={{ width: "100%", height: 270 }}>
                <img
                  src={m.portraitImgUrl}
                  alt={m.title}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
              <div style={{ padding: "8px 10px", backgroundColor: "rgba(229, 9, 20, 0.06)" }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 700,
                    color: "#ffffff",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                  }}
                  title={m.title}
                >
                  {m.title}
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 6, marginTop: 6 }}>
                  <BsFillStarFill style={{ color: "#FFD700" }} />
                  <span style={{ fontSize: 12, color: "#ffffff" }}>
                    {m.rating ? `${m.rating}/10` : "NR"}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MoviesPage;
