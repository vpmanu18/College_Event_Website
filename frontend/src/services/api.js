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

// Global mock state for offline frontend usage
let mockStats = {
  total_participants: 0,
  total_registrations: 0,
  total_events: 12,
  college: "KLE Society's Degree College"
};

let mockEvents = [
  {
    id: 'mock-1',
    name: 'HackSphere 2027',
    description: 'A 24-hour non-stop coding marathon where teams build innovative solutions for real-world problems. Great prizes and networking opportunities.',
    category: 'coding',
    event_date: '2027-02-18',
    event_time: '09:00 AM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 500,
    location: 'Main Auditorium'
  },
  {
    id: 'mock-2',
    name: 'Bug Bounty Pro',
    description: 'Test your skills in finding and fixing complex bugs in pre-written code across multiple languages. Fast-paced and competitive.',
    category: 'debugging',
    event_date: '2027-02-18',
    event_time: '10:30 AM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 200,
    location: 'Lab 3'
  },
  {
    id: 'mock-3',
    name: 'AlgoMasters Clash',
    description: 'Solve complex algorithmic problems under time pressure. Prove your problem-solving skills and algorithmic efficiency.',
    category: 'challenge',
    event_date: '2027-02-18',
    event_time: '02:00 PM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 0,
    location: 'Seminar Hall'
  },
  {
    id: 'mock-4',
    name: 'WebDev Showdown',
    description: 'A full-stack web development competition. Build a responsive, functional web application from scratch in just 8 hours.',
    category: 'coding',
    event_date: '2027-02-18',
    event_time: '10:00 AM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 300,
    location: 'Computer Lab 1'
  },
  {
    id: 'mock-5',
    name: 'System Design Challenge',
    description: 'Design highly scalable, distributed architectures for massive concurrent users. Defend your design choices to the panel.',
    category: 'challenge',
    event_date: '2027-02-18',
    event_time: '11:00 AM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 0,
    location: 'Conference Room B'
  },
  {
    id: 'mock-6',
    name: 'Debug & Rescue',
    description: 'You will be handed a broken legacy codebase. First team to successfully refactor and get all tests passing wins.',
    category: 'debugging',
    event_date: '2027-02-18',
    event_time: '09:30 AM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 150,
    location: 'Lab 2'
  },
  {
    id: 'mock-7',
    name: 'Cyber Capture The Flag (CTF)',
    description: 'Find exploits, decrypt hidden messages, and reverse engineer applications in our flagship cybersecurity challenge.',
    category: 'challenge',
    event_date: '2027-02-18',
    event_time: '04:00 PM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 250,
    location: 'Virtual / Main Hall'
  },
  {
    id: 'mock-8',
    name: 'AppDev Marathon',
    description: 'Create a highly functional mobile application using React Native or Flutter. Theme will be announced on the spot.',
    category: 'coding',
    event_date: '2027-02-18',
    event_time: '08:00 AM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 400,
    location: 'Startup Incubator'
  },
  {
    id: 'mock-9',
    name: 'Query Optimization Race',
    description: 'Given a massive, poorly structured database, write the most optimal SQL queries to extract data in record time.',
    category: 'debugging',
    event_date: '2027-02-18',
    event_time: '01:00 PM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 100,
    location: 'Lab 4'
  },
  {
    id: 'mock-10',
    name: 'AI Prompt Battle',
    description: 'Use advanced prompt engineering to coerce language models into completing complex tasks faster than your opponents.',
    category: 'challenge',
    event_date: '2027-02-18',
    event_time: '03:30 PM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 0,
    location: 'Auditorium B'
  },
  {
    id: 'mock-11',
    name: 'UI/UX Code Jam',
    description: 'Translate a complex Figma design into a pixel-perfect, fully animated frontend interface using vanilla CSS or Tailwind.',
    category: 'coding',
    event_date: '2027-02-18',
    event_time: '10:00 AM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 200,
    location: 'Design Studio'
  },
  {
    id: 'mock-12',
    name: 'Blind Coding',
    description: 'Write complex algorithms with your monitor turned off. A true test of syntax memorization and mental logic.',
    category: 'challenge',
    event_date: '2027-02-18',
    event_time: '05:00 PM',
    participant_count: 0,
    participant_limit: 50,
    entry_fee: 50,
    location: 'Lab 1'
  }
];

export const apiService = {
  // Events
  async getEvents() {
    try {
      const res = await fetch(`${API_BASE_URL}/events`, {
        headers: getHeaders(),
      });
      if (!res.ok) {
        throw new Error('Server response not ok');
      }
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using fallback mock events.', err);
      return [...mockEvents];
    }
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
    try {
      const res = await fetch(`${API_BASE_URL}/participants/count`, {
        headers: getHeaders(),
      });
      if (!res.ok) {
        throw new Error('Unable to load statistics.');
      }
      return await res.json();
    } catch (err) {
      console.warn('Backend unavailable, using fallback mock stats.', err);
      return { ...mockStats };
    }
  },

  // Register
  async register(data) {
    try {
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
    } catch (err) {
      console.warn('Backend unavailable, simulating registration locally.', err);
      
      const eventId = data.event_id;
      const eventIndex = mockEvents.findIndex(e => e.id === eventId || e.id === Number(eventId));
      
      let eventName = 'Unknown Event';
      if (eventIndex !== -1) {
        // Increment local counts
        mockEvents[eventIndex].participant_count += 1;
        eventName = mockEvents[eventIndex].name;
        
        mockStats.total_registrations += 1;
        mockStats.total_participants += 1; // Assuming unique user for simulation
      }

      // Return simulated success response
      return {
        message: 'Registration successful (simulated)',
        registration: {
          id: 'sim-' + Math.random().toString(36).substring(2, 10),
          participant_name: data.participant_name,
          college_name: data.college_name,
          event_name: eventName,
          registered_at: new Date().toISOString()
        }
      };
    }
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
