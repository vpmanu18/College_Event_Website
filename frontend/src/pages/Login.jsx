import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { apiService } from '../services/api';
import { useAuth } from '../context/AuthContext';
import { ErrorMessage } from '../components/ErrorMessage';
import { KeyRound, Mail, User, ShieldCheck, ArrowRight, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export const Login = () => {
  const [isLogin, setIsLogin] = useState(true); // toggles between login and signup
  const { loginUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect path
  const redirectPath = location.state?.from?.pathname || '/dashboard';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectPath, { replace: true });
    }
  }, [isAuthenticated, navigate, redirectPath]);

  // Form states
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [infoMessage, setInfoMessage] = useState(null);

  const handleChange = (e) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const handleToggle = () => {
    setIsLogin(!isLogin);
    setError(null);
    setInfoMessage(null);
    setFormData({ name: '', email: '', password: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);

    const { name, email, password } = formData;

    if (!email || !password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (!isLogin && (!name || name.trim().length < 2)) {
      setError('Please enter your full name (min 2 characters).');
      return;
    }

    try {
      setLoading(true);
      if (isLogin) {
        // Authenticate Login
        const res = await apiService.login(email, password);
        loginUser(res);
        navigate(redirectPath, { replace: true });
      } else {
        // Authenticate Signup
        const res = await apiService.signup({ name, email, password });
        setInfoMessage(res.message || 'Signup successful! You can now log in.');
        setIsLogin(true);
        setFormData({ name: '', email, password: '' });
      }
    } catch (err) {
      setError(err.message || 'Authentication failed. Please check your credentials.');
    } finally {
      setLoading(false);
    }
  };

  const handleForgot = () => {
    setInfoMessage("Reset instructions have been requested. Please check your inbox shortly.");
  };

  return (
    <div style={{ padding: '60px 0 120px 0', minHeight: '80vh', display: 'flex', alignItems: 'center' }}>
      <div className="container" style={{ maxWidth: '500px' }}>
        
        {/* Toggle Form Tabs */}
        <div style={{
          display: 'flex',
          border: '1px solid var(--border-color-dim)',
          borderRadius: '30px',
          background: 'var(--bg-tab-container)',
          padding: '4px',
          marginBottom: '30px'
        }}>
          <button
            onClick={() => setIsLogin(true)}
            style={{
              flex: 1,
              border: 'none',
              background: isLogin ? 'var(--color-cyan)' : 'transparent',
              color: isLogin ? '#000' : 'var(--text-muted)',
              padding: '12px 0',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              transition: 'var(--transition-smooth)'
            }}
          >
            SIGN IN
          </button>
          <button
            onClick={() => setIsLogin(false)}
            style={{
              flex: 1,
              border: 'none',
              background: !isLogin ? 'var(--color-cyan)' : 'transparent',
              color: !isLogin ? '#000' : 'var(--text-muted)',
              padding: '12px 0',
              borderRadius: '25px',
              cursor: 'pointer',
              fontWeight: '700',
              fontFamily: 'var(--font-display)',
              transition: 'var(--transition-smooth)'
            }}
          >
            CREATE ACCOUNT
          </button>
        </div>

        {/* Form Panel */}
        <div className="glass-panel" style={{ padding: '40px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '25px' }}>
            <Activity size={24} style={{ color: 'var(--color-cyan)' }} />
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--text-main)', fontSize: '1.5rem', fontWeight: '800' }}>
              {isLogin ? 'PARTICIPANT SIGN IN' : 'CREATE PORTAL ACCOUNT'}
            </h2>
          </div>

          {error && <div style={{ marginBottom: '20px' }}><ErrorMessage message={error} /></div>}
          
          {infoMessage && (
            <div style={{
              background: 'rgba(56, 239, 125, 0.05)',
              border: '1px solid rgba(56, 239, 125, 0.25)',
              padding: '15px',
              borderRadius: '8px',
              color: '#38ef7d',
              fontSize: '0.9rem',
              marginBottom: '20px'
            }}>
              {infoMessage}
            </div>
          )}

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            
            {/* Full Name (Signup only) */}
            {!isLogin && (
              <div>
                <label className="form-label">
                  <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <User size={14} /> Full Name
                  </span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Enter full name"
                  disabled={loading}
                />
              </div>
            )}

            {/* Email */}
            <div>
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Mail size={14} /> Gmail Address
                </span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-input"
                placeholder="example@gmail.com"
                disabled={loading}
              />
            </div>

            {/* Password */}
            <div>
              <label className="form-label">
                <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <KeyRound size={14} /> Account Password
                </span>
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-input"
                placeholder="••••••••"
                disabled={loading}
              />
            </div>

            {/* Forgot password link */}
            {isLogin && (
              <div style={{ textAlign: 'right' }}>
                <button
                  type="button"
                  onClick={handleForgot}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: 'var(--color-cyan)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-display)'
                  }}
                >
                  Forgot Password?
                </button>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              className="btn btn-cyan animate-pulse-glow"
              style={{
                width: '100%',
                padding: '14px',
                marginTop: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px'
              }}
              disabled={loading}
            >
              {loading ? (
                'PROCESSING AUTHENTICATION...'
              ) : (
                <>
                  {isLogin ? 'SIGN IN' : 'REGISTER ACCOUNT'}
                  <ArrowRight size={16} />
                </>
              )}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
};
