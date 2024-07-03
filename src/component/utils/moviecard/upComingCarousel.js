import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import UpcomingCard from './upcomingCard';

const UpcomingCarousel = () => {
    // const [user, setUser] = useState(null);
    const [movies, setMovies] = useState([]);

    const getMovies = async () => {
        fetch(`https://itp-movie-backend-me632rlg9-haris-projects-18861f06.vercel.app/up/getall`, {
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
                    {movies.map((Movie) => (
                        <SwiperSlide key={Movie._id} >
                            <UpcomingCard
                                Movie={Movie}
                                
                            />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default UpcomingCarousel;
