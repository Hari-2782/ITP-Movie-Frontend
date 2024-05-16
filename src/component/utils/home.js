import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import MovieCarousel from './moviecard/movieCarousel';
import "./home.css";
import UpcomingCarousel from './moviecard/upComingCarousel';
const HomeSlider = () => {

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const [banners] = useState([
        {
            imgUrl: 'https://image.tmdb.org/t/p/original/j3Z3XktmWB1VhsS8iXNcrR86PXi.jpg'
        },
        {
            imgUrl: 'https://image.tmdb.org/t/p/original/rx9kyO6YJLpXfFrU934C6i4yYMj.jpg'
        },
        {
            imgUrl: 'https://image.tmdb.org/t/p/original/aOSDKvqglKVa3SYy4CPXYUAfDlf.jpg' // https://image.tmdb.org/t/p/original/sctaugGZjp7pnBEYKp9Z6pCBpsA.jpg
        },
        {
            imgUrl: 'https://image.tmdb.org/t/p/original/gDyLcjvmdAhmYqjCMwZ9PndnAVm.jpg'
        },
        {
            imgUrl: 'https://image.tmdb.org/t/p/original/7RyHsO4yDXtBv1zUU3mTpHeQ0d5.jpg'
        }
    ]);

    const handleResize = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };

    useEffect(() => {
        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <div>
            <Swiper
                spaceBetween={10}
                centeredSlides={true}
               
                autoplay={{
                    delay: 11500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                    dynamicBullets: true
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                {banners.map((banner, index) => (
                    <SwiperSlide key={index} className='my'>
                        <img
                            src={banner.imgUrl}
                            alt=""
                            width={width}
                            height={height}
                            style={{
                                objectFit: 'cover',
                            }}
                        />
                    </SwiperSlide>
                ))}
            </Swiper>
         
                <h1>Now showing</h1>
             <div className='row'>
                <MovieCarousel />
            </div>
            <div>
                <h1>Upcoming showing</h1>
            <UpcomingCarousel/>
            </div>
            
        </div>
    );
};

export default HomeSlider;
