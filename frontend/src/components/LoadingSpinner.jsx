import React from 'react';

export const LoadingSpinner = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: '40px 20px',
      gap: '15px'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '3px solid rgba(0, 240, 255, 0.1)',
        borderTop: '3px solid var(--color-cyan)',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <span style={{
        fontFamily: 'var(--font-display)',
        color: 'var(--text-muted)',
        fontSize: '0.9rem',
        letterSpacing: '0.1em'
      }}>LOADING DATA...</span>
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};
