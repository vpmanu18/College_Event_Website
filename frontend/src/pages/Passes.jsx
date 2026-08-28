import React, { useState, useEffect } from 'react';
import { apiService } from '../services/api';
import { LoadingSpinner } from '../components/LoadingSpinner';
import { ErrorMessage } from '../components/ErrorMessage';
import { 
  Ticket, Check, Gift, Sparkles, AlertCircle, ShoppingBag, 
  QrCode, User, Mail, Download, ArrowRight, Zap, RefreshCw 
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const Passes = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // State for the interactive calculator
  const [selectedEventsForCalc, setSelectedEventsForCalc] = useState([]);
  
  // State for pass booking modal
  const [bookingPass, setBookingPass] = useState(null); // 'free', 'gold', 'vip'
  const [bookingName, setBookingName] = useState('');
  const [bookingEmail, setBookingEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [generatedPass, setGeneratedPass] = useState(null);

  useEffect(() => {
    const fetchEventsList = async () => {
      try {
        setLoading(true);
        const data = await apiService.getEvents();
        setEvents(data);
        setError(null);
      } catch (err) {
        setError(err.message || 'Unable to load events data.');
      } finally {
        setLoading(false);
      }
    };
    fetchEventsList();
  }, []);

  const passTiers = [
    {
      id: 'free',
      name: 'Free Entry Pass',
      price: 0,
      badge: 'Basic Access',
      color: 'var(--text-muted)',
      borderColor: 'var(--border-color-dim)',
      glowColor: 'rgba(255,255,255,0.05)',
      description: 'Perfect for beginners who want to explore coding without any upfront cost.',
      features: [
        'Entry to all Free events (4 events)',
        'Access to General Audience Galleries',
        'Standard digital certificate of attendance'
      ],
      coveredSlugs: ['hackathon', 'sql-murder-mystery', 'speed-typing-duel', 'ai-prompt-engineering'],
      accentColor: '#888'
    },
    {
      id: 'gold',
      name: 'Gold Fest Pass',
      price: 150,
      badge: 'Popular',
      color: 'var(--color-cyan)',
      borderColor: 'rgba(0, 242, 254, 0.3)',
      glowColor: 'rgba(0, 242, 254, 0.15)',
      description: 'Perfect for coders. Grants entry to all coding, debugging, and web design events.',
      features: [
        'Entry to all Coding & Debugging events (9 events)',
        'Saves ₹150+ compared to buying individual tickets',
        'Access to programming workshop resources',
        'Priority technical support & lab slots'
      ],
      coveredSlugs: [
        'hackathon', 'blind-coding', 'error-debugging', 'dsa-coding', 
        'web-design-showdown', 'sql-murder-mystery', 'code-golfing', 
        'ai-prompt-engineering', 'code-refactoring-arena'
      ],
      accentColor: 'var(--color-cyan)'
    },
    {
      id: 'vip',
      name: 'VIP All-Access Pass',
      price: 300,
      badge: 'VIP Perks',
      color: 'var(--color-purple)',
      borderColor: 'rgba(157, 78, 221, 0.4)',
      glowColor: 'rgba(157, 78, 221, 0.2)',
      description: 'The ultimate festival experience. Unlocks all 12 events plus exclusive institutional perks.',
      features: [
        'Unlimited access to all 12 festival events',
        'Official Tech Fest T-Shirt & Merchandise',
        'Complimentary Premium Lunch Coupon',
        'Reserved front-row seating at Keynotes',
        'Verified Certificate of excellence with ranking'
      ],
      coveredSlugs: null, // Covers everything
      accentColor: 'var(--color-purple)'
    }
  ];

  const handleSelectEventForCalc = (eventSlug) => {
    if (selectedEventsForCalc.includes(eventSlug)) {
      setSelectedEventsForCalc(selectedEventsForCalc.filter(slug => slug !== eventSlug));
    } else {
      setSelectedEventsForCalc([...selectedEventsForCalc, eventSlug]);
    }
  };

  const calculateSavings = () => {
    let individualTotal = 0;
    selectedEventsForCalc.forEach(slug => {
      const ev = events.find(e => e.slug === slug);
      if (ev) {
        individualTotal += ev.entry_fee || 0;
      }
    });

    // Recommend the best pass
    let recommendedPass = passTiers[0]; // free
    
    // Check if they selected any paid events
    const selectedPaidEvents = selectedEventsForCalc.filter(slug => {
      const ev = events.find(e => e.slug === slug);
      return ev && ev.entry_fee > 0;
    });

    if (selectedPaidEvents.length > 0) {
      // Check if all selected events are covered by Gold pass
      const isAllGold = selectedEventsForCalc.every(slug => 
        passTiers[1].coveredSlugs.includes(slug)
      );
      
      if (isAllGold && individualTotal > 150) {
        recommendedPass = passTiers[1];
      } else if (individualTotal > 150) {
        recommendedPass = passTiers[2];
      }
      
      if (individualTotal > 300) {
        recommendedPass = passTiers[2];
      }
    }

    return {
      individualTotal,
      recommendedPass,
      savings: individualTotal > recommendedPass.price ? individualTotal - recommendedPass.price : 0
    };
  };

  const handleBookPass = (pass) => {
    setBookingPass(pass);
    setBookingName('');
    setBookingEmail('');
    setGeneratedPass(null);
  };

  const handleSubmitPassBooking = (e) => {
    e.preventDefault();
    if (!bookingName || !bookingEmail) return;

    setIsSubmitting(true);
    
    // Simulate API call to register/generate pass
    setTimeout(() => {
      const transactionId = 'TXN-' + Math.random().toString(36).substr(2, 9).toUpperCase();
      const passCode = 'KLE-' + bookingPass.id.toUpperCase() + '-' + Math.floor(1000 + Math.random() * 9000);
      
      setGeneratedPass({
        name: bookingName,
        email: bookingEmail,
        passName: bookingPass.name,
        price: bookingPass.price,
        transactionId,
        passCode,
        date: new Date().toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
      });
      setIsSubmitting(false);
    }, 1500);
  };

  if (loading) {
    return (
      <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
        <LoadingSpinner />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
        <ErrorMessage message={error} />
      </div>
    );
  }

  const { individualTotal, recommendedPass, savings } = calculateSavings();

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
          }}>TICKETS & PRIVILEGES</h4>
          <h1 className="gradient-text-cyan-purple" style={{
            fontFamily: 'var(--font-display)',
            fontSize: '2.8rem',
            fontWeight: '800',
            letterSpacing: '-0.02em',
            marginBottom: '15px'
          }}>
            FESTIVAL ENTRY PASSES
          </h1>
          <p style={{
            color: 'var(--text-muted)',
            fontSize: '1.05rem',
            maxWidth: '650px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Get bundled access to our coding sprints, hardware hackathons, and security challenges. Save on individual entry fees and unlock exclusive participant merch.
          </p>
        </div>

        {/* Passes Tier Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '30px',
          marginBottom: '80px'
        }}>
          {passTiers.map(pass => (
            <motion.div
              key={pass.id}
              className="glass-panel"
              style={{
                display: 'flex',
                flexDirection: 'column',
                padding: '35px 30px',
                borderColor: pass.borderColor,
                boxShadow: `0 10px 30px ${pass.glowColor}`,
                position: 'relative',
                overflow: 'hidden'
              }}
              whileHover={{ y: -8 }}
              transition={{ duration: 0.3 }}
            >
              {pass.id === 'gold' && (
                <div style={{
                  position: 'absolute',
                  top: '20px',
                  right: '-30px',
                  background: 'var(--color-cyan)',
                  color: '#000',
                  fontSize: '0.65rem',
                  fontWeight: '800',
                  textTransform: 'uppercase',
                  padding: '4px 30px',
                  transform: 'rotate(45deg)',
                  letterSpacing: '0.05em'
                }}>
                  Popular
                </div>
              )}

              <span style={{
                fontSize: '0.75rem',
                fontWeight: '700',
                textTransform: 'uppercase',
                letterSpacing: '0.1em',
                color: pass.color,
                marginBottom: '15px'
              }}>
                {pass.badge}
              </span>

              <h2 style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: '800',
                color: 'var(--text-main)',
                marginBottom: '10px'
              }}>
                {pass.name}
              </h2>

              <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: '20px' }}>
                <span style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
                  {pass.price === 0 ? 'Free' : `₹${pass.price}`}
                </span>
                {pass.price > 0 && (
                  <span style={{ color: 'var(--text-dim)', fontSize: '0.9rem', marginLeft: '5px' }}>
                    / full fest
                  </span>
                )}
              </div>

              <p style={{
                fontSize: '0.9rem',
                color: 'var(--text-muted)',
                lineHeight: '1.5',
                marginBottom: '30px',
                flexGrow: 1
              }}>
                {pass.description}
              </p>

              {/* Features List */}
              <div style={{
                borderTop: '1px solid var(--border-color-dim)',
                paddingTop: '25px',
                marginBottom: '35px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}>
                {pass.features.map((feat, idx) => (
                  <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}>
                    <Check size={16} style={{ color: pass.color, flexShrink: 0, marginTop: '2px' }} />
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Action Button */}
              <button
                onClick={() => handleBookPass(pass)}
                className="btn"
                style={{
                  background: pass.price === 0 ? 'rgba(255,255,255,0.05)' : pass.color,
                  color: pass.price === 0 ? 'var(--text-main)' : '#000',
                  border: pass.price === 0 ? '1px solid var(--border-color-dim)' : 'none',
                  padding: '12px',
                  fontWeight: '700',
                  width: '100%',
                  borderRadius: '8px',
                  cursor: 'pointer'
                }}
              >
                {pass.price === 0 ? 'Claim Free Pass' : 'Buy Pass Now'}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Dynamic Pass Savings Calculator & Random Fee Explorer */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start',
          marginBottom: '80px'
        }}>
          {/* List of events with random fees */}
          <div className="glass-panel" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' }}>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.3rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  Event Ticket Pricing
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginTop: '2px' }}>
                  Select events you want to attend to calculate bundled savings
                </p>
              </div>
              <button 
                onClick={() => setSelectedEventsForCalc([])} 
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--color-cyan)',
                  fontSize: '0.8rem',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px'
                }}
              >
                <RefreshCw size={12} /> Clear Selects
              </button>
            </div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '10px',
              maxHeight: '450px',
              overflowY: 'auto',
              paddingRight: '5px'
            }} className="custom-scrollbar">
              {events.map(ev => {
                const isSelected = selectedEventsForCalc.includes(ev.slug);
                return (
                  <div
                    key={ev.id}
                    onClick={() => handleSelectEventForCalc(ev.slug)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '12px 18px',
                      borderRadius: '8px',
                      background: isSelected ? 'rgba(0, 242, 254, 0.05)' : 'rgba(255,255,255,0.01)',
                      border: isSelected ? '1px solid rgba(0, 242, 254, 0.2)' : '1px solid var(--border-color-dim)',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => {}} // handled by div onClick
                        style={{ cursor: 'pointer' }}
                      />
                      <div>
                        <span style={{ display: 'block', fontSize: '0.9rem', color: 'var(--text-main)', fontWeight: '600' }}>
                          {ev.name}
                        </span>
                        <span style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>
                          {ev.category}
                        </span>
                      </div>
                    </div>
                    <span style={{
                      fontSize: '0.9rem',
                      fontWeight: '700',
                      color: ev.entry_fee === 0 ? '#38ef7d' : 'var(--text-main)'
                    }}>
                      {ev.entry_fee === 0 ? 'Free' : `₹${ev.entry_fee}`}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Calculator Savings display */}
          <div className="glass-panel" style={{
            padding: '40px 30px',
            background: 'linear-gradient(135deg, rgba(15, 23, 42, 0.8) 0%, rgba(30, 41, 59, 0.8) 100%)',
            border: '1px solid rgba(255, 255, 255, 0.05)',
            boxShadow: '0 20px 40px rgba(0,0,0,0.5)'
          }}>
            <div style={{ display: 'flex', gap: '15px', alignItems: 'center', marginBottom: '25px' }}>
              <div style={{
                background: 'rgba(0, 242, 254, 0.1)',
                padding: '12px',
                borderRadius: '12px',
                color: 'var(--color-cyan)'
              }}>
                <Zap size={24} />
              </div>
              <div>
                <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: '700', color: 'var(--text-main)' }}>
                  Pass Optimizer
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)' }}>
                  Instantly find the best deal for your selected events
                </p>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContext: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color-dim)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Events Selected:</span>
                <span style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.9rem' }}>
                  {selectedEventsForCalc.length} events
                </span>
              </div>
              <div style={{ display: 'flex', justifyContext: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color-dim)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Individual Entry Cost:</span>
                <span style={{ color: 'var(--text-main)', fontWeight: '700', fontSize: '0.9rem' }}>
                  ₹{individualTotal}
                </span>
              </div>
              <div style={{ display: 'flex', justifyContext: 'space-between', paddingBottom: '12px', borderBottom: '1px solid var(--border-color-dim)' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Recommended Bundle:</span>
                <span style={{ color: recommendedPass.color, fontWeight: '700', fontSize: '0.9rem' }}>
                  {recommendedPass.name} (₹{recommendedPass.price})
                </span>
              </div>
            </div>

            {selectedEventsForCalc.length > 0 ? (
              <div>
                {savings > 0 ? (
                  <div style={{
                    background: 'rgba(56, 239, 125, 0.05)',
                    border: '1px dashed rgba(56, 239, 125, 0.25)',
                    borderRadius: '8px',
                    padding: '15px 20px',
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: '#38ef7d', fontWeight: '700', letterSpacing: '0.05em', marginBottom: '4px' }}>
                      SMART CHOICE!
                    </span>
                    <span style={{ fontSize: '1.4rem', fontWeight: '800', color: '#38ef7d' }}>
                      Saves ₹{savings}
                    </span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                      Buying the {recommendedPass.name} is cheaper than buying individual tickets.
                    </p>
                  </div>
                ) : (
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid var(--border-color-dim)',
                    borderRadius: '8px',
                    padding: '15px 20px',
                    marginBottom: '30px',
                    textAlign: 'center'
                  }}>
                    <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', fontWeight: '700', marginBottom: '4px' }}>
                      NO EXTRA FEES NEEDED
                    </span>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--text-main)' }}>
                      Cost: ₹{individualTotal}
                    </span>
                    <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '5px' }}>
                      Your selected events are free or cost less than a bundle pass. You can register for them individually!
                    </p>
                  </div>
                )}

                <button
                  onClick={() => handleBookPass(recommendedPass)}
                  className="btn btn-cyan"
                  style={{
                    width: '100%',
                    padding: '14px',
                    fontWeight: '700',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Get Recommended Pass <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '30px 20px',
                border: '1px dashed var(--border-color-dim)',
                borderRadius: '8px',
                color: 'var(--text-muted)',
                fontSize: '0.85rem'
              }}>
                <AlertCircle size={20} style={{ margin: '0 auto 10px auto', display: 'block', color: 'var(--text-dim)' }} />
                Select some events from the list on the left to see your bundle savings.
              </div>
            )}
          </div>
        </div>

        {/* Modal for Booking Pass */}
        <AnimatePresence>
          {bookingPass && (
            <div style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: 'rgba(0, 0, 0, 0.8)',
              backdropFilter: 'blur(8px)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '20px'
            }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="glass-panel"
                style={{
                  width: '100%',
                  maxWidth: '500px',
                  padding: '40px',
                  position: 'relative',
                  background: 'var(--bg-app-dark)',
                  boxShadow: `0 20px 50px ${bookingPass.glowColor}`
                }}
              >
                {/* Close Button */}
                <button
                  onClick={() => setBookingPass(null)}
                  style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted)',
                    fontSize: '1.2rem',
                    cursor: 'pointer'
                  }}
                >
                  ✕
                </button>

                {!generatedPass ? (
                  <div>
                    {/* Booking Form */}
                    <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                      <Ticket size={36} style={{ color: bookingPass.color, marginBottom: '15px' }} />
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '850', color: 'var(--text-main)' }}>
                        Secure Your {bookingPass.name}
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '5px' }}>
                        {bookingPass.price === 0 
                          ? 'Complete registration to generate your entry ticket.' 
                          : `Pass cost is ₹${bookingPass.price}. Complete check-in registration to generate pass.`
                        }
                      </p>
                    </div>

                    <form onSubmit={handleSubmitPassBooking} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '600' }}>
                          Full Name
                        </label>
                        <div style={{ position: 'relative' }}>
                          <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                          <input
                            type="text"
                            required
                            placeholder="Enter your name"
                            value={bookingName}
                            onChange={(e) => setBookingName(e.target.value)}
                            className="form-input"
                            style={{ paddingLeft: '45px' }}
                          />
                        </div>
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '8px', fontWeight: '600' }}>
                          Email Address
                        </label>
                        <div style={{ position: 'relative' }}>
                          <Mail size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-dim)' }} />
                          <input
                            type="email"
                            required
                            placeholder="your.email@gmail.com"
                            value={bookingEmail}
                            onChange={(e) => setBookingEmail(e.target.value)}
                            className="form-input"
                            style={{ paddingLeft: '45px' }}
                          />
                        </div>
                      </div>

                      {bookingPass.price > 0 && (
                        <div style={{
                          background: 'rgba(255, 255, 255, 0.02)',
                          border: '1px solid var(--border-color-dim)',
                          padding: '15px',
                          borderRadius: '8px',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px'
                        }}>
                          <ShoppingBag size={18} style={{ color: 'var(--color-cyan)' }} />
                          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', lineHeight: '1.4' }}>
                            Demo Mode: The entry fee payment is pre-authorized. No real money will be charged.
                          </div>
                        </div>
                      )}

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="btn btn-cyan"
                        style={{
                          width: '100%',
                          padding: '14px',
                          fontWeight: '700',
                          marginTop: '10px',
                          border: 'none',
                          cursor: isSubmitting ? 'not-allowed' : 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        {isSubmitting ? (
                          <>Generating Ticket...</>
                        ) : (
                          <>{bookingPass.price === 0 ? 'Generate Free Pass' : 'Complete Booking'}</>
                        )}
                      </button>
                    </form>
                  </div>
                ) : (
                  <div>
                    {/* Ticket Generated */}
                    <div style={{ textAlign: 'center', marginBottom: '25px' }}>
                      <div style={{
                        background: 'rgba(56, 239, 125, 0.1)',
                        width: '60px',
                        height: '60px',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: '#38ef7d',
                        margin: '0 auto 15px auto'
                      }}>
                        <Check size={32} />
                      </div>
                      <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', fontWeight: '850', color: 'var(--text-main)' }}>
                        Pass Generated Successfully!
                      </h3>
                      <p style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginTop: '5px' }}>
                        Your ticket is ready. Show this QR code at the registration desk.
                      </p>
                    </div>

                    {/* Printable digital ticket */}
                    <div style={{
                      background: 'linear-gradient(to bottom, #1e293b, #0f172a)',
                      border: `2px dashed ${bookingPass.color}`,
                      borderRadius: '12px',
                      padding: '24px',
                      marginBottom: '30px',
                      position: 'relative',
                      boxShadow: '0 10px 20px rgba(0,0,0,0.3)'
                    }}>
                      <div style={{
                        position: 'absolute',
                        left: '-12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--bg-app-dark)'
                      }} />
                      <div style={{
                        position: 'absolute',
                        right: '-12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        width: '24px',
                        height: '24px',
                        borderRadius: '50%',
                        background: 'var(--bg-app-dark)'
                      }} />

                      {/* Ticket Header */}
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', paddingBottom: '15px', borderBottom: '1px dashed var(--border-color-dim)' }}>
                        <div>
                          <span style={{ fontSize: '0.65rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            KLE DEGREE COLLEGE TECH FEST
                          </span>
                          <h4 style={{ fontFamily: 'var(--font-display)', fontSize: '1.1rem', fontWeight: '800', color: 'var(--text-main)', marginTop: '4px' }}>
                            {generatedPass.passName}
                          </h4>
                        </div>
                        <QrCode size={40} style={{ color: bookingPass.color }} />
                      </div>

                      {/* Ticket Details */}
                      <div style={{
                        display: 'grid',
                        gridTemplateColumns: '1fr 1fr',
                        gap: '15px 20px',
                        padding: '20px 0',
                        fontSize: '0.8rem'
                      }}>
                        <div>
                          <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.7rem' }}>PARTICIPANT</span>
                          <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{generatedPass.name}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.7rem' }}>TICKET ID</span>
                          <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{generatedPass.passCode}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.7rem' }}>DATE</span>
                          <span style={{ color: 'var(--text-main)', fontWeight: '600' }}>{generatedPass.date}</span>
                        </div>
                        <div>
                          <span style={{ display: 'block', color: 'var(--text-dim)', fontSize: '0.7rem' }}>ENTRY PERMIT</span>
                          <span style={{ color: bookingPass.color, fontWeight: '700' }}>VALID</span>
                        </div>
                      </div>

                      <div style={{
                        borderTop: '1px dashed var(--border-color-dim)',
                        paddingTop: '15px',
                        textAlign: 'center',
                        fontSize: '0.7rem',
                        color: 'var(--text-muted)'
                      }}>
                        Transaction ID: {generatedPass.transactionId}
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '15px' }}>
                      <button
                        onClick={() => {
                          window.print();
                        }}
                        className="btn btn-outline"
                        style={{
                          flex: 1,
                          padding: '12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px'
                        }}
                      >
                        <Download size={16} /> Print Pass
                      </button>
                      <button
                        onClick={() => setBookingPass(null)}
                        className="btn btn-cyan"
                        style={{
                          flex: 1,
                          padding: '12px',
                          border: 'none',
                          cursor: 'pointer'
                        }}
                      >
                        Done
                      </button>
                    </div>
                  </div>
                )}
              </motion.div>
            </div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};
