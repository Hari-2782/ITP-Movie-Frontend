import moment from "moment";
import React, { useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./BuyTicketsPage.css";
import { FaClock, FaTv } from "react-icons/fa";


const BuyTicketsPage = () => {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = React.useState(new Date());
  const [selectedTime, setSelectedTime] = React.useState(null);
  const [movie, setMovie] = React.useState(null);
  const [theatres, setTheatres] = React.useState(null);
  const [loadingMovie, setLoadingMovie] = React.useState(false);
  const [loadingTheatres, setLoadingTheatres] = React.useState(false);
  const { movieid } = useParams();
  const screensRef = React.useRef(null);

  const getMovie = useCallback(async () => {
    setLoadingMovie(true);
    fetch(`https://itp-movie-backend.vercel.app/movie/get/${movieid}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.ok) setMovie(data.data);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingMovie(false));
  }, [movieid]);

  const getTheatres = useCallback(async () => {
    if (selectedTime) {
      try {
        setLoadingTheatres(true);
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
      } finally {
        setLoadingTheatres(false);
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
  // Start of the 7-day window shown in the strip
  const [stripStart, setStripStart] = React.useState(moment().startOf("day"));
  const daysInStrip = React.useMemo(
    () => Array.from({ length: 7 }, (_, i) => stripStart.clone().add(i, "day")),
    [stripStart]
  );

  return (
    <div>
      {(!loadingMovie && movie) ? (
        <div className="buytickets">
          {/* Hero cover using landscape image */}
          {movie?.landscapeImgUrl && (
            <div
              className="schedule-hero"
              style={{ backgroundImage: `url(${movie.landscapeImgUrl})` }}
            >
              <div className="schedule-hero__overlay" />
              <div className="schedule-hero__content">
                <h1 className="schedule-hero__title">{movie.title}</h1>
                <div className="schedule-hero__meta">
                  {movie.duration ? <span>{movie.duration} mins</span> : null}
                </div>
                {/* Genre chips */}
                {(() => {
                  const genres = Array.isArray(movie.genre)
                    ? movie.genre
                    : typeof movie.genre === "string"
                    ? movie.genre.split(",").map((g) => g.trim()).filter(Boolean)
                    : [];
                  return genres.length ? (
                    <div className="genre-chips">
                      {genres.map((g, i) => (
                        <span key={i} className="genre-chip">{g}</span>
                      ))}
                    </div>
                  ) : null;
                })()}
              </div>
            </div>
          )}
          <div className="s1">
            <div className="head">
              <h1 className="visually-hidden">{movie.title}</h1>
              <div className="schedule-grid">
                {/* Month header with arrows */}
                <div className="date-header">
                  <button
                    type="button"
                    className="date-nav-btn"
                    aria-label="Previous month"
                    onClick={() => setStripStart((p) => p.clone().subtract(1, "month").startOf("month"))}
                  >
                    ◀
                  </button>
                  <div className="month-label">{stripStart.format("MMMM YYYY")}</div>
                  <button
                    type="button"
                    className="date-nav-btn"
                    aria-label="Next month"
                    onClick={() => setStripStart((p) => p.clone().add(1, "month").startOf("month"))}
                  >
                    ▶
                  </button>
                </div>

                {/* 7-day strip with left/right arrows */}
                <div className="date-strip-nav">
                  <button
                    type="button"
                    className="date-nav-btn"
                    aria-label="Previous days"
                    onClick={() => setStripStart((p) => p.clone().subtract(7, "day"))}
                  >
                    ◀
                  </button>
                  <div className="date-strip">
                  {daysInStrip.map((m, idx) => {
                    const isActive = moment(selectedDate).isSame(m, "day");
                    const isPastDay = m.isBefore(moment().startOf("day"), "day");
                    return (
                      <button
                        type="button"
                        key={idx}
                        className={`date-pill ${isActive ? "active" : ""} ${isPastDay ? "disabled" : ""}`}
                        disabled={isPastDay}
                        onClick={() => {
                          if (isPastDay) return;
                          setSelectedDate(m.toDate());
                          setSelectedTime(null);
                          setTheatres(null);
                        }}
                      >
                        <div className="date-pill__day">{m.isSame(moment(), "day") ? "TODAY" : m.format("dd").toUpperCase()}</div>
                        <div className="date-pill__date">{m.format("DD")}</div>
                        <div className="date-pill__month">{m.format("MMM")}</div>
                      </button>
                    );
                  })}
                  </div>
                  <button
                    type="button"
                    className="date-nav-btn"
                    aria-label="Next days"
                    onClick={() => setStripStart((p) => p.clone().add(7, "day"))}
                  >
                    ▶
                  </button>
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
          {loadingTheatres && (
            <div className="screens loading" ref={screensRef}>
              <div className="loader">
                <FaTv className="tv-loader" />
                <div className="loader-text">Finding theatres...</div>
              </div>
            </div>
          )}
          {theatres && theatres.length > 0 && (
            <div className="screens" ref={screensRef}>
              <h2 className="section-title" style={{ marginBottom: 12 }}>Available Theatres</h2>
              {theatres.map((screen, index) => {
                const screenid = screen._id;
                return (
                  <div className="screen" key={index}>
                    <div className="screen__left">
                      <FaTv className="screen-icon" />
                      <div>
                        <h2>{screen.name}</h2>
                        <h3>{screen.screenType}</h3>
                        <div className="screen__chips">
                          <span className="badge date-badge">{moment(selectedDate).format("ddd, MMM D")}</span>
                          {selectedTime && (
                            <span className="badge time-badge"><FaClock style={{ marginRight: 6 }} />{moment(selectedTime, "HH:mm").format("h:mm A")}</span>
                          )}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => {
                        const formattedDate = moment(selectedDate).format("YYYY-MM-DD");
                        navigate(`/seat-layout/${movieid}/${screenid}/${formattedDate}`);
                      }}
                      className="theme_btn1 linkstylenone select-btn"
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
            <div className="loader">
              <FaTv className="tv-loader" />
              <div className="loader-text">Loading movie...</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyTicketsPage;
