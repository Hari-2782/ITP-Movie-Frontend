import React, { useState } from "react";

const CelebCard = ({ name, image, role }) => {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    width: 180,
    display: "flex",
    flexDirection: "column",
    gap: 8,
    padding: 10,
    borderRadius: 12,
    backgroundColor: "#0f0f0f",
    border: `1px solid ${hovered ? "#e50914" : "rgba(229,9,20,0.25)"}`,
    boxShadow: hovered
      ? "0 8px 20px rgba(229,9,20,0.25)"
      : "0 2px 8px rgba(0,0,0,0.4)",
    transition: "transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease",
    transform: hovered ? "translateY(-2px)" : "translateY(0)",
    cursor: "pointer",
  };

  const imageWrapStyle = {
    width: "100%",
    height: 220,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "#1a1a1a",
    border: `1px solid ${hovered ? "rgba(229,9,20,0.5)" : "rgba(255,255,255,0.06)"}`,
  };

  const imageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    display: "block",
    transition: "transform 0.3s ease",
    transform: hovered ? "scale(1.04)" : "scale(1)",
  };

  const nameStyle = {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: 700,
    textAlign: "left",
    width: "100%",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    margin: "2px 0 0",
  };

  const roleStyle = {
    color: "#bdbdbd",
    fontSize: 12,
    fontWeight: 400,
    textAlign: "left",
    width: "100%",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
    textOverflow: "ellipsis",
    lineHeight: 1.3,
    margin: 0,
  };

  const placeholder = "https://via.placeholder.com/300x450?text=No+Image";

  return (
    <div
      className="celebcard"
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={name}
    >
      <div style={imageWrapStyle}>
        <img
          src={image || placeholder}
          alt={name}
          style={imageStyle}
          onError={(e) => {
            if (e.currentTarget.src !== placeholder) {
              e.currentTarget.src = placeholder;
            }
          }}
        />
      </div>
      <h3 style={nameStyle}>{name}</h3>
      {role ? <h4 style={roleStyle}>{role}</h4> : null}
    </div>
  );
};

export default CelebCard;
