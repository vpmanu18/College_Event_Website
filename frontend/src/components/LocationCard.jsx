import React from 'react';
import { MapPin, Calendar, Map, Compass } from 'lucide-react';

export const LocationCard = () => {
  const mapLink = "https://www.google.com/maps/place/KLE+Degree+College/data=!4m2!3m1!1s0x0:0xe4b81fe55f298ab2?sa=X&ved=1t:2428&ictx=11";

  return (
    <div className="glass-panel-neon-cyan" style={{
      padding: '40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow highlights */}
      <div style={{
        position: 'absolute',
        top: '-50px',
        left: '-50px',
        width: '180px',
        height: '180px',
        background: 'radial-gradient(circle, rgba(0, 240, 255, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '30px',
        alignItems: 'center'
      }}>
        {/* Date & Venue Details */}
        <div>
          <h3 className="gradient-text-blue-cyan" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.5rem',
            fontWeight: '800',
            marginBottom: '25px',
            letterSpacing: '0.05em'
          }}>
            EVENT LOGISTICS
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                background: 'rgba(0, 240, 255, 0.05)',
                border: '1px solid rgba(0, 240, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Calendar size={20} style={{ color: 'var(--color-cyan)' }} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>DATE</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>13 November 2026</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                background: 'rgba(189, 0, 255, 0.05)',
                border: '1px solid rgba(189, 0, 255, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Compass size={20} style={{ color: 'var(--color-purple)' }} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>LOCATION</span>
                <span style={{ fontSize: '1.1rem', fontWeight: '600', color: 'var(--text-main)' }}>KLE BCA College, Gangavathi</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '15px' }}>
              <div style={{
                width: '44px',
                height: '44px',
                borderRadius: '8px',
                background: 'rgba(56, 239, 125, 0.05)',
                border: '1px solid rgba(56, 239, 125, 0.1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <MapPin size={20} style={{ color: '#38ef7d' }} />
              </div>
              <div>
                <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-muted)' }}>VENUE</span>
                <address style={{ fontSize: '1rem', fontStyle: 'normal', color: 'var(--text-muted)', lineHeight: '1.5' }}>
                  KLE Campus, Koppal Road,<br/>
                  Vaddarahatti, Gangavathi &ndash; 583235
                </address>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Google Map Embed Frame */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div style={{
            border: '1px solid var(--border-color-dim)',
            borderRadius: '12px',
            overflow: 'hidden',
            height: '200px',
            position: 'relative'
          }}>
            <iframe 
              title="KLE College Gangavathi Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.75704179373!2d76.353347!3d15.4214532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb809ea6ff8848b%3A0xe4b81fe55f298ab2!2sKLE%20Degree%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
              width="100%" 
              height="100%" 
              style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(10%)' }} 
              allowFullScreen="" 
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          <a 
            href={mapLink} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn btn-cyan"
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px'
            }}
          >
            <Map size={18} />
            VIEW ON GOOGLE MAPS
          </a>
        </div>
      </div>
    </div>
  );
};
