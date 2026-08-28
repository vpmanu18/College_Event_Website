import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';
import { Bot, Sparkles, Send, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GrokAgent = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hey! I am Grok KLE Agent, your intelligent guide for the KLE Degree College Tech Fest 2k26-27. Ask me anything about events, venues, fees, schedules, or registration!',
      time: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  
  const messagesEndRef = useRef(null);

  // Auto-scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  const handleSend = async (textToSend) => {
    const text = textToSend || inputText.trim();
    if (!text) return;

    if (!textToSend) setInputText('');
    
    // Add user message
    const userMsg = {
      id: Date.now().toString(),
      sender: 'user',
      text: text,
      time: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setIsTyping(true);

    try {
      const res = await apiService.submitChat(text);
      const botMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: res.reply,
        time: new Date()
      };
      setMessages(prev => [...prev, botMsg]);
    } catch (err) {
      const errorMsg = {
        id: (Date.now() + 1).toString(),
        sender: 'bot',
        text: 'Sorry, I lost my uplink to the data grid. Please make sure the backend is running!',
        isError: true,
        time: new Date()
      };
      setMessages(prev => [...prev, errorMsg]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  const quickChips = [
    { label: 'List all events', text: 'List all events' },
    { label: 'Where is the Hackathon?', text: 'Where is the Hackathon?' },
    { label: 'How to register?', text: 'How to register?' },
    { label: 'Tell me a tech joke!', text: 'Tell me a tech joke!' }
  ];

  return (
    <>
      {/* Floating Action Button */}
      <div style={{ position: 'fixed', bottom: '30px', right: '30px', zIndex: 999 }}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, var(--color-cyan) 0%, #1e40af 100%)',
            border: 'none',
            boxShadow: '0 8px 32px rgba(2, 132, 199, 0.35), inset 0 2px 4px rgba(255,255,255,0.2)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#ffffff',
            position: 'relative'
          }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
          animate={{
            boxShadow: isOpen 
              ? '0 0 0 0 rgba(2, 132, 199, 0)' 
              : ['0 8px 32px rgba(2, 132, 199, 0.35)', '0 8px 40px rgba(2, 132, 199, 0.6)', '0 8px 32px rgba(2, 132, 199, 0.35)']
          }}
          transition={{ repeat: Infinity, duration: 2.5 }}
        >
          {isOpen ? <X size={26} /> : <Bot size={28} style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))' }} />}
          
          {/* Neon indicator dot */}
          {!isOpen && (
            <span style={{
              position: 'absolute',
              top: '2px',
              right: '2px',
              width: '12px',
              height: '12px',
              borderRadius: '50%',
              backgroundColor: '#10b981',
              border: '2px solid #ffffff',
              boxShadow: '0 0 8px #10b981'
            }} />
          )}
        </motion.button>
      </div>

      {/* Chat Window Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="glass-panel"
            style={{
              position: 'fixed',
              bottom: '105px',
              right: '30px',
              width: '400px',
              height: '520px',
              zIndex: 998,
              borderRadius: '20px',
              border: '1px solid rgba(2, 132, 199, 0.25)',
              boxShadow: '0 12px 40px rgba(15, 23, 42, 0.12), 0 0 25px rgba(2, 132, 199, 0.08)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.96)',
              backdropFilter: 'blur(20px)'
            }}
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ duration: 0.25, cubicBezier: [0.4, 0, 0.2, 1] }}
          >
            {/* Header */}
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid rgba(2, 132, 199, 0.15)',
              background: 'rgba(2, 132, 199, 0.04)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '10px',
                  backgroundColor: 'rgba(2, 132, 199, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--color-cyan)'
                }}>
                  <Sparkles size={18} />
                </div>
                <div>
                  <h3 style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1rem',
                    fontWeight: '800',
                    color: 'var(--text-main)',
                    margin: 0,
                    lineHeight: '1.2'
                  }}>GROK AI AGENT</h3>
                  <span style={{
                    fontSize: '0.7rem',
                    color: '#10b981',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: '#10b981',
                      display: 'inline-block'
                    }} /> ONLINE
                  </span>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Chat Messages Panel */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '15px'
            }}>
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  style={{
                    display: 'flex',
                    justifyContent: msg.sender === 'user' ? 'flex-end' : 'flex-start',
                    alignItems: 'flex-start',
                    gap: '8px'
                  }}
                >
                  {msg.sender === 'bot' && (
                    <div style={{
                      width: '28px',
                      height: '28px',
                      borderRadius: '50%',
                      backgroundColor: msg.isError ? 'rgba(239, 68, 68, 0.1)' : 'rgba(2, 132, 199, 0.1)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: msg.isError ? 'var(--color-red)' : 'var(--color-cyan)',
                      flexShrink: 0,
                      marginTop: '2px'
                    }}>
                      <Bot size={14} />
                    </div>
                  )}
                  <div style={{
                    maxWidth: '80%',
                    padding: '12px 16px',
                    borderRadius: msg.sender === 'user' ? '18px 18px 2px 18px' : '18px 18px 18px 2px',
                    backgroundColor: msg.sender === 'user' ? 'var(--color-cyan)' : (msg.isError ? 'rgba(239, 68, 68, 0.05)' : 'rgba(15, 23, 42, 0.04)'),
                    border: msg.isError ? '1px solid rgba(239, 68, 68, 0.15)' : 'none',
                    color: msg.sender === 'user' ? '#ffffff' : 'var(--text-main)',
                    fontSize: '0.85rem',
                    lineHeight: '1.45',
                    boxShadow: msg.sender === 'user' ? '0 4px 12px rgba(2, 132, 199, 0.2)' : 'none',
                    whiteSpace: 'pre-line'
                  }}>
                    {msg.text}
                  </div>
                </div>
              ))}

              {isTyping && (
                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    backgroundColor: 'rgba(2, 132, 199, 0.1)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--color-cyan)',
                    flexShrink: 0
                  }}>
                    <Bot size={14} />
                  </div>
                  <div style={{
                    padding: '12px 18px',
                    borderRadius: '18px 18px 18px 2px',
                    backgroundColor: 'rgba(15, 23, 42, 0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-dim)', borderRadius: '50%', display: 'inline-block', animation: 'typingBounce 1.4s infinite ease-in-out' }} />
                    <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-dim)', borderRadius: '50%', display: 'inline-block', animation: 'typingBounce 1.4s infinite ease-in-out', animationDelay: '0.2s' }} />
                    <span className="typing-dot" style={{ width: '6px', height: '6px', backgroundColor: 'var(--text-dim)', borderRadius: '50%', display: 'inline-block', animation: 'typingBounce 1.4s infinite ease-in-out', animationDelay: '0.4s' }} />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick replies suggestion chips */}
            {messages.length === 1 && !isTyping && (
              <div style={{
                padding: '0 20px 15px 20px',
                display: 'flex',
                flexWrap: 'wrap',
                gap: '8px'
              }}>
                {quickChips.map((chip, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(chip.text)}
                    style={{
                      padding: '6px 12px',
                      borderRadius: '15px',
                      border: '1px solid rgba(2, 132, 199, 0.2)',
                      backgroundColor: 'rgba(2, 132, 199, 0.03)',
                      color: 'var(--color-cyan)',
                      fontSize: '0.75rem',
                      fontWeight: '600',
                      cursor: 'pointer',
                      transition: 'var(--transition-smooth)'
                    }}
                    className="nav-arrow"
                  >
                    {chip.label}
                  </button>
                ))}
              </div>
            )}

            {/* Input Bar */}
            <div style={{
              padding: '15px 20px',
              borderTop: '1px solid rgba(2, 132, 199, 0.15)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              backgroundColor: 'rgba(255, 255, 255, 0.98)'
            }}>
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Ask Grok a question..."
                style={{
                  flex: 1,
                  padding: '10px 14px',
                  borderRadius: '12px',
                  border: '1px solid rgba(2, 132, 199, 0.2)',
                  outline: 'none',
                  fontSize: '0.85rem',
                  fontFamily: 'var(--font-body)',
                  backgroundColor: 'rgba(15, 23, 42, 0.01)',
                  color: 'var(--text-main)',
                  transition: 'var(--transition-smooth)'
                }}
                className="form-input-focus"
              />
              <button
                onClick={() => handleSend()}
                disabled={!inputText.trim()}
                style={{
                  width: '38px',
                  height: '38px',
                  borderRadius: '12px',
                  backgroundColor: inputText.trim() ? 'var(--color-cyan)' : 'rgba(2, 132, 199, 0.1)',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: inputText.trim() ? '#ffffff' : 'var(--text-dim)',
                  cursor: inputText.trim() ? 'pointer' : 'default',
                  transition: 'var(--transition-smooth)'
                }}
              >
                <Send size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Injected style helper for animations */}
      <style>{`
        @keyframes typingBounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
        .form-input-focus:focus {
          border-color: var(--color-cyan) !important;
          box-shadow: 0 0 0 3px rgba(2, 132, 199, 0.1);
        }
      `}</style>
    </>
  );
};
