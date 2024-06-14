// components/Countdown.js
import React, { useState, useEffect } from "react";

const Countdown = ({ targetTimestamp }) => {
  const calculateTimeLeft = () => {
    const value = targetTimestamp.toString().slice(0, 19);
    const difference = new Date(value).getTime() - new Date().getTime();
    let timeLeft = {};
    if (difference > 0) {
      timeLeft = {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60),
      };
    }
    return timeLeft;
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

  useEffect(() => {
    const timer = setTimeout(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft]);

  return (
    <div>
      {timeLeft.days !== undefined ? (
        <div className="countdown">
          <span>{timeLeft.days}d </span>
          <span>{timeLeft.hours}h </span>
          <span>{timeLeft.minutes}m </span>
          <span>{timeLeft.seconds}s</span>
        </div>
      ) : (
        <span>Time's up!</span>
      )}
    </div>
  );
};

export default Countdown;
