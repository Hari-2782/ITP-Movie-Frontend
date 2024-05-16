import React, { useEffect, useState } from 'react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
// import { BsFillStarFill } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import './offer.css';

const OfferPage = () => {
    const [offers, setOffer] = useState([]);

    const getoffer = async () => {
        fetch(`http://localhost:8000/offer/getall`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
        .then((res) => res.json())
        .then((data) => {
            if (data.ok) {
                setOffer(data.data);
            }
        })
        .catch((err) => {
            console.log(err);
        });
    };

    useEffect(() => {
        getoffer();
    }, []);

    let navigate = useNavigate();

    return (
        <div className='sliderout'>
            {offers && (
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
                    {offers.map((offer) => (
                        <SwiperSlide key={offer._id}>
                            <div
                                className='moviecard'
                                onClick={() => {
                                    navigate(`/payment/${offer._id}`);
                                }}
                            >
                                <div
                                    className='movieimg'
                                    style={{
                                        backgroundImage: `url(${offer.image})`
                                    }}
                                >
                                    
                                </div>
                                <div className='details'>
                                    <p className='title'>{offer.name}</p>
                                    <p className='type'>{offer.description}</p>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    );
};

export default OfferPage;
