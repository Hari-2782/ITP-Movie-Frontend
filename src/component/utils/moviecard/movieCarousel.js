import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import MovieCard from './moviecard';

const MovieCarousel = () => {
    // const [user, setUser] = useState(null);
    const [movies, setMovies] = useState([]);

    // const getuser = async () => {
    //     fetch(`http://localhost:8000/auth/getuser`, {
    //         method: 'GET',
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //         credentials: 'include'
    //     })
    //     .then((res) => res.json())
    //     .then((response) => {
    //         if (response.ok) {
    //             setUser(response.data);
    //         } else {
    //             window.location.href = "/auth/signin";
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    // }

    const getMovies = async () => {
        fetch(`https://itp-movie-backend.vercel.app/movie/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.ok) {
                setMovies(data.data);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getMovies();
        // getuser();
    }, []);

    return (
        <div className='sliderout'>
            {movies &&  (
                <Swiper
                    slidesPerView={3}
                    spaceBetween={10}
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
                    {movies.map((movie) => (
                        <SwiperSlide key={movie._id} >
                            <MovieCard
                                movie={movie}
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default MovieCarousel;
