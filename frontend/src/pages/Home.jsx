import React from 'react';
import { Hero } from '../components/Hero';
import { Countdown } from '../components/Countdown';
import { ImageSlider } from '../components/ImageSlider';
import { StatsSection } from '../components/StatsSection';
import { AboutPreview } from '../components/AboutPreview';
import { LocationCard } from '../components/LocationCard';
import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';

export const Home = () => {
  return (
    <div>
      {/* 1. Cinematic Hero Section */}
      <Hero />

      {/* 2. Live Countdown Section */}
      <section className="section-padding" style={{ position: 'relative', zIndex: 5, marginTop: '-50px' }}>
        <div className="container">
          <Countdown />
        </div>
      </section>

      {/* 3. Dynamic Live Stats Section */}
      <section className="section-padding" style={{ background: 'var(--bg-section-alt)' }}>
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            textAlign: 'center',
            marginBottom: '40px',
            letterSpacing: '0.05em'
          }}>
            LIVE <span className="gradient-text-blue-cyan">FEST STATISTICS</span>
          </h2>
          <StatsSection />
        </div>
      </section>

      {/* 4. Slideshow / Image Slider Carousel */}
      <section className="section-padding">
        <div className="container">
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.8rem',
            textAlign: 'center',
            marginBottom: '40px',
            letterSpacing: '0.05em'
          }}>
            EXPLORE THE <span className="gradient-text-cyan-purple">GALLERY & HIGHLIGHTS</span>
          </h2>
          <ImageSlider />
        </div>
      </section>

      {/* 5. About College Preview Block */}
      <section className="section-padding" style={{ background: 'var(--bg-section-alt)' }}>
        <div className="container">
          <AboutPreview />
        </div>
      </section>

      {/* 6. Event Logistics Venue & Dates */}
      <section className="section-padding">
        <div className="container">
          <LocationCard />
        </div>
      </section>

      {/* 7. Call To Action Footer */}
      <section className="section-padding" style={{ 
        textAlign: 'center', 
        background: 'linear-gradient(180deg, transparent 0%, rgba(189, 0, 255, 0.05) 100%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.02)'
      }}>
        <div className="container">
          <motion.div 
            style={{
              maxWidth: '700px',
              margin: '0 auto'
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <Sparkles size={36} style={{ color: 'var(--color-cyan)', marginBottom: '15px' }} />
            <h2 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.2rem',
              fontWeight: '800',
              marginBottom: '15px',
              color: 'var(--text-main)'
            }}>Ready to Showcase Your Prowess?</h2>
            <p style={{
              color: 'var(--text-muted)',
              fontSize: '1.1rem',
              lineHeight: '1.6',
              marginBottom: '35px'
            }}>
              Join students from across the region in competing for rewards, recognition, and the ultimate technical title. Register now before seats run out.
            </p>
            <Link to="/events" className="btn btn-purple" style={{ padding: '14px 44px', gap: '8px' }}>
              SECURE YOUR REGISTRATION
              <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
