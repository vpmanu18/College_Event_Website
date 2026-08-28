import React from 'react';
import { Link } from 'react-router-dom';
import { GraduationCap, Award, Landmark, ChevronRight } from 'lucide-react';

export const AboutPreview = () => {
  return (
    <div className="glass-panel" style={{
      padding: '40px',
      display: 'grid',
      gridTemplateColumns: '1fr',
      gap: '40px',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background neon light grid */}
      <div style={{
        position: 'absolute',
        top: '0',
        right: '0',
        width: '300px',
        height: '100%',
        background: 'linear-gradient(90deg, transparent 0%, rgba(0, 240, 255, 0.02) 100%)',
        pointerEvents: 'none'
      }} />

      <div>
        <h4 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '0.85rem',
          fontWeight: '700',
          color: 'var(--color-cyan)',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          marginBottom: '10px'
        }}>ESTABLISHED IN 2023</h4>
        
        <h2 style={{
          fontFamily: 'var(--font-display)',
          fontSize: '2rem',
          fontWeight: '800',
          color: 'var(--text-main)',
          marginBottom: '20px',
          letterSpacing: '-0.02em',
          lineHeight: '1.2'
        }}>
          KLE SOCIETY'S DEGREE COLLEGE GANGAVATHI
        </h2>

        <p style={{
          fontSize: '1rem',
          color: 'var(--text-muted)',
          lineHeight: '1.7',
          marginBottom: '25px'
        }}>
          Our institution was founded in 2023 with the core vision of imparting premier quality technical and scientific education. We emphasize cultivating essential intrapersonal communication and technical competence, enabling students to excel in today's digital landscape.
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '20px',
          marginBottom: '30px'
        }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <GraduationCap size={20} style={{ color: 'var(--color-cyan)', marginTop: '3px' }} />
            <div>
              <h5 style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem' }}>BCA Department Focus</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Study, scientific research and career readiness.</p>
            </div>
          </div>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
            <Award size={20} style={{ color: 'var(--color-purple)', marginTop: '3px' }} />
            <div>
              <h5 style={{ color: 'var(--text-main)', fontWeight: '600', fontSize: '0.95rem' }}>Professional Growth</h5>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>Equipped with current digital frameworks.</p>
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <Link to="/about" className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 24px' }}>
            Read More
            <ChevronRight size={16} />
          </Link>
          <a 
            href="https://klecollegegangavathi.com" 
            target="_blank" 
            rel="noopener noreferrer" 
            className="btn" 
            style={{ 
              background: 'rgba(255,255,255,0.03)', 
              color: 'var(--text-main)',
              border: '1px solid rgba(255,255,255,0.1)',
              padding: '10px 24px'
            }}
          >
            Visit Official College Website
          </a>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          div[style*="gridTemplateColumns: 1fr"] {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
};
