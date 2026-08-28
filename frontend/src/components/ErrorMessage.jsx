import React from 'react';
import { AlertCircle } from 'lucide-react';

export const ErrorMessage = ({ message }) => {
  return (
    <div className="glass-panel" style={{
      border: '1px solid rgba(255, 56, 56, 0.25)',
      background: 'rgba(255, 56, 56, 0.05)',
      padding: '20px',
      borderRadius: '12px',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      margin: '20px 0',
      maxWidth: '600px',
      width: '100%'
    }}>
      <AlertCircle color="var(--color-red)" size={28} style={{ flexShrink: 0 }} />
      <div>
        <h4 style={{
          fontFamily: 'var(--font-display)',
          color: '#ffffff',
          fontWeight: '600',
          marginBottom: '4px'
        }}>Error Occurred</h4>
        <p style={{
          fontSize: '0.9rem',
          color: 'var(--text-muted)'
        }}>{message}</p>
      </div>
    </div>
  );
};
