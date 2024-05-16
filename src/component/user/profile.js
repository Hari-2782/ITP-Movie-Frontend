import React, { useEffect, useState } from 'react';
import './ProfilePage.css';

const ProfilePage = () => {
    const [bookings, setBookings] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getBookings = async () => {
            try {
                const response = await fetch("http://localhost:8000/booking/userboooking", {
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
                const response = await fetch("http://localhost:8000/user/getuser", {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include'
                });
                const data = await response.json();
                if (data.ok) {
                    setUser(data.data);
                } else {
                    console.log('Error fetching user data:', data);
                }
            } catch (error) {
                console.error('Error fetching user data:', error);
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
