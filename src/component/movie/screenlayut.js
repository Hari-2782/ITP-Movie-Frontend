import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import './SelectSeat.css';
import exit from "../utils/asset/exit.png"
const SelectSeatPage = () => {
    
    const params = useParams()
    const searchParams = useSearchParams()
    // const date = searchParams.get('date')
    const { movieid,screenid,date } = params
    console.log(movieid, screenid)


    const [Screen, setScreen] = React.useState(null);
    const [selectedTime, setSelectedTime] = React.useState(null);

    const [isLoggedIn, setIsLoggedIn] = React.useState(false)
    const getschedules = async () => {
        try {
            const response = await fetch(`https://itp-movie-backend.vercel.app/screen/schedulebymovie/${screenid}/${date}/${movieid}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
    
            if (response.ok) {
                const data = await response.json();
                console.log('screen', data);
    
                // Check if data contains movieSchedulesforDate
                if (data && data.data && data.data.movieSchedulesforDate && data.data.movieSchedulesforDate.length > 0) {
                    console.log('screen',data.data)
                    setScreen(data.data);
                    setSelectedTime(data.data.movieSchedulesforDate[0]);
                } else {
                    console.log('No movie schedules available');
                }
            } else {
                console.log('else', response);
            }
        } catch (err) {
            console.log(err);
        }
    };
    const [movie, setMovie] = React.useState(null)

    const getMovie = async () => {
        fetch(`https://itp-movie-backend.vercel.app/movie/get/${movieid}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include'
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.ok) {
                    console.log('movie', data.data)
                    setMovie(data.data)
                }
            })
            .catch((err) => {
                console.log(err)
            })
    }
    const checkLogin = async () => {
        try {
            const res = await fetch('https://itp-movie-backend.vercel.app/user/checklogin', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include'
            });
    
            if (res.ok) {
                setIsLoggedIn(true);
                console.log('true')
            } else {
                setIsLoggedIn(false);
                console.log('false')
            }
        } catch (error) {
            console.log(error);
            setIsLoggedIn(false);
        }
    };
    

    React.useEffect(() => {
        getschedules()
        getMovie()
        checkLogin()
    }, [])
    console.log('hi')
    // const [selectedSeats, setSelectedSeats] = React.useState<any[]>([]);
    // const [notAvailableSeats, setNotAvailableSeats] = React.useState<any[]>([]);
    const [selectedSeats, setSelectedSeats] = React.useState([])




    const selectdeselectseat = (seat) => {
        console.log(seat)
        // {
        //     "row": "F",
        //     "col": 1,
        //     "seat_id": "6",
        //     "price": 500
        // }
        const isselected = selectedSeats.find((s) => (
            s.row === seat.row &&
            s.col === seat.col &&
            s.seat_id === seat.seat_id
        ))

        if (isselected) {
            setSelectedSeats(selectedSeats.filter((s) => (
                s.row !== seat.row ||
                s.col !== seat.col ||
                s.seat_id !== seat.seat_id
            )))
        }

        else {
            setSelectedSeats([...selectedSeats, seat])
        }
    }


    const generateSeatLayout = () => {
        const x = Screen.movieSchedulesforDate.findIndex((t) => t.showTime === selectedTime.showTime)
     
        let notavailableseats = Screen.movieSchedulesforDate[x].notAvailableSeats


        return (
            <div>
                   
                {Screen.Screen.seats.map((seatType, index) => (
                    <div className="seat-type" key={index}>
                        <h2>{seatType.type} - Rs. {seatType.price}</h2>
                        <div className='seat-rows'>
                            {seatType.rows.map((row, rowIndex) => (
                                <div className="seat-row" key={rowIndex}>
                                    <p className="rowname">{row.rowname}</p>
                                    <div className="seat-cols">
                                        {row.cols.map((col, colIndex) => (


                                            <div className="seat-col" key={colIndex}>
                                                {col.seats.map((seat, seatIndex) => (
                                                    // console.log(seat),

                                                    <div key={seatIndex}>
                                                        {
                                                            notavailableseats.find((s) => (
                                                                s.row == row.rowname&&
                                                                s.seat_id == seat.seat_id &&
                                                                s.col == colIndex
                                                            )) ?
                                                                <span className='seat-unavailable'>
                                                                    {seatIndex + 1}
                                                                </span>
                                                                :
                                                                <span className={
                                                                    selectedSeats.find((s) => (
                                                                        s.row === row.rowname &&
                                                                        s.seat_id === seat.seat_id &&
                                                                        s.col === colIndex
                                                                    )) ? "seat-selected" : "seat-available"
                                                                }
                                                                    onClick={() => selectdeselectseat({
                                                                        row: row.rowname,
                                                                        col: colIndex,
                                                                        seat_id: seat.seat_id,
                                                                        price: seatType.price
                                                                    })}
                                                                >
                                                                    {seatIndex + 1}
                                                                </span>

                                                        }
                                                    </div>
                                                   
                                                ))}
                                            </div>
                                        ))}
                                    </div>
                                    <br /> <br /> <br />
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        );
    };
    
 
    const handleBooking = () => {
        const total = selectedSeats.reduce((acc, seat) => acc + seat.price, 0);
        if (total === 0) {
            toast.error('Please select at least one seat.');
        } 
        else{
        if (isLoggedIn) {
            fetch(`https://itp-movie-backend.vercel.app/booking/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify({
                    showTime: selectedTime.showTime,
                    showDate: date,
                    movieId: movieid,
                    screenId: screenid,
                    seats: selectedSeats,
                    totalPrice: selectedSeats.reduce((acc, seat) => acc + seat.price, 0),
                })
            })
            .then(res => res.json())
            .then(response => {
                if (response.ok) {
                    toast.success('Booking Successful');
                    const bookingId = response.bookingId;
                    if (bookingId) {
                        console.log('Booking ID:', bookingId);
                        window.location.href =`/food/${bookingId}`;
                    } else {
                        console.log('Booking ID not found in response');
                    }
                }
                else {
                    console.log(response);
                }
            })
            .catch(err => console.log(err));
        } else {
            window.location.href = "/login";
        }
    }
}
    
    return (
        <div className='selectseatpage'>
            {
                movie && Screen &&
                <div className='s1'>
                    <div className='head'>
                        <h1>{movie.title} - {Screen?.Screen?.name}</h1>
                        <h3>{movie.genre.join(" / ")}</h3>
                    </div>
                </div>
            }

            {
                Screen &&
                <div className="selectseat">
                    <div className='timecont'>
                        {
                            Screen.movieSchedulesforDate.map((time, index) => (
                                <h3 className={selectedTime?._id === time._id ? 'time selected' : 'time'}
                                    onClick={() => {
                                        setSelectedTime(time)
                                        setSelectedSeats([])
                                    }} key={index}>
                                    {time.showTime}Am
                                </h3>
                            ))
                        }
                    </div>
                    <div className='indicators'>
                        <div>
                            <span className='seat-unavailable'></span>
                            <p>Not available</p>
                        </div>
                        <div>
                            <span className='seat-available'></span>
                            <p>Available</p>
                        </div>
                        <div>
                            <span className='seat-selected'></span>
                            <p>Selected</p>
                        </div>
                    </div>
                    <image src={exit}/>
                    {generateSeatLayout()}
                    <div class="banner">
                  <h1>SCREEN</h1>
                  </div>
                    <div className="half-circle"></div>
                    <div className='totalcont'>
                        <div className='total'>
                            <h2>Total</h2>
                            <h3>Rs. {selectedSeats.reduce((acc, seat) => acc + seat.price, 0)}</h3>
                        </div>
                        
                        <button
                            className='theme_btn1 linkstylenone'
                            onClick={handleBooking} 
                        >
                        Book Now</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default SelectSeatPage
