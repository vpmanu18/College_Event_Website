import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { EventCard } from './EventCard';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { RegistrationModal } from './RegistrationModal';
import { Search, Filter, ArrowUpDown, LayoutGrid, Clock } from 'lucide-react';
import { motion } from 'framer-motion';

export const EventGrid = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filtering and sorting state
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('All');
  const [sortBy, setSortBy] = useState('name'); // name, time, registrations
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [viewMode, setViewMode] = useState('grid'); // 'grid' or 'timeline'

  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        setLoading(true);
        const data = await apiService.getEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Unable to load events. Please try again.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventsList();
  }, []);

  const categories = ['All', 'coding', 'debugging', 'challenge'];

  // Filter events based on search and category
  const filteredEvents = events.filter(event => {
    const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          event.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = activeCategory === 'All' || event.category.toLowerCase() === activeCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  // Sort events
  const sortedEvents = [...filteredEvents].sort((a, b) => {
    if (sortBy === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortBy === 'time') {
      return a.event_time.localeCompare(b.event_time);
    } else if (sortBy === 'registrations') {
      return (b.participant_count || 0) - (a.participant_count || 0);
    }
    return 0;
  });

  if (loading) {
    return (
      <div style={{ padding: '60px 0' }}>
        <LoadingSpinner />
        <div className="container" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          marginTop: '30px'
        }}>
          {[1, 2, 3].map(i => (
            <div key={i} className="glass-panel" style={{ height: '350px', padding: '24px' }}>
              <div className="skeleton" style={{ width: '40%', height: '24px', marginBottom: '20px' }} />
              <div className="skeleton" style={{ width: '100%', height: '80px', marginBottom: '20px' }} />
              <div className="skeleton" style={{ width: '60%', height: '20px', marginBottom: '10px' }} />
              <div className="skeleton" style={{ width: '50%', height: '20px', marginBottom: '30px' }} />
              <div style={{ display: 'flex', gap: '15px' }}>
                <div className="skeleton" style={{ flex: 1, height: '40px' }} />
                <div className="skeleton" style={{ flex: 1, height: '40px' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '40px 0' }}>
        <ErrorMessage message={error} />
      </div>
    );
  }

  return (
    <div>
      {/* Search, Filter, Sort Controls Panel */}
      <div className="glass-panel" style={{
        padding: '24px',
        marginBottom: '40px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '20px',
        alignItems: 'center',
        justifyContent: 'space-between'
      }}>
        {/* Search */}
        <div style={{
          position: 'relative',
          flex: '1 1 300px'
        }}>
          <Search size={18} style={{
            position: 'absolute',
            left: '16px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--text-dim)'
          }} />
          <input
            type="text"
            placeholder="Search events (e.g. Hackathon, Coding...)"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ paddingLeft: '45px' }}
          />
        </div>

        {/* Categories filters */}
        <div style={{
          display: 'flex',
          gap: '8px',
          flexWrap: 'wrap'
        }}>
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              style={{
                background: activeCategory === category ? 'var(--color-cyan)' : 'rgba(255,255,255,0.03)',
                color: activeCategory === category ? '#000' : 'var(--text-main)',
                border: activeCategory === category ? '1px solid var(--color-cyan)' : '1px solid var(--border-color-dim)',
                padding: '8px 16px',
                borderRadius: '20px',
                cursor: 'pointer',
                fontFamily: 'var(--font-display)',
                fontWeight: '600',
                fontSize: '0.85rem',
                textTransform: 'uppercase',
                transition: 'var(--transition-smooth)'
              }}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <ArrowUpDown size={16} style={{ color: 'var(--text-muted)' }} />
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              background: 'var(--bg-card-opaque)',
              border: '1px solid var(--border-color-dim)',
              color: 'var(--text-main)',
              padding: '10px 16px',
              borderRadius: '8px',
              fontFamily: 'var(--font-display)',
              cursor: 'pointer',
              outline: 'none'
            }}
          >
            <option value="name">Sort by: Name (A-Z)</option>
            <option value="time">Sort by: Start Time</option>
            <option value="registrations">Sort by: Registrations</option>
          </select>
        </div>

        {/* Toggle Grid vs Timeline */}
        <div style={{
          display: 'flex',
          border: '1px solid var(--border-color-dim)',
          borderRadius: '20px',
          background: 'var(--bg-tab-container)',
          padding: '2px',
          gap: '2px'
        }}>
          <button
            onClick={() => setViewMode('grid')}
            style={{
              background: viewMode === 'grid' ? 'var(--color-cyan)' : 'transparent',
              color: viewMode === 'grid' ? '#000' : 'var(--text-muted)',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '18px',
              cursor: 'pointer',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'var(--transition-smooth)'
            }}
          >
            <LayoutGrid size={13} />
            GRID
          </button>
          <button
            onClick={() => setViewMode('timeline')}
            style={{
              background: viewMode === 'timeline' ? 'var(--color-cyan)' : 'transparent',
              color: viewMode === 'timeline' ? '#000' : 'var(--text-muted)',
              border: 'none',
              padding: '6px 14px',
              borderRadius: '18px',
              cursor: 'pointer',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              fontSize: '0.75rem',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              transition: 'var(--transition-smooth)'
            }}
          >
            <Clock size={13} />
            TIMELINE
          </button>
        </div>
      </div>

      {/* Events Catalogue Grid or Timeline */}
      {sortedEvents.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px'
        }}>
          <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-muted)', marginBottom: '10px' }}>
            No Events Found
          </h3>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.95rem' }}>
            Try adjusting your search terms or category filters.
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px'
        }}>
          {sortedEvents.map(event => (
            <div key={event.id}>
              <EventCard event={event} onRegister={(e) => setSelectedEvent(e)} />
            </div>
          ))}
        </div>
      ) : (
        <div style={{
          position: 'relative',
          padding: '20px 0 20px 30px',
          margin: '0 auto',
          maxWidth: '850px'
        }}>
          {/* Central Vertical Connector Line */}
          <div style={{
            position: 'absolute',
            left: '12px',
            top: '0',
            width: '2px',
            height: '100%',
            background: 'linear-gradient(to bottom, var(--color-cyan) 0%, var(--color-purple) 100%)',
            boxShadow: '0 0 10px rgba(2, 132, 199, 0.2)'
          }} />

          {/* Sorted Events in Timeline */}
          {sortedEvents.map((event, idx) => {
            const isCoding = event.category.toLowerCase() === 'coding';
            const isDebugging = event.category.toLowerCase() === 'debugging';
            const catColor = isCoding ? 'var(--color-cyan)' : (isDebugging ? 'var(--color-purple)' : 'var(--color-emerald)');
            const catBg = isCoding ? 'rgba(2, 132, 199, 0.05)' : (isDebugging ? 'rgba(56, 189, 248, 0.05)' : 'rgba(16, 185, 129, 0.05)');

            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                style={{
                  position: 'relative',
                  marginBottom: '35px',
                  display: 'flex',
                  flexDirection: 'column'
                }}
              >
                {/* Timeline Node Dot */}
                <div style={{
                  position: 'absolute',
                  left: '-26px', 
                  top: '20px',
                  width: '16px',
                  height: '16px',
                  borderRadius: '50%',
                  backgroundColor: '#ffffff',
                  border: `3px solid ${catColor}`,
                  boxShadow: `0 0 8px ${catColor}`,
                  zIndex: 2
                }} />

                {/* Timeline Card */}
                <div 
                  className="glass-panel"
                  style={{
                    padding: '24px 30px',
                    marginLeft: '15px',
                    borderLeft: `4px solid ${catColor}`,
                    background: 'var(--bg-card)',
                    display: 'grid',
                    gridTemplateColumns: '1fr',
                    gap: '15px',
                    boxShadow: '0 4px 20px rgba(0,0,0,0.02)'
                  }}
                >
                  {/* Top line: Time badge & Category */}
                  <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
                    <div style={{
                      backgroundColor: catBg,
                      border: `1px solid ${catColor}`,
                      color: catColor,
                      padding: '4px 12px',
                      borderRadius: '15px',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      fontFamily: 'var(--font-display)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}>
                      <span style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: catColor
                      }} />
                      {event.event_time} - {event.location}
                    </div>

                    <span style={{
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      color: 'var(--text-dim)',
                      letterSpacing: '0.05em'
                    }}>
                      Category: {event.category}
                    </span>
                  </div>

                  {/* Title & Description */}
                  <div>
                    <h3 style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.3rem',
                      fontWeight: '800',
                      color: 'var(--text-main)',
                      marginBottom: '8px'
                    }}>
                      {event.name}
                    </h3>
                    <p style={{
                      color: 'var(--text-muted)',
                      fontSize: '0.9rem',
                      lineHeight: '1.5'
                    }}>
                      {event.description}
                    </p>
                  </div>

                  {/* Live Progress Slots Bar */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-dim)' }}>
                      <span>SEATS REGISTERED: {event.participant_count || 0} / {event.participant_limit || 50}</span>
                      <span>{Math.round(((event.participant_count || 0) / (event.participant_limit || 50)) * 100)}% FULL</span>
                    </div>
                    <div style={{ width: '100%', height: '6px', backgroundColor: 'rgba(15,23,42,0.06)', borderRadius: '3px', overflow: 'hidden' }}>
                      <div style={{
                        width: `${Math.min(100, ((event.participant_count || 0) / (event.participant_limit || 50)) * 100)}%`,
                        height: '100%',
                        backgroundColor: catColor,
                        borderRadius: '3px',
                        boxShadow: `0 0 8px ${catColor}`
                      }} />
                    </div>
                  </div>

                  {/* Actions */}
                  <div style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    borderTop: '1px solid var(--border-color-dim)',
                    paddingTop: '15px',
                    marginTop: '5px'
                  }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-dim)', fontWeight: '600' }}>
                      Entry Fee: <span style={{ color: catColor }}>{event.entry_fee > 0 ? `₹${event.entry_fee}` : 'FREE'}</span>
                    </span>
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => setSelectedEvent(event)}
                        disabled={event.participant_count >= (event.participant_limit || 50)}
                        className={`btn ${event.participant_count >= (event.participant_limit || 50) ? 'btn-outline' : 'btn-cyan'}`}
                        style={{ padding: '8px 16px', fontSize: '0.8rem', fontWeight: '700' }}
                      >
                        {event.participant_count >= (event.participant_limit || 50) ? 'FULL' : 'REGISTER NOW'}
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {selectedEvent && (
        <RegistrationModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      )}
    </div>
  );
};
