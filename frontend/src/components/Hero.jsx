import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Code2, Terminal, Cpu, ArrowRight, MapPin, Calendar } from 'lucide-react';

export const Hero = () => {
  return (
    <section style={{
      minHeight: '85vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      padding: '80px 0',
      overflow: 'hidden',
      background: 'radial-gradient(circle at 50% 50%, rgba(2, 132, 199, 0.08) 0%, transparent 100%)'
    }}>
      {/* Animated Glowing Ambient Orbs */}
      <div className="float-element" style={{
        position: 'absolute',
        top: '20%',
        left: '10%',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(30px)'
      }} />
      <div className="float-element" style={{
        position: 'absolute',
        bottom: '15%',
        right: '10%',
        width: '400px',
        height: '400px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(189, 0, 255, 0.08) 0%, transparent 70%)',
        pointerEvents: 'none',
        filter: 'blur(35px)',
        animationDelay: '2s'
      }} />



      <div className="container" style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}>

        {/* Institution Info */}
        <motion.p 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            fontWeight: '700',
            color: 'var(--text-muted)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '15px'
          }}
        >
          KLE SOCIETY'S DEGREE COLLEGE GANGAVATHI
        </motion.p>

        {/* Main Event Title */}
        <motion.h1 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="gradient-text-cyan-purple"
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'calc(2.2rem + 2.5vw)',
            fontWeight: '800',
            lineHeight: '1.1',
            letterSpacing: '-0.03em',
            marginBottom: '15px',
            textTransform: 'uppercase'
          }}
        >
          TECH FEST 2K26-27
        </motion.h1>

        {/* Headline Tagline */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'calc(1.2rem + 0.8vw)',
            fontWeight: '700',
            color: 'var(--color-cyan)',
            letterSpacing: '0.15em',
            marginBottom: '20px',
            textTransform: 'uppercase',
            textShadow: 'var(--glow-cyan)'
          }}
        >
          WHERE CODE MEETS CREATIVITY
        </motion.h2>

        {/* Short Subheading */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          style={{
            fontSize: 'calc(0.95rem + 0.15vw)',
            color: 'var(--text-muted)',
            maxWidth: '650px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6',
            fontWeight: '400'
          }}
        >
          An exciting celebration of technology, problem-solving, innovation and competitive coding.
        </motion.p>

        {/* Event Meta Badges (Date & Venue) */}
        <motion.div 
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          style={{
            display: 'inline-flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '50px'
          }}
        >
          <div className="glass-panel" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '30px',
            border: '1px solid rgba(0,240,255,0.15)'
          }}>
            <Calendar size={16} style={{ color: 'var(--color-cyan)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>13 NOVEMBER 2026</span>
          </div>

          <div className="glass-panel" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 20px',
            borderRadius: '30px',
            border: '1px solid rgba(189,0,255,0.15)'
          }}>
            <MapPin size={16} style={{ color: 'var(--color-purple)' }} />
            <span style={{ fontSize: '0.9rem', fontWeight: '600' }}>KLE BCA COLLEGE, GANGAVATHI</span>
          </div>
        </motion.div>

        {/* Call to Action Buttons */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '20px'
          }}
        >
          <Link to="/events" className="btn btn-cyan" style={{ gap: '10px', fontSize: '1.05rem', padding: '14px 36px' }}>
            EXPLORE EVENTS
            <ArrowRight size={18} />
          </Link>
          <Link to="/events" className="btn btn-outline" style={{ padding: '14px 36px', fontSize: '1.05rem' }}>
            REGISTER NOW
          </Link>
        </motion.div>
      </div>
    </section>
  );
};
