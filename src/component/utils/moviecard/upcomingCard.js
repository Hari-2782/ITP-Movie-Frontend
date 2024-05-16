import React from 'react';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const UpcomingCard = ({ Movie }) => {
    const { title,  portraitImgUrl } = Movie;
    
    let navigate = useNavigate();
    return (
        <div
            className='moviecard'
            onClick={() => {
                navigate(`/`);
              
            }}
        >
            <div
                className='movieimg'
                style={{
                    backgroundImage: `url(${portraitImgUrl})`
                }}
            >
               
            </div>
            <div className='details'>
                <p className='title'>{title}</p>
            </div>
        </div>
    );
};

export default UpcomingCard;
