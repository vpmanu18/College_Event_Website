import React, { useState } from 'react';
import { apiService } from '../services/api';
import { ErrorMessage } from '../components/ErrorMessage';
import { Mail, Phone, MapPin, Send, MessageSquare, CheckCircle, Navigation } from 'lucide-react';
import { motion } from 'framer-motion';

export const Contact = () => {
  const mapLink = "https://www.google.com/maps/place/KLE+Degree+College/data=!4m2!3m1!1s0x0:0xe4b81fe55f298ab2?sa=X&ved=1t:2428&ictx=11";

  // Form Fields
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  // UI States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(null);
  const [successMsg, setSuccessMsg] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    if (fieldErrors[e.target.name]) {
      setFieldErrors(prev => ({ ...prev, [e.target.name]: null }));
    }
  };

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.name.trim() || formData.name.trim().length < 2) {
      errors.name = 'Name is required (at least 2 characters).';
    }
    if (!formData.email.trim() || !emailRegex.test(formData.email)) {
      errors.email = 'Valid Email / Gmail is required.';
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      errors.message = 'Message must be at least 5 characters long.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError(null);
    setSuccessMsg(null);

    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      const res = await apiService.submitContact(formData);
      setSuccessMsg(res.message || 'Thank you for reaching out!');
      setFormData({ name: '', email: '', message: '' }); // reset form
    } catch (err) {
      setSubmitError(err.message || 'Failed to submit form. Please check your inputs and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={{ padding: '60px 0 100px 0' }}>
      <div className="container">
        
        {/* Page Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h4 style={{
            fontFamily: 'var(--font-display)',
            fontSize: '0.85rem',
            fontWeight: '700',
            color: 'var(--color-cyan)',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            marginBottom: '10px'
          }}>CONNECT DESK</h4>
          <h1 className="gradient-text-cyan-purple" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.5rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '15px'
          }}>
            CONTACT US
          </h1>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: '600px', margin: '0 auto', lineHeight: '1.6' }}>
            Have questions regarding registrations, guidelines, or event schedules? Get in touch with the KLE organizing committee.
          </p>
        </div>

        {/* Form and Info Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start'
        }}>
          
          {/* Left Column: Official details */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
            
            {/* Contact Details Card */}
            <div className="glass-panel" style={{ padding: '30px' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '700', marginBottom: '25px' }}>
                KLE SOCIETY'S COLLEGE OF BCA
              </h3>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Location */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'flex-start' }}>
                  <MapPin size={20} style={{ color: 'var(--color-cyan)', marginTop: '3px', flexShrink: 0 }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-dim)' }}>CAMPUS ADDRESS</span>
                    <address style={{ color: 'var(--text-muted)', fontSize: '0.95rem', fontStyle: 'normal', lineHeight: '1.5' }}>
                      KLE Campus, Koppal Road,<br/>
                      Dist. Koppal, Vaddarahatti,<br/>
                      Gangavathi &ndash; 583235
                    </address>
                  </div>
                </div>

                {/* Phone */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <Phone size={20} style={{ color: 'var(--color-purple)', flexShrink: 0 }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-dim)' }}>PHONE HELPLINE</span>
                    <a href="tel:+919483482741" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', textDecoration: 'none' }}>
                      +91 9483482741
                    </a>
                  </div>
                </div>

                {/* Email */}
                <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
                  <Mail size={20} style={{ color: '#38ef7d', flexShrink: 0 }} />
                  <div>
                    <span style={{ display: 'block', fontSize: '0.75rem', fontWeight: '700', color: 'var(--text-dim)' }}>EMAIL INQUIRIES</span>
                    <a href="mailto:klesbcagvt@gmail.com" style={{ color: 'var(--text-muted)', fontSize: '0.95rem', textDecoration: 'none' }}>
                      klesbcagvt@gmail.com
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Google Map Embedding */}
            <div className="glass-panel" style={{ padding: '24px', overflow: 'hidden' }}>
              <div style={{ border: '1px solid var(--border-color-dim)', borderRadius: '8px', overflow: 'hidden', height: '180px', marginBottom: '15px' }}>
                <iframe 
                  title="Official map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3844.75704179373!2d76.353347!3d15.4214532!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bb809ea6ff8848b%3A0xe4b81fe55f298ab2!2sKLE%20Degree%20College!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) grayscale(10%)' }} 
                  allowFullScreen="" 
                  loading="lazy"
                />
              </div>
              <a 
                href={mapLink} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="btn btn-outline" 
                style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.85rem' }}
              >
                <Navigation size={14} />
                LAUNCH CAMPUS DIRECTIONS
              </a>
            </div>

          </div>

          {/* Right Column: Contact form */}
          <div className="glass-panel" style={{ padding: '40px' }}>
            <div style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '25px' }}>
              <MessageSquare size={24} style={{ color: 'var(--color-cyan)' }} />
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', color: 'var(--text-main)', fontWeight: '700' }}>
                LEAVE A MESSAGE
              </h3>
            </div>

            {submitError && <div style={{ marginBottom: '20px' }}><ErrorMessage message={submitError} /></div>}
            
            {successMsg && (
              <div style={{
                background: 'rgba(56, 239, 125, 0.05)',
                border: '1px solid rgba(56, 239, 125, 0.25)',
                padding: '18px',
                borderRadius: '8px',
                color: '#38ef7d',
                fontSize: '0.9rem',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                marginBottom: '20px'
              }}>
                <CheckCircle size={18} />
                {successMsg}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Name */}
              <div>
                <label className="form-label">Your Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter your full name"
                  disabled={isSubmitting}
                />
                {fieldErrors.name && (
                  <span style={{ color: 'var(--color-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                    {fieldErrors.name}
                  </span>
                )}
              </div>

              {/* Email */}
              <div>
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="name@example.com"
                  disabled={isSubmitting}
                />
                {fieldErrors.email && (
                  <span style={{ color: 'var(--color-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                    {fieldErrors.email}
                  </span>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="form-label">Your Message</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Write your comments or questions..."
                  rows={4}
                  style={{ resize: 'vertical' }}
                  disabled={isSubmitting}
                />
                {fieldErrors.message && (
                  <span style={{ color: 'var(--color-red)', fontSize: '0.8rem', marginTop: '4px', display: 'block' }}>
                    {fieldErrors.message}
                  </span>
                )}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="btn btn-cyan animate-pulse-glow"
                style={{
                  width: '100%',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  'SENDING MESSAGE...'
                ) : (
                  <>
                    SEND MESSAGE
                    <Send size={16} />
                  </>
                )}
              </button>

            </form>
          </div>

        </div>

      </div>
    </div>
  );
};
