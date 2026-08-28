import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, MapPin } from 'lucide-react';

export const Footer = () => {
  return (
    <footer style={{
      borderTop: '1px solid var(--border-color-dim)',
      background: 'var(--bg-section-alt)',
      padding: '60px 0 30px 0',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background glow overlay */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        right: '10%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(2, 132, 199, 0.05) 0%, transparent 70%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '40px',
        marginBottom: '4px'
      }}>
        {/* Branding Info */}
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.2rem',
            fontWeight: '800',
            color: 'var(--text-main)',
            letterSpacing: '0.05em',
            marginBottom: '10px'
          }}>KLE SOCIETY'S DEGREE COLLEGE GANGAVATHI</h3>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '0.9rem',
            marginBottom: '20px',
            maxWidth: '320px',
            lineHeight: '1.6'
          }}>
            Igniting technological potential and coding prowess in BCA, B.Sc, and B.Com education. Join us on November 13, 2026.
          </p>
        </div>

        {/* Quick Links */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'var(--color-cyan)',
            fontWeight: '600',
            marginBottom: '18px',
            letterSpacing: '0.05em'
          }}>QUICK LINKS</h4>
          <ul style={{ listStyle: 'none', padding: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <li><Link to="/" className="footer-link">Home</Link></li>
            <li><Link to="/about" className="footer-link">About College</Link></li>
            <li><Link to="/events" className="footer-link">Events Catalogue</Link></li>
            <li><Link to="/contact" className="footer-link">Contact Desk</Link></li>
            <li><Link to="/events" className="footer-link" style={{ color: 'var(--color-cyan)', fontWeight: '500' }}>Register Now</Link></li>
          </ul>
        </div>

        {/* Social / Connect */}
        <div>
          <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1rem',
            color: 'var(--color-cyan)',
            fontWeight: '600',
            marginBottom: '18px',
            letterSpacing: '0.05em'
          }}>CONNECT WITH US</h4>
          <div style={{ display: 'flex', gap: '15px', marginBottom: '20px' }}>
            <a 
              href="https://www.facebook.com/klecollegegangavati/posts/130700019572618/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              title="Facebook"
            >
              <Facebook size={20} />
            </a>
            <a 
              href="https://www.instagram.com/klebca_gangavathi/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              title="Instagram"
            >
              <Instagram size={20} />
            </a>
            <a 
              href="https://www.google.com/maps/place/KLE+Degree+College/data=!4m2!3m1!1s0x0:0xe4b81fe55f298ab2?sa=X&ved=1t:2428&ictx=11" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="social-icon"
              title="Find on Map"
            >
              <MapPin size={20} />
            </a>
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            Phone: +91 9483482741<br/>
            Email: klesbcagvt@gmail.com
          </p>
        </div>
      </div>

      <div className="container" style={{ marginTop: '40px', padding: '20px 0 0 0', borderTop: '1px solid var(--border-color-dim)' }}>
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '15px'
        }}>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            &copy; 2026 KLE Society's Degree College, Gangavathi. All rights reserved.
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)' }}>
            Tech Fest 2k26-27
          </p>
        </div>
      </div>

      <style>{`
        .footer-link {
          text-decoration: none;
          color: var(--text-muted);
          font-size: 0.9rem;
          transition: var(--transition-smooth);
        }
        .footer-link:hover {
          color: var(--color-cyan);
          padding-left: 4px;
        }
        .social-icon {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid var(--border-color-dim);
          color: var(--text-muted);
          transition: var(--transition-smooth);
        }
        .social-icon:hover {
          color: var(--color-cyan);
          background: rgba(0, 240, 255, 0.05);
          border-color: var(--color-cyan);
          box-shadow: var(--glow-cyan);
          transform: translateY(-2px);
        }
      `}</style>
    </footer>
  );
};
