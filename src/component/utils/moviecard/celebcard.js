import React, { useState } from 'react';

const CelebCard = ({ name, image, role }) => {
  const [hovered, setHovered] = useState(false);

  const cardStyle = {
    width: 160,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 8,
    padding: 6,
    boxSizing: 'border-box',
  };

  const imageWrapStyle = {
    width: 140,
    height: 140,
    borderRadius: '50%',
    overflow: 'hidden',
    border: `2px solid ${hovered ? '#e50914' : 'rgba(229,9,20,0.35)'}`,
    boxShadow: hovered ? '0 6px 16px rgba(0,0,0,0.5)' : '0 2px 8px rgba(0,0,0,0.4)',
    transition: 'transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease',
    transform: hovered ? 'scale(1.04)' : 'scale(1.0)',
    backgroundColor: '#0b0b0b',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    display: 'block',
  };

  const nameStyle = {
    color: '#ffffff',
    fontSize: 14,
    fontWeight: 700,
    textAlign: 'center',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  const roleStyle = {
    color: '#a3a3a3',
    fontSize: 12,
    fontWeight: 500,
    textAlign: 'center',
    width: '100%',
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  };

  return (
    <div
      className='celebcard'
      style={cardStyle}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      title={name}
    >
      <div style={imageWrapStyle}>
        <img src={image} alt={name} style={imageStyle} />
      </div>
      <h3 style={nameStyle}>{name}</h3>
      {role && <h4 style={roleStyle}>{role}</h4>}
    </div>
  );
};

export default CelebCard;
