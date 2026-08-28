import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Code, EyeOff, Bug, Cpu, Compass, MapPin, Clock, Users, ArrowRight, 
  Layout, Database, Keyboard, Target, Bot, Flag, Wrench, Tag 
} from 'lucide-react';
import { motion } from 'framer-motion';

export const EventCard = ({ event, onRegister }) => {
  // Select icon based on event slug
  const getIcon = (slug) => {
    switch (slug) {
      case 'hackathon':
        return <Code size={24} className="text-glow-cyan" style={{ color: 'var(--color-cyan)' }} />;
      case 'blind-coding':
        return <EyeOff size={24} className="text-glow-purple" style={{ color: 'var(--color-purple)' }} />;
      case 'error-debugging':
        return <Bug size={24} style={{ color: '#ff5e57' }} />;
      case 'dsa-coding':
        return <Cpu size={24} style={{ color: '#38ef7d' }} />;
      case 'treasure-hunt':
        return <Compass size={24} style={{ color: '#ffb300' }} />;
      case 'web-design-showdown':
        return <Layout size={24} style={{ color: 'var(--color-cyan)' }} />;
      case 'sql-murder-mystery':
        return <Database size={24} style={{ color: '#00d2d3' }} />;
      case 'speed-typing-duel':
        return <Keyboard size={24} style={{ color: '#ff9f43' }} />;
      case 'code-golfing':
        return <Target size={24} style={{ color: '#10ac84' }} />;
      case 'ai-prompt-engineering':
        return <Bot size={24} style={{ color: '#5f27cd' }} />;
      case 'capture-the-flag':
        return <Flag size={24} style={{ color: '#ee5253' }} />;
      case 'code-refactoring-arena':
        return <Wrench size={24} style={{ color: '#0abde3' }} />;
      default:
        return <Code size={24} />;
    }
  };

  const isHackathonOrBlind = event.slug === 'hackathon' || event.slug === 'blind-coding';
  const panelClass = isHackathonOrBlind ? 'glass-panel-neon-cyan' : 'glass-panel-neon-purple';

  return (
    <motion.div 
      className={panelClass}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        padding: '24px',
        position: 'relative',
        overflow: 'hidden'
      }}
      whileHover={{ y: -5 }}
      transition={{ duration: 0.3 }}
    >
      {/* Corner category tag */}
      <span style={{
        position: 'absolute',
        top: '15px',
        right: '15px',
        fontSize: '0.65rem',
        textTransform: 'uppercase',
        letterSpacing: '0.1em',
        padding: '3px 8px',
        borderRadius: '4px',
        background: 'var(--border-color-dim)',
        border: '1px solid var(--border-color-dim)',
        color: 'var(--text-muted)'
      }}>
        {event.category}
      </span>

      {/* Header Info */}
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '18px' }}>
        <div style={{
          width: '50px',
          height: '50px',
          borderRadius: '12px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid var(--border-color-dim)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          {getIcon(event.slug)}
        </div>
        <div>
          <h3 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '1.25rem',
            fontWeight: '700',
            color: 'var(--text-main)',
            lineHeight: '1.2'
          }}>{event.name}</h3>
        </div>
      </div>

      {/* Description */}
      <p style={{
        fontSize: '0.9rem',
        color: 'var(--text-muted)',
        lineHeight: '1.5',
        marginBottom: '20px',
        flexGrow: 1
      }}>
        {event.description}
      </p>

      {/* Metadata (Location, Time, Registered Counts, Fee) */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        fontSize: '0.85rem',
        color: 'var(--text-muted)',
        marginBottom: '22px',
        borderTop: '1px solid var(--border-color-dim)',
        paddingTop: '15px'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <MapPin size={14} className="text-glow-cyan" style={{ color: 'var(--color-cyan)' }} />
          <span>Location: {event.location}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Clock size={14} style={{ color: 'var(--color-purple)' }} />
          <span>Time: {event.event_time}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Users size={14} style={{ color: '#38ef7d' }} />
          <span style={{ fontWeight: '500' }}>
            Slots: {event.participant_count ?? 0} / 50 filled
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <Tag size={14} style={{ color: '#ffb300' }} />
          <span style={{ fontWeight: '600', color: event.entry_fee === 0 ? '#38ef7d' : 'var(--color-cyan)' }}>
            Entry Fee: {event.entry_fee === 0 ? 'Free' : `₹${event.entry_fee}`}
          </span>
        </div>
      </div>

      {/* Buttons */}
      <div style={{ display: 'flex', gap: '10px' }}>
        <Link 
          to={`/events/${event.slug}`} 
          className="btn btn-outline"
          style={{
            flex: 1,
            padding: '10px 12px',
            fontSize: '0.8rem',
            textAlign: 'center',
            justifyContent: 'center',
            borderRadius: '8px'
          }}
        >
          View Details
        </Link>
        <button 
          onClick={() => onRegister(event)} 
          className={event.participant_count >= 50 ? "btn btn-disabled" : "btn btn-cyan"}
          disabled={event.participant_count >= 50}
          style={{
            flex: 1,
            padding: '10px 12px',
            fontSize: '0.8rem',
            textAlign: 'center',
            justifyContent: 'center',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            border: 'none',
            cursor: event.participant_count >= 50 ? 'not-allowed' : 'pointer'
          }}
        >
          {event.participant_count >= 50 ? 'Full' : 'Register'}
          {event.participant_count < 50 && <ArrowRight size={12} />}
        </button>
      </div>
    </motion.div>
  );
};
