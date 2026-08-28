import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { GrokAgent } from './components/GrokAgent';
import { GrokTerminal } from './components/GrokTerminal';
import { AuthProvider } from './context/AuthContext';

// Pages
import { Home } from './pages/Home';
import { About } from './pages/About';
import { Events } from './pages/Events';
import { EventDetails } from './pages/EventDetails';
import { Passes } from './pages/Passes';
import { Contact } from './pages/Contact';
import { Login } from './pages/Login';
import { Dashboard } from './pages/Dashboard';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div style={{ 
          display: 'flex', 
          flexDirection: 'column', 
          minHeight: '100vh',
          position: 'relative'
        }}>
          {/* Global Grid Background & Fading Overlay */}
          <div className="grid-bg" />
          <div className="grid-bg-overlay" />

          {/* Sticky Navigation Header */}
          <Navbar />

          {/* Main Layout routes */}
          <main style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/events" element={<Events />} />
              <Route path="/events/:slug" element={<EventDetails />} />
              <Route path="/passes" element={<Passes />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Login />} />
              <Route path="/dashboard" element={<Dashboard />} />
              
              {/* Catch-all fallback redirects to Home */}
              <Route path="*" element={<Home />} />
            </Routes>
          </main>

          {/* Institutional Multi-column Footer */}
          <Footer />

          {/* Floating Grok AI Chat Agent */}
          <GrokAgent />

          {/* Retro Command CLI Terminal */}
          <GrokTerminal />
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
