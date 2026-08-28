import React from 'react';
import { EventGrid } from '../components/EventGrid';

export const Events = () => {
  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: '700',
            color: 'var(--color-cyan)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>EXPLORE CHALLENGES</h4>
          <h1 className="gradient-text-cyan-purple" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '15px'
          }}>
            OFFICIAL FESTIVAL EVENTS
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            maxWidth: '600px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Select from our coding hackathon, debugging challenges, algorithm evaluations, and tactical campus quests. Choose your event and register today.
          </p>
        </div>

        {/* Dynamic Filterable Event Grid */}
        <EventGrid />
      </div>
    </div>
  );
};
