import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { User, LogOut, Ticket, Calendar, MapPin, Clock, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export const Dashboard = () => {
  const { user, logoutUser } = useAuth();
  const navigate = useNavigate();
  
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const data = await apiService.getDashboard();
        setRegistrations(data.registrations || []);
        setError(null);
      } catch (err) {
        setError(err.message || 'Could not load dashboard data.');
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  const handleLogout = () => {
    logoutUser();
    navigate('/');
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 0 100px 0', minHeight: '80vh' }}>
      <div className="container">
        
        {/* Dashboard Header Bar */}
        <div className="glass-panel" style={{
          padding: '30px 40px',
          marginBottom: '40px',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
            <div style={{
              width: '60px',
              height: '60px',
              borderRadius: '50%',
              background: 'rgba(0, 240, 255, 0.05)',
              border: '1px solid rgba(0, 240, 255, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-cyan)',
              flexShrink: 0
            }}>
              <User size={30} />
            </div>
            <div>
              <span style={{ fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-dim)', display: 'block' }}>
                PARTICIPANT PROFILE
              </span>
              <h1 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-main)', fontSize: '1.6rem', fontWeight: '800' }}>
                {user?.name}
              </h1>
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{user?.email}</span>
            </div>
          </div>

          <button 
            onClick={handleLogout} 
            className="btn btn-outline"
            style={{
              padding: '10px 24px',
              fontSize: '0.9rem',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              color: 'var(--text-main)'
            }}
          >
            <LogOut size={16} />
            LOGOUT
          </button>
        </div>

        {error && <div style={{ marginBottom: '30px' }}><ErrorMessage message={error} /></div>}

        {/* Dynamic Registrations List */}
        <div>
          <h2 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.4rem',
            color: 'var(--text-main)',
            fontWeight: '800',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <Ticket size={22} style={{ color: 'var(--color-cyan)' }} />
            YOUR REGISTERED EVENTS
          </h2>

          {registrations.length === 0 ? (
            <div className="glass-panel" style={{
              padding: '50px 20px',
              textAlign: 'center'
            }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', marginBottom: '20px' }}>
                No registrations yet.
              </p>
              <Link to="/events" className="btn btn-cyan">
                DISCOVER & REGISTER FOR EVENTS
              </Link>
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
              gap: '24px'
            }}>
              {registrations.map((reg) => (
                <motion.div 
                  key={reg.registration_id}
                  className="glass-panel-neon-cyan"
                  style={{
                    padding: '24px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'space-between',
                    minHeight: '230px'
                  }}
                  whileHover={{ y: -3 }}
                >
                  <div>
                    {/* Header: Title & Confirmation status */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '15px' }}>
                      <h3 style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1.25rem',
                        color: 'var(--text-main)',
                        fontWeight: '700',
                        maxWidth: '75%',
                        lineHeight: '1.2'
                      }}>
                        {reg.event_name}
                      </h3>
                      <span style={{
                        background: 'rgba(56, 239, 125, 0.08)',
                        border: '1px solid rgba(56, 239, 125, 0.25)',
                        color: '#38ef7d',
                        fontSize: '0.7rem',
                        fontWeight: '700',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        letterSpacing: '0.05em'
                      }}>
                        {reg.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Meta info */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '8px',
                      fontSize: '0.85rem',
                      color: 'var(--text-muted)',
                      borderTop: '1px solid var(--border-color-dim)',
                      paddingTop: '12px',
                      marginBottom: '20px'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Calendar size={14} style={{ color: 'var(--color-cyan)' }} />
                        <span>Date: {new Date(reg.event_date).toLocaleDateString(undefined, { day: 'numeric', month: 'long', year: 'numeric' })}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <Clock size={14} style={{ color: 'var(--color-purple)' }} />
                        <span>Start Time: {reg.event_time}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <MapPin size={14} style={{ color: '#38ef7d' }} />
                        <span>Venue: {reg.venue}</span>
                      </div>
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-color-dim)',
                    paddingTop: '15px'
                  }}>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', wordBreak: 'break-all', maxWidth: '60%' }}>
                      ID: {reg.registration_id.slice(0, 18)}...
                    </span>
                    
                    {reg.event_slug && (
                      <Link 
                        to={`/events/${reg.event_slug}`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px',
                          color: 'var(--color-cyan)',
                          textDecoration: 'none',
                          fontSize: '0.85rem',
                          fontWeight: '600',
                          fontFamily: 'var(--font-display)'
                        }}
                        className="nav-item-hover"
                      >
                        VIEW DETAILS
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
