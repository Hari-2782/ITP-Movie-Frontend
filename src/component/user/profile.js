import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(null);
    const [offerTypes, setOfferTypes] = useState([]);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const response = await fetch("https://itp-movie-backend.vercel.app/booking/userboooking", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.success) {
                    setBookings(data.data);
                } else {
                    console.log('Error fetching bookings:', data);
                }
            } catch (error) {
                console.error('Error fetching bookings:', error);
            }
        };

        const getUserData = async () => {
            try {
                const response = await fetch("https://itp-movie-backend.vercel.app/user/getuser", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.ok) {
                    setUser(data.data);
                    fetchOfferTypes(data.data.offer);
                } else {
                    console.log('Error fetching user data:', data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        const fetchOfferTypes = async (offerIds) => {
            try {
                const types = await Promise.all(offerIds.map(async (offerId) => {
                    const response = await fetch(`https://itp-movie-backend.vercel.app/offer/get/${offerId}`, {
                        method: 'GET',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        credentials: 'include'
                    });
                    const data = await response.json();
                    if (data.success) {
                        return data.data.type; // Ensure the correct path to the type
                    }
                    return null;
                }));
                setOfferTypes(types.filter(type => (type !== null && (type === "package" || type === "premium"))));

            } catch (error) {
                console.error('Error fetching offer types:', error);
            }
        };

        getBookings();
        getUserData();
    }, []);

    return (
        <div className='profile'>
            <h1 className='head'>Profile</h1>
            <div className='user'>
                <h2>User Details</h2>
                <div className='details'>
                    <div className='detail'>
                        <h3>Name</h3>
                        <p>{user?.name}</p>
                    </div>
                    <div className='detail'>
                        <h3>Email</h3>
                        <p>{user?.email}</p>
                    </div>
                    <div className='detail'>
                        <h3>Loyalty Points</h3>
                        <p>{user?.loyaltyPoints}</p>
                    </div>
                    <div className='detail'>
                        <h3>Purchase Package</h3>
                        {offerTypes.length > 0 ? (
                            offerTypes.map((type, index) => (
                                <p key={index}>{type}</p>
                            ))
                        ) : (
                            <p>No offers available</p>
                        )}
                    </div>
                </div>
            </div>
            <div className='bookings'>
                <h2>Bookings</h2>
                <div className='details'>
                    {bookings.filter(booking => booking !== null).map((booking) => (
                        <div className='booking' key={booking._id}>
                            <div className='detail'>
                                <h3>MovieId</h3>
                                <p>{booking.movieId}</p>
                            </div>
                            <div className='detail'>
                                <h3>Screen</h3>
                                <p>{booking.screenId}</p>
                            </div>
                            <div className='detail'>
                                <h3>Seats</h3>
                                <p>{booking.seats.map((seat) => seat.seat_id).join(', ')}</p>
                            </div>
                            <div className='detail'>
                                <h3>Price</h3>
                                <p>{booking.totalPrice}</p>
                            </div>
                            <div className='detail'>
                                <h3>Show Date</h3>
                                <p>{booking.showDate}</p>
                            </div>
                            <div className='detail'>
                                <h3>Show Time</h3>
                                <p>{booking.showTime}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
