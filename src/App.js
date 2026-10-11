
import React, { useState } from "react";
import "./App.css";

function App() {
  const [date, setDate] = useState("");
  const [guests, setGuests] = useState("2");
  const [time, setTime] = useState("17:00");
  const [occasion, setOccasion] = useState("Birthday");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const availableTimes = [
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
  ];

  const today = new Date().toLocaleDateString("en-CA");

  function handleSubmit(event) {
    event.preventDefault();
    setError("");

    if (!date) {
      setError("Please select a booking date.");
      return;
    }

    if (date < today) {
      setError("Please select today or a future date.");
      return;
    }

    if (!availableTimes.includes(time)) {
      setError("Please select an available time.");
      return;
    }

    setSubmitted(true);
  }

  function handleReset() {
    setDate("");
    setGuests("2");
    setTime("17:00");
    setOccasion("Birthday");
    setSubmitted(false);
    setError("");
  }

  return (
    <main className="booking-page">
      <header className="header">
        <h1>Little Lemon</h1>
        <p>Mediterranean Restaurant</p>
      </header>

      <section className="booking-card">
        <h2>Reserve a Table</h2>
        <p>
          Enjoy delicious Mediterranean food with family and friends.
          Book your table below!
        </p>

        {submitted ? (
          <div className="success-message" role="status">
            <h3>Reservation Details</h3>
            <p>Your booking form has been submitted successfully.</p>
            <p><strong>Date:</strong> {date}</p>
            <p><strong>Time:</strong> {time}</p>
            <p><strong>Guests:</strong> {guests}</p>
            <p><strong>Occasion:</strong> {occasion}</p>
            <button type="button" onClick={handleReset}>
              Make Another Booking
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <label htmlFor="booking-date">Choose date</label>
            <input
              id="booking-date"
              type="date"
              min={today}
              value={date}
              onChange={(event) => setDate(event.target.value)}
              required
            />

            <label htmlFor="booking-time">Choose time</label>
            <select
              id="booking-time"
              value={time}
              onChange={(event) => setTime(event.target.value)}
              required
            >
              {availableTimes.map((availableTime) => (
                <option key={availableTime} value={availableTime}>
                  {availableTime}
                </option>
              ))}
            </select>

            <label htmlFor="booking-guests">Number of guests</label>
            <select
              id="booking-guests"
              value={guests}
              onChange={(event) => setGuests(event.target.value)}
              required
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((number) => (
                <option key={number} value={number}>
                  {number} {number === 1 ? "guest" : "guests"}
                </option>
              ))}
            </select>

            <label htmlFor="booking-occasion">Occasion</label>
            <select
              id="booking-occasion"
              value={occasion}
              onChange={(event) => setOccasion(event.target.value)}
              required
            >
              <option value="Birthday">Birthday</option>
              <option value="Anniversary">Anniversary</option>
              <option value="Other">Other</option>
            </select>

            {error && (
              <p className="error-message" role="alert">
                {error}
              </p>
            )}

            <button type="submit">Make Your Reservation</button>
          </form>
        )}
      </section>

      <footer>
        <p>Little Lemon © 2026</p>
      </footer>
    </main>
  );
}

export default App;
