import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { RegistrationModal } from '../components/RegistrationModal';
import { MapPin, Clock, Calendar, Users, ArrowLeft, ArrowRight, ShieldCheck, Tag } from 'lucide-react';

export const EventDetails = () => {
  const { slug } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);

  useEffect(() => {
    const fetchEventDetails = async () => {
      try {
        setLoading(true);
        const data = await apiService.getEvent(slug);
        setEvent(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Event not found.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventDetails();
  }, [slug]);

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !event) {
    return (
      <div style={{
        minHeight: '80vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px'
      }}>
        <ErrorMessage message={error || "Event not found."} />
        <Link to="/events" className="btn btn-outline" style={{ marginTop: '20px' }}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          BACK TO EVENTS
        </Link>
      </div>
    );
  }

  // Define unique graphic panel themes for each event type
  const getEventThemes = (eventSlug) => {
    switch (eventSlug) {
      case 'hackathon':
        return {
          banner: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
          accent: 'var(--color-cyan)',
          glow: 'var(--glow-cyan)'
        };
      case 'blind-coding':
        return {
          banner: 'linear-gradient(135deg, #1f1c2c 0%, #928dab 100%)',
          accent: 'var(--color-purple)',
          glow: 'var(--glow-purple)'
        };
      case 'error-debugging':
        return {
          banner: 'linear-gradient(135deg, #ff5e62 0%, #ff9966 100%)',
          accent: '#ff5e62',
          glow: '0 0 15px rgba(255, 94, 98, 0.4)'
        };
      case 'dsa-coding':
        return {
          banner: 'linear-gradient(135deg, #11998e 0%, #38ef7d 100%)',
          accent: '#38ef7d',
          glow: '0 0 15px rgba(56, 239, 125, 0.4)'
        };
      case 'treasure-hunt':
        return {
          banner: 'linear-gradient(135deg, #f12711 0%, #f5af19 100%)',
          accent: '#f5af19',
          glow: '0 0 15px rgba(245, 175, 25, 0.4)'
        };
      case 'web-design-showdown':
        return {
          banner: 'linear-gradient(135deg, #0f2027 0%, #203a43 50%, #2c5364 100%)',
          accent: 'var(--color-cyan)',
          glow: 'var(--glow-cyan)'
        };
      case 'sql-murder-mystery':
        return {
          banner: 'linear-gradient(135deg, #1f1c2c 0%, #3e3b4f 100%)',
          accent: '#00d2d3',
          glow: '0 0 15px rgba(0, 210, 211, 0.4)'
        };
      case 'speed-typing-duel':
        return {
          banner: 'linear-gradient(135deg, #2d3436 0%, #000000 100%)',
          accent: '#ff9f43',
          glow: '0 0 15px rgba(255, 159, 67, 0.4)'
        };
      case 'code-golfing':
        return {
          banner: 'linear-gradient(135deg, #10ac84 0%, #013220 100%)',
          accent: '#10ac84',
          glow: '0 0 15px rgba(16, 172, 132, 0.4)'
        };
      case 'ai-prompt-engineering':
        return {
          banner: 'linear-gradient(135deg, #5f27cd 0%, #1e0b36 100%)',
          accent: '#5f27cd',
          glow: '0 0 15px rgba(95, 39, 205, 0.4)'
        };
      case 'capture-the-flag':
        return {
          banner: 'linear-gradient(135deg, #8b0000 0%, #3b0000 100%)',
          accent: '#ee5253',
          glow: '0 0 15px rgba(238, 82, 83, 0.4)'
        };
      case 'code-refactoring-arena':
        return {
          banner: 'linear-gradient(135deg, #0abde3 0%, #1c2c36 100%)',
          accent: '#0abde3',
          glow: '0 0 15px rgba(10, 190, 227, 0.4)'
        };
      default:
        return {
          banner: 'linear-gradient(135deg, #111 0%, #333 100%)',
          accent: 'var(--color-cyan)',
          glow: 'var(--glow-cyan)'
        };
    }
  };

  const theme = getEventThemes(event.slug);

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container" style={{ maxWidth: '900px' }}>
        
        {/* Back Link */}
        <Link 
          to="/events" 
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            color: 'var(--text-muted)',
            textDecoration: 'none',
            fontFamily: 'var(--font-display)',
            fontWeight: '600',
            marginBottom: '30px',
            fontSize: '0.9rem',
            transition: 'var(--transition-smooth)'
          }}
          className="nav-item-hover"
        >
          <ArrowLeft size={16} />
          BACK TO EVENTS
        </Link>

        {/* Cinematic Event Card Body */}
        <div className="glass-panel" style={{ overflow: 'hidden' }}>
          {/* Dynamic Graphic Banner */}
          <div style={{
            background: theme.banner,
            height: '240px',
            position: 'relative',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            padding: '30px 40px',
            boxSizing: 'border-box'
          }}>
            {/* Tech grid overlay */}
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundImage: 'radial-gradient(var(--border-color-dim) 1px, transparent 0)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none'
            }} />

            {/* Category tag */}
            <span style={{
              alignSelf: 'flex-start',
              background: 'rgba(0,0,0,0.5)',
              border: `1px solid ${theme.accent}`,
              color: theme.accent,
              fontSize: '0.7rem',
              fontWeight: '700',
              padding: '3px 10px',
              borderRadius: '20px',
              letterSpacing: '0.1em',
              marginBottom: '10px',
              boxShadow: `0 0 10px ${theme.accent}33`
            }}>
              {event.category.toUpperCase()}
            </span>

            {/* Event Name */}
            <h1 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '2.5rem',
              fontWeight: '800',
              color: 'var(--text-main)',
              lineHeight: '1.2',
              textShadow: '0 2px 10px rgba(0,0,0,0.5)'
            }}>
              {event.name}
            </h1>
          </div>

          {/* Details Content */}
          <div style={{ padding: '40px' }}>
            
            {/* Logistics Grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
              gap: '20px',
              marginBottom: '35px',
              background: 'rgba(255, 255, 255, 0.02)',
              border: '1px solid var(--border-color-dim)',
              borderRadius: '12px',
              padding: '20px'
            }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Calendar size={18} style={{ color: 'var(--color-cyan)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)' }}>DATE</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>13 Nov 2026</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Clock size={18} style={{ color: 'var(--color-purple)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)' }}>TIME</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>{event.event_time}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <MapPin size={18} style={{ color: '#38ef7d' }} />
                <div>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>{event.location}</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Users size={18} style={{ color: '#ffb300' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)' }}>SLOTS FILLED</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>{event.participant_count ?? 0} / 50</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <Tag size={18} style={{ color: 'var(--color-cyan)' }} />
                <div>
                  <span style={{ display: 'block', fontSize: '0.7rem', color: 'var(--text-dim)' }}>ENTRY FEE</span>
                  <span style={{ fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>
                    {event.entry_fee === 0 ? 'Free' : `₹${event.entry_fee}`}
                  </span>
                </div>
              </div>
            </div>

            {/* Description */}
            <h3 style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.2rem',
              color: 'var(--text-main)',
              fontWeight: '700',
              marginBottom: '15px'
            }}>Event Overview</h3>
            <p style={{
              fontSize: '1.05rem',
              color: 'var(--text-muted)',
              lineHeight: '1.7',
              marginBottom: '35px'
            }}>
              {event.description}
            </p>

            {/* Extra terms or rules */}
            <div className="glass-panel" style={{
              background: 'rgba(56, 239, 125, 0.03)',
              border: '1px dashed rgba(56, 239, 125, 0.15)',
              padding: '20px',
              borderRadius: '8px',
              display: 'flex',
              gap: '12px',
              alignItems: 'flex-start',
              marginBottom: '40px'
            }}>
              <ShieldCheck size={20} style={{ color: '#38ef7d', flexShrink: 0, marginTop: '2px' }} />
              <div>
                <h5 style={{ color: '#38ef7d', fontWeight: '600', marginBottom: '4px' }}>Submission and Participation Info</h5>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  Ensure you report at the specified venue at least 15 minutes before the starting time. Bring valid college identity proof for registration verification on spot.
                </p>
              </div>
            </div>

            {/* Action CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
              <button 
                onClick={() => setShowRegisterModal(true)} 
                className={event.participant_count >= 50 ? "btn btn-disabled" : "btn btn-cyan"}
                disabled={event.participant_count >= 50}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '12px 36px',
                  boxShadow: event.participant_count >= 50 ? 'none' : theme.glow,
                  border: 'none',
                  cursor: event.participant_count >= 50 ? 'not-allowed' : 'pointer'
                }}
              >
                {event.participant_count >= 50 ? 'EVENT SLOTS FILLED (FULL)' : 'REGISTER FOR THIS EVENT'}
                {event.participant_count < 50 && <ArrowRight size={18} />}
              </button>
              <Link 
                to="/events" 
                className="btn btn-outline"
                style={{ padding: '12px 30px' }}
              >
                DISCOVER OTHER EVENTS
              </Link>
            </div>
            
          </div>
        </div>

      </div>
      {showRegisterModal && (
        <RegistrationModal event={event} onClose={() => setShowRegisterModal(false)} />
      )}
    </div>
  );
};
