import moment from "moment";
import React, { useCallback } from "react";
import { DayPicker } from "react-day-picker";
import "react-day-picker/dist/style.css";
import { useNavigate, useParams } from "react-router-dom";
import "./BuyTicketsPage.css";
import { FaClock } from "react-icons/fa";


const BuyTicketsPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [movie, setMovie] = React.useState(null);
  const [theatres, setTheatres] = React.useState(null);
  const { movieid } = useParams();
  const screensRef = React.useRef(null);

  const getMovie = useCallback(async () => {
    fetch(`https://itp-movie-backend.vercel.app/movie/get/${movieid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setMovie(data.data);
      })
      .catch((err) => console.log(err));
  }, [movieid]);

  const getTheatres = useCallback(async () => {
    if (selectedTime) {
      try {
        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
        const res = await fetch(
          `https://itp-movie-backend.vercel.app/screen/schedule/${formattedDate}/${selectedTime}/${movieid}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );
        const data = await res.json();
        if (data.success) {
          setTheatres(data.data);
        } else {
          setTheatres(null);
          console.log("Error:", data.message);
        }
      } catch (error) {
        console.log("Fetch error:", error);
      }
    } else {
      setTheatres(null);
    }
  }, [selectedTime, selectedDate, movieid]);

  const handleSelectTime = (time) => {
    setSelectedTime(time);
  };

  React.useEffect(() => {
    getMovie();
  }, [getMovie]);

  React.useEffect(() => {
    if (selectedTime) {
      getTheatres();
    }
  }, [selectedTime, getTheatres]);

  // Smooth scroll to the theatre list when available
  React.useEffect(() => {
    if (theatres && theatres.length > 0 && screensRef.current) {
      screensRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [theatres]);

  const isToday = moment(selectedDate).isSame(moment(), "day");

  return (
    <div>
      {movie ? (
        <div className="buytickets">
          <div className="s1">
            <div className="head">
              <h1>{movie.title} - Tamil</h1>
              <h3 className="genre-chips">{movie.genre.join(", ")}</h3>
              <div className="schedule-grid">
                <div className="calendar-wrap">
                  <h2 className="section-title">Pick a date</h2>
                  <DayPicker
                    mode="single"
                    selected={selectedDate}
                    onSelect={(date) => {
                      if (date) {
                        setSelectedDate(date);
                        // Reset time and theatres when date changes
                        setSelectedTime(null);
                        setTheatres(null);
                      }
                    }}
                  disabled={{ before: new Date() }}
                  showOutsideDays
                  styles={{
                    caption: { color: "#fff", fontWeight: 700 },
                    head_cell: { color: "#cfcfcf" },
                    day: { color: "#e5e5e5" },
                    day_selected: { backgroundColor: "#e50914", color: "#fff" },
                    day_today: { border: "1px solid #e50914" },
                  }}
                />
                <div className="selected-date-badge">
                  {moment(selectedDate).format("ddd, MMM D, YYYY")}
                </div>
                <div className="quick-dates">
                  <button
                    type="button"
                    className="quick-date-btn"
                    onClick={() => {
                      const today = new Date();
                      setSelectedDate(today);
                      setSelectedTime(null);
                      setTheatres(null);
                    }}
                  >
                    Today
                  </button>
                  <button
                    type="button"
                    className="quick-date-btn"
                    onClick={() => {
                      const tomorrow = moment().add(1, "day").toDate();
                      setSelectedDate(tomorrow);
                      setSelectedTime(null);
                      setTheatres(null);
                    }}
                  >
                    Tomorrow
                  </button>
                </div>
              </div>
              <div className="time">
                <h2 className="section-title">Pick a time</h2>
                <div className="time-boxes">
                  {["7:30", "10:30", "14:30", "18:30", "21:30"].map((time, index) => {
                    const momentTime = moment(time, "HH:mm");
                    const isPast = isToday && moment().isAfter(momentTime);
                    return (
                      <div
                        key={index}
                        className={`time-box ${isPast ? "disabled" : ""} ${
                          selectedTime === time ? "active" : ""
                        }`}
                        onClick={() => {
                          if (!isPast) {
                            handleSelectTime(time);
                          }
                        }}
                      >
                        <FaClock style={{ marginRight: 6 }} />
                        {momentTime.format("h:mm A")}
                      </div>
                    );
                  })}
                </div>
              </div>
              {/* close schedule-grid */}
              </div>
            {/* close head */}
            </div>
          {/* close s1 */}
          </div>
          {theatres && theatres.length > 0 && (
            <div className="screens" ref={screensRef}>
              <h2 className="section-title" style={{ marginBottom: 12 }}>Available Theatres</h2>
              {theatres.map((screen, index) => {
                const screenid = screen._id;
                return (
                  <div className="screen" key={index}>
                    <div>
                      <h2>{screen.name}</h2>
                      <h3>{screen.screenType}</h3>
                    </div>
                    <button
                      onClick={() => {
                        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
                        navigate(`/seat-layout/${movieid}/${screenid}/${formattedDate}`);
                      }}
                      className="theme_btn1 linkstylenone"
                    >
                      Select
                    </button>
                  </div>
                );
              })}
            </div>
          )}
          {theatres !== null && theatres?.length === 0 && (
            <div className="screens empty">
              <h3>No theatres available for the selected date and time.</h3>
            </div>
          )}
        </div>
      ) : (
        <div className="buytickets">
          <div className="head">
            <h1>Loading...</h1>
            <h3>Please wait</h3>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyTicketsPage;
