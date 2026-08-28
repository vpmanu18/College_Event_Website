const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

/**
 * Get HTTP headers, optionally attaching Authorization token if logged in.
 */
function getHeaders() {
  const headers = {
    'Content-Type': 'application/json',
  };
  const token = localStorage.getItem('token');
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }
  return headers;
}

export const apiService = {
  // Events
  async getEvents() {
    const res = await fetch(`${API_BASE_URL}/events`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Unable to load events. Please try again.');
    }
    return res.json();
  },

  async getEvent(slugOrId) {
    const res = await fetch(`${API_BASE_URL}/events/${slugOrId}`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Event not found.');
    }
    return res.json();
  },

  // Stats
  async getStats() {
    const res = await fetch(`${API_BASE_URL}/participants/count`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Unable to load statistics.');
    }
    return res.json();
  },

  // Register
  async register(data) {
    const res = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(result.error || 'Registration could not be completed. Please try again.');
    }
    return result;
  },

  // Contact
  async submitContact(data) {
    const res = await fetch(`${API_BASE_URL}/contact`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(result.error || 'Failed to send message. Please try again.');
    }
    return result;
  },

  // Authentication
  async signup(data) {
    const res = await fetch(`${API_BASE_URL}/auth/signup`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(data),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(result.error || 'Sign up failed. Please try again.');
    }
    return result;
  },

  async login(email, password) {
    const res = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ email, password }),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(result.error || 'Invalid email or password.');
    }
    return result;
  },

  async getDashboard() {
    const res = await fetch(`${API_BASE_URL}/auth/dashboard`, {
      headers: getHeaders(),
    });
    if (!res.ok) {
      const err = await res.json().catch(() => ({}));
      throw new Error(err.error || 'Could not load dashboard.');
    }
    return res.json();
  },

  // Grok AI Chat
  async submitChat(message) {
    const res = await fetch(`${API_BASE_URL}/chat`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify({ message }),
    });
    const result = await res.json().catch(() => ({}));
    if (!res.ok) {
      throw new Error(result.error || 'Failed to get response from Grok Agent.');
    }
    return result;
  }
};
