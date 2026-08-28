import React, { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Menu, X, ChevronRight, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../context/AuthContext';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, isAuthenticated, logoutUser } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About College', path: '/about' },
    { name: 'Events', path: '/events' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <>
      <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        width: '100%',
        transition: 'all 0.3s ease',
        background: scrolled ? 'var(--bg-nav-scrolled)' : 'var(--bg-nav)',
        backdropFilter: scrolled ? 'blur(12px)' : 'blur(4px)',
        borderBottom: scrolled ? '1px solid rgba(0, 240, 255, 0.15)' : '1px solid var(--border-color-dim)',
        boxShadow: scrolled ? '0 10px 30px -10px rgba(0, 240, 255, 0.1)' : 'none',
        padding: scrolled ? '12px 0' : '18px 0'
      }}>
        <div className="container" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          {/* Logo / Branding */}
          <Link to="/" style={{ textDecoration: 'none', display: 'flex', flexDirection: 'column' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              fontSize: '0.8rem',
              fontWeight: '700',
              color: 'var(--text-muted)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              lineHeight: '1.2'
            }}>KLE Society's Degree College</span>
            <span className="gradient-text-cyan-purple" style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: '800',
              letterSpacing: '0.05em',
              textTransform: 'uppercase',
              lineHeight: '1.2'
            }}>TECH FEST 2K26-27</span>
          </Link>

          {/* Desktop Navigation */}
          <nav style={{ display: 'none', alignItems: 'center', gap: '30px' }} className="desktop-nav">
            <ul style={{ display: 'flex', listStyle: 'none', gap: '25px', alignItems: 'center', margin: 0, padding: 0 }}>
              {navLinks.map((link) => (
                <li key={link.name}>
                  <NavLink 
                    to={link.path} 
                    style={({ isActive }) => ({
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      fontWeight: '500',
                      textDecoration: 'none',
                      color: isActive ? 'var(--color-cyan)' : 'var(--text-main)',
                      textShadow: isActive ? 'var(--glow-cyan)' : 'none',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                    })}
                    className="nav-item-hover"
                  >
                    {link.name}
                  </NavLink>
                </li>
              ))}
            </ul>

            <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="nav-item-hover"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      color: 'var(--text-main)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <User size={16} style={{ color: 'var(--color-cyan)' }} />
                    DASHBOARD
                  </Link>
                  <button 
                    onClick={logoutUser}
                    className="btn btn-outline"
                    style={{
                      padding: '8px 16px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer',
                      border: '1px solid rgba(255,255,255,0.1)',
                      color: 'var(--text-main)'
                    }}
                  >
                    <LogOut size={14} />
                    LOGOUT
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="nav-item-hover"
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '0.95rem',
                      fontWeight: '600',
                      textDecoration: 'none',
                      color: 'var(--text-main)',
                      marginRight: '5px'
                    }}
                  >
                    SIGN IN
                  </Link>
                  <Link 
                    to="/events" 
                    className="btn btn-cyan" 
                    style={{
                      padding: '8px 20px',
                      fontSize: '0.85rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    REGISTER NOW
                    <ChevronRight size={14} />
                  </Link>
                </>
              )}
            </div>
          </nav>

          {/* Hamburger Icon */}
          <button 
            onClick={() => setMobileOpen(!mobileOpen)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-main)',
              cursor: 'pointer',
              display: 'block'
            }}
            className="hamburger-btn"
          >
            {mobileOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* CSS styles to toggle desktop/mobile menus */}
        <style>{`
          @media (min-width: 900px) {
            .desktop-nav { display: flex !important; }
            .hamburger-btn { display: none !important; }
          }
          .nav-item-hover::after {
            content: '';
            position: absolute;
            width: 0;
            height: 2px;
            bottom: -4px;
            left: 0;
            background-color: var(--color-cyan);
            box-shadow: var(--glow-cyan);
            transition: width 0.3s ease;
          }
          .nav-item-hover:hover::after {
            width: 100%;
          }
          .nav-item-hover:hover {
            color: var(--color-cyan) !important;
          }
        `}</style>
      </header>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            style={{
              position: 'fixed',
              top: '65px',
              left: 0,
              width: '100%',
              background: 'var(--bg-nav-scrolled)',
              backdropFilter: 'blur(20px)',
              borderBottom: '1px solid rgba(0, 240, 255, 0.15)',
              zIndex: 99,
              overflow: 'hidden'
            }}
          >
            <div style={{ padding: '30px 24px', display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '20px', padding: 0, margin: 0 }}>
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <NavLink
                      to={link.path}
                      onClick={() => setMobileOpen(false)}
                      style={({ isActive }) => ({
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.2rem',
                        fontWeight: '600',
                        textDecoration: 'none',
                        color: isActive ? 'var(--color-cyan)' : 'var(--text-main)',
                        display: 'block'
                      })}
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}
              </ul>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {isAuthenticated ? (
                  <>
                    <Link
                      to="/dashboard"
                      onClick={() => setMobileOpen(false)}
                      className="btn btn-outline"
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '10px' }}
                    >
                      <User size={16} />
                      DASHBOARD
                    </Link>
                    <button
                      onClick={() => {
                        logoutUser();
                        setMobileOpen(false);
                      }}
                      className="btn btn-cyan"
                      style={{ width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '8px', padding: '10px', cursor: 'pointer' }}
                    >
                      <LogOut size={16} />
                      LOGOUT
                    </button>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      onClick={() => setMobileOpen(false)}
                      className="btn btn-outline"
                      style={{ width: '100%', textAlign: 'center', padding: '10px' }}
                    >
                      SIGN IN
                    </Link>
                    <Link
                      to="/events"
                      onClick={() => setMobileOpen(false)}
                      className="btn btn-cyan"
                      style={{ width: '100%', padding: '10px' }}
                    >
                      REGISTER NOW
                    </Link>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
