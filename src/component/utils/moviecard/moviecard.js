import React from 'react';
import { BsFillStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './MovieCard.css';

const MovieCard = ({ Movie }) => {
    const { _id, title, genre, rating, portraitImgUrl } = Movie;
    
    let navigate = useNavigate();
    return (
        <div
            className='moviecard'
            onClick={() => {
                navigate(`/movies/${Movie._id}`);
              
            }}
        >
            <div
                className='movieimg'
                style={{
                    backgroundImage: `url(${portraitImgUrl})`
                }}
            >
                <p className='rating'>
    <span className='rating-label'>IMDB</span>
    <BsFillStarFill className='star' />&nbsp;&nbsp;
    {rating}/10
</p>

            </div>
            <div className='details'>
                <p className='title'>{title}</p>
                <p className='type'>{genre.join(', ')}</p>
            </div>
        </div>
    );
};

export default MovieCard;
