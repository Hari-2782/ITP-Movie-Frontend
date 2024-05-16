import React from 'react';

const CelebCard = ({ name, image, role }) => {
  const cardStyle = {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginBottom: 40,
  };

  const imageStyle = {
    width: '150px', // Set a fixed width for circle
    height: '150px', // Set a fixed height for circle
    objectFit: 'cover', // Or 'contain' to maintain aspect ratio
    borderRadius: '50%',
  };
  const headingStyle = {
    color: 'black',
    fontSize: '15px', // Adjust font size as needed
    fontWeight: 600,
  };
  
  const subheadingStyle = {
    color: 'grey',
    fontSize: '13px', // Adjust font size as needed
    fontWeight: 400,
  };
  
 
  return (
    <div className='celebcard' style={cardStyle}>
      <img src={image} alt={name} style={imageStyle} />
      <h3 style={headingStyle}>{name}</h3>
    <h4 style={subheadingStyle}>{role}</h4>
    </div>
  );
};

export default CelebCard;
