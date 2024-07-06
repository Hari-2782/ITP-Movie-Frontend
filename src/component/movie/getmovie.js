import React, { useEffect, useState } from 'react';
import { BsFillStarFill, BsShare } from 'react-icons/bs';
import { Link, useNavigate, useParams } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import CelebCard from '../utils/moviecard/celebcard';
import MovieCarousel from '../utils/moviecard/movieCarousel';

import './MoviPage.css';

const MoviePage = () => {
    const { movieId } = useParams();
    const [movie, setMovie] = useState(null);
   
    let navigate = useNavigate();
    // console.log(movieid);
    useEffect(() => {
        const getMovie = async () => {
            try {
                const res = await fetch(`https://itp-movie-backend.vercel.app/movie/get/${movieId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                
                const data = await res.json();
                if (data.ok) {
                    setMovie(data.data);
                }
            } catch (error) {
                console.log(error);
            }
        };
        getMovie();
    }, [movieId],);

    return (
        <>
            {
                
            movie && (
                <div className='moviepage'>
                  <div className='c1' style={{
                        backgroundImage: `url(${movie.landscapeImgUrl})`
                    }}>
                        <div className='c11'>
                            <div className='left'>
                                <div className='movie_poster'
                                    style={{
                                        backgroundImage: `url(${movie.portraitImgUrl})`
                                    }}
                                >
                                    <p>In cinemas</p>
                                </div>
                                <div className='movie_details'>
                                    <p className='title'>
                                        {movie.title}
                                    </p>
                                    <p className='rating'>
                                        <BsFillStarFill className='star' />&nbsp;&nbsp;
                                        {movie.rating}/10
                                    </p>
                                    <p className='duration_type_releasedat'>
                                        <span className='duration'>
                                            {movie.duration}mins
                                        </span>
                                        <span>•</span>
                                        <span className='type'>
                                            {movie.genre.join(', ')}
                                        </span>
                                        </p>
                                   
                                        <button className='bookbtn' onClick={() => {
                navigate(`/buy-ticket/${movieId}`);
              
            }}>Book Tickets</button>
                                  

                                </div>
                            </div>
                            <div className='right'>
                            <Link to="https://www.google.com/"  className='linkstylenone'>
                                <button className='sharebtn'><BsShare className='shareicon' />Share</button>
                                </Link>
                            </div>
                        </div>
                    </div>
                    <div className='c2'>
                        <h1>About the Movie</h1>
                        <p>{movie.description}</p>
                        {
                            movie.cast.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Cast</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                       movie.cast.map((castMember, index) => (
                                                <SwiperSlide key={index}>
                                                    <CelebCard {...castMember} />
                                                </SwiperSlide>
                                            )
                                        )
                                    }
                                </Swiper>
                            </div>
                        }
                        {
                            movie.crew.length>0 &&
                            <div className='circlecardslider'>
                                <div className='line'></div>

                                <h1>Crew</h1>
                                <Swiper
                                    slidesPerView={1}
                                    spaceBetween={1}
                                    pagination={{
                                        clickable: true,
                                    }}
                                    breakpoints={{
                                        '@0.00': {
                                            slidesPerView: 1,
                                            spaceBetween: 2,
                                        },
                                        '@0.75': {
                                            slidesPerView: 2,
                                            spaceBetween: 2,
                                        },
                                        '@1.00': {
                                            slidesPerView: 3,
                                            spaceBetween: 2,
                                        },
                                        '@1.50': {
                                            slidesPerView: 6,
                                            spaceBetween: 2,
                                        },
                                    }}
                                    modules={[Pagination]}
                                    className="mySwiper"
                                >
                                    {
                                        movie.crew.map((crewMember, index) => (
                                            
                                                <SwiperSlide key={index}>
                                                 <CelebCard {...crewMember} />
                                                </SwiperSlide>
                                            )
                                        )
                                    }
                                </Swiper>
                            </div>
                        }
                        <div className='line'>  </div>
                        
                        <h1>Your might also like</h1>
                        <MovieCarousel />
                      
                    </div>

                </div>
            )}
        </>
    );
};

export default MoviePage;
