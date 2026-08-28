import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Play, Pause } from 'lucide-react';

export const ImageSlider = () => {
  const slides = [
    {
      title: "DEPARTMENT OF COMPUTER APPLICATIONS",
      subtitle: "KLE SOCIETY'S DEGREE COLLEGE GANGAVATHI",
      description: "Focused on academic excellence, technical research, and professional student development.",
      image: "/images/gallery/bca_dept.jpg",
      accent: "var(--color-cyan)",
      label: "BCA DEPARTMENT"
    },
    {
      title: "24-HOUR COLLABORATIVE HACKATHON",
      subtitle: "WHERE CODE MEETS CREATIVITY",
      description: "A battleground for developers to brainstorm, design, and prototype real-world software solutions.",
      image: "/images/gallery/hackathon.jpg",
      accent: "var(--color-purple)",
      label: "MAIN EVENT"
    },
    {
      title: "BLIND CODING CHAMPIONSHIPS",
      subtitle: "TEST YOUR SYNTACTICAL PRECISION",
      description: "Write functional, error-free programs with monitors completely powered off.",
      image: "/images/gallery/blind_coding.jpg",
      accent: "var(--color-cyan)",
      label: "CODING CHALLENGE"
    },
    {
      title: "CAMPUS TREASURE HUNT",
      subtitle: "CYBER CRYPTIC DECIPHERING",
      description: "Decode cryptographic technical riddles and navigate through campus coordinates.",
      image: "/images/gallery/treasure_hunt.jpg",
      accent: "var(--color-emerald)",
      label: "TACTICAL STRATEGY"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutRef = useRef(null);

  const clearTimer = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      clearTimer();
      timeoutRef.current = setTimeout(
        () =>
          setCurrentIndex((prevIndex) =>
            prevIndex === slides.length - 1 ? 0 : prevIndex + 1
          ),
        4000 // slide duration
      );
    }
    return () => clearTimer();
  }, [currentIndex, isPlaying]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div 
      className="glass-panel"
      style={{
        position: 'relative',
        height: '400px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        padding: '0'
      }}
      onMouseEnter={() => setIsPlaying(false)}
      onMouseLeave={() => setIsPlaying(true)}
    >
      {/* Slides Container */}
      <div style={{
        display: 'flex',
        width: '100%',
        height: '100%',
        transform: `translateX(-${currentIndex * 100}%)`,
        transition: 'transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
      }}>
        {slides.map((slide, index) => (
          <div 
            key={index} 
            style={{
              minWidth: '100%',
              height: '100%',
              backgroundImage: `linear-gradient(to right, var(--bg-nav-scrolled) 30%, rgba(5, 8, 22, 0.45) 100%), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: '60px 80px',
              position: 'relative',
              boxSizing: 'border-box'
            }}
          >
            {/* Tech grid overlay inside slide */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(var(--border-color-dim) 1px, transparent 0)',
              backgroundSize: '24px 24px',
              pointerEvents: 'none'
            }} />

            {/* Accent badge */}
            <span style={{
              alignSelf: 'flex-start',
              border: `1px solid ${slide.accent}`,
              color: slide.accent,
              fontSize: '0.75rem',
              fontWeight: '700',
              padding: '4px 12px',
              borderRadius: '20px',
              letterSpacing: '0.15em',
              marginBottom: '15px',
              background: 'rgba(0,0,0,0.3)',
              boxShadow: `0 0 10px ${slide.accent}22`
            }}>
              {slide.label}
            </span>

            {/* Title */}
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2rem',
              fontWeight: '800',
              color: 'var(--text-main)',
              marginBottom: '10px',
              letterSpacing: '-0.02em',
              lineHeight: '1.2',
              maxWidth: '80%'
            }}>
              {slide.title}
            </h2>

            {/* Subtitle */}
            <h4 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1rem',
              color: slide.accent,
              fontWeight: '600',
              marginBottom: '15px',
              letterSpacing: '0.05em'
            }}>
              {slide.subtitle}
            </h4>

            {/* Description */}
            <p style={{
              fontSize: '1rem',
              color: 'var(--text-muted)',
              maxWidth: '600px',
              lineHeight: '1.6'
            }}>
              {slide.description}
            </p>
          </div>
        ))}
      </div>

      {/* Slide Navigation Controls */}
      <button 
        onClick={handlePrev}
        className="nav-arrow"
        style={{ left: '20px' }}
        title="Previous Slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button 
        onClick={handleNext}
        className="nav-arrow"
        style={{ right: '20px' }}
        title="Next Slide"
      >
        <ChevronRight size={24} />
      </button>

      {/* Play/Pause indicator indicator */}
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        color: 'rgba(255,255,255,0.4)',
        background: 'rgba(0,0,0,0.4)',
        padding: '5px',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {isPlaying ? <Play size={12} /> : <Pause size={12} />}
      </div>

      {/* Indicators Dots */}
      <div style={{
        position: 'absolute',
        bottom: '25px',
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        gap: '8px'
      }}>
        {slides.map((_, index) => (
          <button 
            key={index} 
            onClick={() => setCurrentIndex(index)}
            style={{
              width: currentIndex === index ? '24px' : '8px',
              height: '8px',
              borderRadius: '4px',
              background: currentIndex === index ? 'var(--color-cyan)' : 'rgba(255,255,255,0.3)',
              border: 'none',
              cursor: 'pointer',
              transition: 'var(--transition-smooth)'
            }}
          />
        ))}
      </div>

      <style>{`
        .nav-arrow {
          position: absolute;
          background: var(--bg-tab-container);
          border: var(--border-glass);
          color: #fff;
          width: 44px;
          height: 44px;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          alignItems: center;
          justify-content: center;
          transition: var(--transition-smooth);
          backdrop-filter: blur(4px);
        }
        .nav-arrow:hover {
          background: var(--color-cyan);
          color: #000;
          box-shadow: var(--glow-cyan);
          border-color: var(--color-cyan);
        }
        @media (max-width: 768px) {
          .nav-arrow { display: none; }
          div[style*="padding: 60px 80px"] {
            padding: 40px !important;
          }
          h2[style*="fontSize: 2rem"] {
            font-size: 1.4rem !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
};
