import React, { useState, useEffect } from "react";
import "./styles.css";

const Countdown = ({ expiry, text }: { expiry: string, text:string }) => {
  const COUNTDOWN_TARGET = new Date(expiry);

  const calculateTimeLeft = () => {
    const totalTimeLeft = COUNTDOWN_TARGET.getTime() - new Date().getTime();
    const isTimeRemaining = totalTimeLeft > 0;

    if (!isTimeRemaining) return { days: 0, hours: 0, minutes: 0, seconds: 0 };

    const days = Math.floor(totalTimeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((totalTimeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((totalTimeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((totalTimeLeft / 1000) % 60);

    return { days, hours, minutes, seconds };
  };

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft);

  useEffect(() => {
	const timer = setInterval(() => {
	  const updatedTimeLeft = calculateTimeLeft();
	  setTimeLeft(updatedTimeLeft);
  
	  if (
		updatedTimeLeft.days === 0 &&
		updatedTimeLeft.hours === 0 &&
		updatedTimeLeft.minutes === 0 &&
		updatedTimeLeft.seconds === 0
	  ) {
		clearInterval(timer);
	  }
	}, 1000);
  
	return () => clearInterval(timer);
  }, []);  

  const getBoxColor = (value: number) => {
    if (value > 40) return "after:bg-green-600";
    if (value > 20) return "after:bg-yellow-600";
    return "after:bg-red-600";
  };

  return (
    <div className="countdown">
      <h2 className="text-heading mb-3.5 text-lg font-bold md:text-xl lg:text-2xl 2xl:text-3xl">

        {text}
      </h2>
      <div className="content">
        {Object.entries(timeLeft).map(([label, value]) => (
          <div className="box" key={label}>
            <div className={`value ${getBoxColor(value)}`}>
              <span>{value}</span>
            </div>
            <span className="label">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Countdown;
