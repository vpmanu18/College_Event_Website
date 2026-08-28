import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { Users, Award, Ticket, GraduationCap } from 'lucide-react';

export const StatsSection = () => {
  const [stats, setStats] = useState({
    total_participants: 0,
    total_registrations: 0,
    total_events: 5,
    college: "KLE Society's Degree College"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStatsData = async () => {
      try {
        const data = await apiService.getStats();
        setStats(data);
      } catch (err) {
        console.warn('Failed to load live statistics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchStatsData();
  }, []);

  const statsItems = [
    {
      label: 'TOTAL PARTICIPANTS',
      value: stats.total_participants,
      suffix: stats.total_participants === 0 ? ' Participants' : ' Users',
      icon: <Users size={28} style={{ color: 'var(--color-cyan)' }} />,
      glow: 'var(--glow-cyan)'
    },
    {
      label: 'TOTAL EVENTS',
      value: stats.total_events,
      suffix: ' Categories',
      icon: <Award size={28} style={{ color: 'var(--color-purple)' }} />,
      glow: 'var(--glow-purple)'
    },
    {
      label: 'TOTAL REGISTRATIONS',
      value: stats.total_registrations,
      suffix: ' Seats Filled',
      icon: <Ticket size={28} style={{ color: '#ffb300' }} />,
      glow: '0 0 15px rgba(255, 179, 0, 0.2)'
    },
    {
      label: 'ORGANIZING COLLEGE',
      value: stats.college,
      isText: true,
      icon: <GraduationCap size={28} style={{ color: '#38ef7d' }} />,
      glow: '0 0 15px rgba(56, 239, 125, 0.2)'
    }
  ];

  return (
    <div style={{
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
      gap: '24px'
    }}>
      {statsItems.map((item, index) => (
        <div 
          key={index}
          className="glass-panel"
          style={{
            padding: '30px 24px',
            display: 'flex',
            alignItems: 'center',
            gap: '20px',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Subtle background glow */}
          <div style={{
            position: 'absolute',
            width: '80px',
            height: '80px',
            borderRadius: '50%',
            background: item.glow.replace('0 0 15px', '').trim(),
            opacity: 0.05,
            top: '-20px',
            right: '-20px',
            pointerEvents: 'none'
          }} />

          {/* Left Icon */}
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.02)',
            border: '1px solid var(--border-color-dim)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0
          }}>
            {item.icon}
          </div>

          {/* Value / Stats Info */}
          <div>
            <span style={{
              display: 'block',
              fontSize: '0.75rem',
              fontWeight: '700',
              color: 'var(--text-muted)',
              letterSpacing: '0.1em',
              marginBottom: '4px'
            }}>
              {item.label}
            </span>

            {loading ? (
              <div className="skeleton" style={{ width: '80px', height: '28px', marginTop: '4px' }} />
            ) : item.isText ? (
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1rem',
                fontWeight: '700',
                color: 'var(--text-main)',
                lineHeight: '1.2',
                display: 'block'
              }}>
                {item.value}
              </span>
            ) : (
              <span style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'var(--text-main)',
                lineHeight: '1.2',
                display: 'flex',
                alignItems: 'baseline',
                gap: '4px'
              }}>
                {item.value}
                <span style={{
                  fontSize: '0.8rem',
                  fontWeight: '500',
                  color: 'var(--text-dim)'
                }}>
                  {item.suffix}
                </span>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};
