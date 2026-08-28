import React, { useState, useEffect } from 'react';

export const Countdown = () => {
  const targetDate = new Date('2026-11-13T09:00:00+05:30'); // Event starts at 9:00 AM IST on Nov 13, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
    completed: false
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +targetDate - +new Date();
      let newTimeLeft = {};

      if (difference <= 0) {
        newTimeLeft = {
          days: 0,
          hours: 0,
          minutes: 0,
          seconds: 0,
          completed: true
        };
      } else {
        newTimeLeft = {
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
          completed: false
        };
      }
      setTimeLeft(newTimeLeft);
    };

    calculateTimeLeft(); // run once immediately
    const interval = setInterval(calculateTimeLeft, 1000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    return num < 10 ? `0${num}` : num;
  };

  if (timeLeft.completed) {
    return (
      <div className="glass-panel" style={{
        maxWidth: '800px',
        margin: '0 auto',
        padding: '30px',
        textAlign: 'center',
        border: '1px dashed var(--color-cyan)',
        boxShadow: 'var(--glow-cyan)'
      }}>
        <h3 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.6rem',
          fontWeight: '800',
          letterSpacing: '0.08em',
          color: 'var(--color-cyan)'
        }}>
          TECH FEST 2K26-27 HAS STARTED / EVENT COMPLETED
        </h3>
      </div>
    );
  }

  const items = [
    { label: 'DAYS', value: timeLeft.days },
    { label: 'HOURS', value: timeLeft.hours },
    { label: 'MINUTES', value: timeLeft.minutes },
    { label: 'SECONDS', value: timeLeft.seconds }
  ];

  return (
    <div style={{
      maxWidth: '800px',
      margin: '0 auto',
      textAlign: 'center'
    }}>
      <h3 style={{
        fontFamily: 'var(--font-display)',
        fontSize: '0.9rem',
        letterSpacing: '0.25em',
        color: 'var(--text-muted)',
        marginBottom: '25px',
        fontWeight: '600',
        textTransform: 'uppercase'
      }}>
        TIME REMAINING UNTIL KICKOFF
      </h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gap: '15px'
      }}>
        {items.map((item, index) => (
          <div key={index} className="glass-panel-neon-cyan" style={{
            padding: '20px 10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}>
            <span className="gradient-text-blue-cyan" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: '800',
              lineHeight: '1.1',
              letterSpacing: '-0.02em',
              textShadow: '0 0 10px rgba(0, 240, 255, 0.2)'
            }}>
              {formatNumber(item.value)}
            </span>
            <span style={{
              fontSize: '0.75rem',
              fontWeight: '600',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
              marginTop: '5px'
            }}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};
