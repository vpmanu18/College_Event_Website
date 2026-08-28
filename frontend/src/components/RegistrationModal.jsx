import React, { useState } from 'react';
import { apiService } from '../services/api';
import { LoadingSpinner } from './LoadingSpinner';
import { ErrorMessage } from './ErrorMessage';
import { Ticket, X, User, Phone, Mail, CheckCircle, School } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const RegistrationModal = ({ event, onClose }) => {
  // Form Fields
  const [formData, setFormData] = useState({
    participant_name: '',
    mobile_number: '',
    email: '',
    college_name: ''
  });
  
  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successData, setSuccessData] = useState(null);

  // Form Validation Errors
  const [fieldErrors, setFieldErrors] = useState({});

  if (!event) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear validation error on type
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[6-9]\d{9}$/;

    if (!formData.participant_name.trim() || formData.participant_name.trim().length < 2) {
      errors.participant_name = 'Name is required (at least 2 characters).';
    }

    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Please provide a valid Gmail/email address.';
    }

    if (!formData.mobile_number.trim() || !phoneRegex.test(formData.mobile_number)) {
      errors.mobile_number = 'Provide a valid 10-digit Indian mobile number starting with 6-9.';
    }

    if (!formData.college_name.trim() || formData.college_name.trim().length < 2) {
      errors.college_name = 'College name is required (at least 2 characters).';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const res = await apiService.register({
        ...formData,
        event_id: event.id
      });
      setSuccessData(res.registration);
      // Automatically refresh the event counts if the parent does a reload,
      // but for simplicity we show success message here.
    } catch (err) {
      setSubmitError(err.message || 'Registration could not be completed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AnimatePresence>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'var(--bg-modal)',
        backdropFilter: 'blur(10px)',
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '20px',
        boxSizing: 'border-box'
      }}>
        {/* Modal Card Backdrop Click */}
        <div style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0 }} onClick={onClose} />

        {/* Modal Card Body */}
        <motion.div 
          className="glass-panel" 
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: '550px',
            padding: '35px',
            zIndex: 1001,
            maxHeight: '90vh',
            overflowY: 'auto',
            border: successData ? '1px solid rgba(56, 239, 125, 0.3)' : '1px solid rgba(0, 240, 255, 0.25)',
            boxShadow: successData ? '0 0 25px rgba(56, 239, 125, 0.15)' : '0 0 25px rgba(0, 240, 255, 0.15)'
          }}
          initial={{ scale: 0.95, opacity: 0, y: 10 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.95, opacity: 0, y: 10 }}
          transition={{ duration: 0.3 }}
        >
          {/* Close Button */}
          <button 
            onClick={onClose}
            style={{
              position: 'absolute',
              top: '20px',
              right: '20px',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid var(--border-color-dim)',
              borderRadius: '50%',
              width: '36px',
              height: '36px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: 'var(--text-muted)',
              transition: 'var(--transition-smooth)'
            }}
            className="nav-arrow"
          >
            <X size={18} />
          </button>

          {/* Success Screen */}
          {successData ? (
            <div style={{ textAlign: 'center' }}>
              <CheckCircle size={52} style={{ color: '#38ef7d', marginBottom: '15px' }} />
              
              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.8rem',
                fontWeight: '800',
                color: 'var(--text-main)',
                marginBottom: '8px'
              }}>REGISTRATION SUCCESSFUL</h2>
              
              <p style={{
                color: 'var(--text-muted)',
                fontSize: '0.9rem',
                marginBottom: '25px',
                lineHeight: '1.5'
              }}>"You're officially registered for TECH FEST 2K26-27."</p>

              {/* Receipt Summary Card */}
              <div style={{
                background: 'rgba(255,255,255,0.01)',
                border: '1px solid var(--border-color-dim)',
                borderRadius: '12px',
                padding: '20px',
                textAlign: 'left',
                display: 'flex',
                flexDirection: 'column',
                gap: '10px',
                marginBottom: '25px'
              }}>
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>PARTICIPANT NAME</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '600' }}>{successData.participant_name}</span>
                </div>
                <div style={{ height: '1px', background: 'var(--border-color-dim)' }} />

                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>COLLEGE NAME</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-main)', fontWeight: '600' }}>{successData.college_name || 'KLE Society Degree College'}</span>
                </div>
                <div style={{ height: '1px', background: 'var(--border-color-dim)' }} />
                
                <div>
                  <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>REGISTERED EVENT</span>
                  <span style={{ fontSize: '0.95rem', color: 'var(--color-cyan)', fontWeight: '600' }}>{successData.event_name}</span>
                </div>
                <div style={{ height: '1px', background: 'var(--border-color-dim)' }} />

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>REGISTRATION ID</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '500', wordBreak: 'break-all' }}>{successData.id.slice(0, 8)}...</span>
                  </div>
                  <div>
                    <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', display: 'block' }}>DATE</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-main)', fontWeight: '500' }}>{new Date(successData.registered_at).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              <button onClick={onClose} className="btn btn-cyan" style={{ width: '100%', padding: '12px' }}>
                CLOSE WINDOW
              </button>
            </div>
          ) : (
            // Form Screen
            <div>
              <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '25px', paddingRight: '35px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: 'rgba(0, 240, 255, 0.05)',
                  border: '1px solid rgba(0, 240, 255, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-cyan)',
                  flexShrink: 0
                }}>
                  <Ticket size={22} />
                </div>
                <div>
                  <span style={{ fontSize: '0.7rem', fontWeight: '700', color: 'var(--text-dim)', display: 'block', textTransform: 'uppercase' }}>
                    REGISTER FOR:
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-main)', fontSize: '1.25rem', fontWeight: '800', lineHeight: '1.2' }}>
                    {event.name}
                  </h3>
                </div>
              </div>

              {submitError && (
                <div style={{ marginBottom: '20px' }}>
                  <ErrorMessage message={submitError} />
                </div>
              )}

              {isSubmitting ? (
                <div style={{ padding: '40px 0', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
                  <LoadingSpinner />
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Processing registration, please wait...</span>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                  
                  {/* Name */}
                  <div>
                    <label htmlFor="participant_name" className="form-label" style={{ fontSize: '0.8rem', marginBottom: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <User size={13} /> Participant Full Name
                      </span>
                    </label>
                    <input
                      id="participant_name"
                      type="text"
                      name="participant_name"
                      value={formData.participant_name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your name"
                      style={{ padding: '10px 14px' }}
                    />
                    {fieldErrors.participant_name && (
                      <span style={{ color: 'var(--color-red)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                        {fieldErrors.participant_name}
                      </span>
                    )}
                  </div>

                  {/* Email */}
                  <div>
                    <label htmlFor="email" className="form-label" style={{ fontSize: '0.8rem', marginBottom: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Mail size={13} /> Gmail / Email ID
                      </span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="example@gmail.com"
                      style={{ padding: '10px 14px' }}
                    />
                    {fieldErrors.email && (
                      <span style={{ color: 'var(--color-red)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                        {fieldErrors.email}
                      </span>
                    )}
                  </div>

                  {/* Mobile */}
                  <div>
                    <label htmlFor="mobile_number" className="form-label" style={{ fontSize: '0.8rem', marginBottom: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <Phone size={13} /> Indian Mobile Number (10 Digits)
                      </span>
                    </label>
                    <input
                      id="mobile_number"
                      type="tel"
                      name="mobile_number"
                      value={formData.mobile_number}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="9876543210"
                      maxLength={10}
                      style={{ padding: '10px 14px' }}
                    />
                    {fieldErrors.mobile_number && (
                      <span style={{ color: 'var(--color-red)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                        {fieldErrors.mobile_number}
                      </span>
                    )}
                  </div>

                  {/* College Name */}
                  <div>
                    <label htmlFor="college_name" className="form-label" style={{ fontSize: '0.8rem', marginBottom: '6px' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <School size={13} /> College Name
                      </span>
                    </label>
                    <input
                      id="college_name"
                      type="text"
                      name="college_name"
                      value={formData.college_name}
                      onChange={handleChange}
                      className="form-input"
                      placeholder="Enter your college name"
                      style={{ padding: '10px 14px' }}
                    />
                    {fieldErrors.college_name && (
                      <span style={{ color: 'var(--color-red)', fontSize: '0.75rem', marginTop: '4px', display: 'block' }}>
                        {fieldErrors.college_name}
                      </span>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="btn btn-cyan animate-pulse-glow"
                    style={{
                      width: '100%',
                      padding: '12px',
                      marginTop: '10px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '0.9rem',
                      fontWeight: '700'
                    }}
                  >
                    SUBMIT REGISTRATION
                  </button>
                </form>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
