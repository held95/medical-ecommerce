import { useState, useEffect } from 'react';
import './CountdownTimer.css';

const CountdownTimer = ({ targetDate, label = "Oferta válida até:" }) => {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date().getTime();
      const target = new Date(targetDate).getTime();
      const difference = target - now;

      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((difference % (1000 * 60)) / 1000)
        });
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      }
    };

    // Calculate immediately
    calculateTimeLeft();

    // Update every second
    const interval = setInterval(calculateTimeLeft, 1000);

    // Cleanup
    return () => clearInterval(interval);
  }, [targetDate]);

  return (
    <div className="countdown-timer">
      {label && <div className="countdown-label">{label}</div>}
      <div className="countdown-grid">
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.days).padStart(2, '0')}</div>
          <div className="countdown-unit">Dias</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.hours).padStart(2, '0')}</div>
          <div className="countdown-unit">Horas</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.minutes).padStart(2, '0')}</div>
          <div className="countdown-unit">Minutos</div>
        </div>
        <div className="countdown-separator">:</div>
        <div className="countdown-item">
          <div className="countdown-value">{String(timeLeft.seconds).padStart(2, '0')}</div>
          <div className="countdown-unit">Segundos</div>
        </div>
      </div>
    </div>
  );
};

export default CountdownTimer;
