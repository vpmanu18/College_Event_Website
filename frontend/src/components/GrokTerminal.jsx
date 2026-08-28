import React, { useState, useEffect, useRef } from 'react';
import { apiService } from '../services/api';
import { Terminal as TerminalIcon, X, Send, Play } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const GrokTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [history, setHistory] = useState([
    'KLE SYSTEM TERMINAL v2.86.0-CYBER',
    'TYPE "help" TO SEE AVAILABLE PROTOCOLS.',
    'System status: ONLINE. Security bypass: STANDBY.'
  ]);
  const [inputValue, setInputValue] = useState('');
  
  // Hacking game states
  const [gameState, setGameState] = useState({
    active: false,
    stage: 0, // 0 = not started, 1 = Q1, 2 = Q2, 3 = Q3
  });

  const consoleEndRef = useRef(null);

  // Auto scroll terminal logs
  useEffect(() => {
    if (consoleEndRef.current) {
      consoleEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [history]);

  const addLog = (text) => {
    setHistory(prev => [...prev, text]);
  };

  const handleCommand = async (rawInput) => {
    const input = rawInput.trim();
    if (!input) return;

    addLog(`> ${input}`);
    setInputValue('');

    // If hacking game is active, capture input as answers
    if (gameState.active) {
      handleHackingGame(input);
      return;
    }

    const parts = input.split(' ');
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1).join(' ');

    switch (cmd) {
      case 'help':
        addLog('Available commands:');
        addLog('  help       - List terminal commands');
        addLog('  events     - Display all Tech Fest events in ASCII grid');
        addLog('  grok [msg] - Query the Grok AI engine directly');
        addLog('  hack       - Start the interactive terminal cybersecurity puzzle');
        addLog('  clear      - Clear the console screen');
        addLog('  exit       - Close the console');
        break;

      case 'clear':
        setHistory([]);
        break;

      case 'exit':
        setIsOpen(false);
        break;

      case 'events':
        addLog('Fetching live data nodes...');
        try {
          const events = await apiService.getEvents();
          addLog('+-----------------------------------+--------------------+');
          addLog('| Event Name                        | Venue              |');
          addLog('+-----------------------------------+--------------------+');
          events.forEach(e => {
            const namePadded = e.name.padEnd(33, ' ').slice(0, 33);
            const venuePadded = e.location.padEnd(18, ' ').slice(0, 18);
            addLog(`| ${namePadded} | ${venuePadded} |`);
          });
          addLog('+-----------------------------------+--------------------+');
          addLog(`Total nodes fetched: ${events.length}`);
        } catch (e) {
          addLog('[ERROR] Connection grid lost. Could not fetch events.');
        }
        break;

      case 'grok':
        if (!args) {
          addLog('Usage: grok <your message here>');
          break;
        }
        addLog('Querying AI sub-core...');
        try {
          const res = await apiService.submitChat(args);
          addLog(`Grok KLE: "${res.reply}"`);
        } catch (e) {
          addLog('[ERROR] Grok uplink failed. Check your network.');
        }
        break;

      case 'hack':
        addLog('[INITIATING BYPASS SEQUENCE]');
        addLog('System requires authorization. Solve 3 tech logic questions.');
        addLog('----------------------------------------------------');
        setGameState({ active: true, stage: 1 });
        addLog('Question 1: What is the time complexity of Binary Search in a sorted array?');
        addLog('  (A) O(1)');
        addLog('  (B) O(N)');
        addLog('  (C) O(log N)');
        addLog('Type A, B, or C:');
        break;

      default:
        addLog(`Unknown protocol: "${cmd}". Type "help" for instructions.`);
        break;
    }
  };

  const handleHackingGame = (answer) => {
    const ans = answer.toUpperCase().trim();

    if (gameState.stage === 1) {
      if (ans === 'C' || ans === 'O(LOG N)') {
        addLog('[LEVEL 1 UNLOCKED] - Correct! Moving to level 2...');
        setGameState({ active: true, stage: 2 });
        addLog('Question 2: Which protocol translates a domain name into an IP address?');
        addLog('  (A) HTTP');
        addLog('  (B) DNS');
        addLog('  (C) FTP');
        addLog('Type A, B, or C:');
      } else {
        addLog('[ACCESS DENIED] Incorrect answer. Hacking sequence reset.');
        setGameState({ active: false, stage: 0 });
      }
    } else if (gameState.stage === 2) {
      if (ans === 'B' || ans === 'DNS') {
        addLog('[LEVEL 2 UNLOCKED] - Correct! Final stage...');
        setGameState({ active: true, stage: 3 });
        addLog('Question 3: In SQL, which clause is used to filter records in an aggregated GROUP?');
        addLog('  (A) WHERE');
        addLog('  (B) HAVING');
        addLog('  (C) FILTER');
        addLog('Type A, B, or C:');
      } else {
        addLog('[ACCESS DENIED] Incorrect answer. Hacking sequence reset.');
        setGameState({ active: false, stage: 0 });
      }
    } else if (gameState.stage === 3) {
      if (ans === 'B' || ans === 'HAVING') {
        addLog('----------------------------------------------------');
        addLog('[ACCESS GRANTED] PORTAL BYPASSED SUCCESSFULLY!');
        addLog('CONGRATULATIONS HACKER! FLAG UNLOCKED:');
        addLog('>>>   KLE_FLAG{N3ON_BYT3S_2026}   <<<');
        addLog('Screenshot this flag and show it at the CS desk for an extra points coupon! 🏆');
        addLog('----------------------------------------------------');
        localStorage.setItem('hacker_flag', 'unlocked');
        setGameState({ active: false, stage: 0 });
      } else {
        addLog('[ACCESS DENIED] Incorrect answer. Hacking sequence reset.');
        setGameState({ active: false, stage: 0 });
      }
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleCommand(inputValue);
    }
  };

  return (
    <>
      {/* Floating CLI Terminal Toggle Button */}
      <div style={{ position: 'fixed', bottom: '30px', right: '105px', zIndex: 999 }}>
        <motion.button
          onClick={() => setIsOpen(!isOpen)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #0f172a 0%, #020617 100%)',
            border: '1px solid rgba(0, 240, 255, 0.4)',
            boxShadow: '0 8px 32px rgba(15, 23, 42, 0.35)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            color: '#38bdf8'
          }}
          whileHover={{ scale: 1.08, y: -2 }}
          whileTap={{ scale: 0.95 }}
        >
          <TerminalIcon size={26} />
        </motion.button>
      </div>

      {/* Terminal Drawer Bottom Panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            style={{
              position: 'fixed',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '350px',
              backgroundColor: '#030712',
              borderTop: '2px solid #38bdf8',
              zIndex: 998,
              boxShadow: '0 -10px 40px rgba(0,0,0,0.6)',
              display: 'flex',
              flexDirection: 'column',
              fontFamily: 'Courier New, Courier, monospace',
              color: '#4ade80' // retro green text color
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Terminal Header */}
            <div style={{
              padding: '10px 20px',
              background: '#090d16',
              borderBottom: '1px solid rgba(56, 189, 248, 0.2)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center'
            }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold', color: '#38bdf8', letterSpacing: '0.1em' }}>
                SYSTEM ROOT CONSOLE - BYPASS ACTIVE
              </span>
              <button
                onClick={() => setIsOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ef4444',
                  cursor: 'pointer',
                  padding: '4px'
                }}
              >
                <X size={18} />
              </button>
            </div>

            {/* Terminal Log Console */}
            <div style={{
              flex: 1,
              padding: '20px',
              overflowY: 'auto',
              fontSize: '0.85rem',
              lineHeight: '1.5',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              backgroundColor: 'rgba(3,7,18,0.98)'
            }}>
              {history.map((log, idx) => (
                <div key={idx} style={{ 
                  whiteSpace: 'pre-wrap',
                  color: log.startsWith('>') ? '#38bdf8' : (log.includes('[ERROR]') || log.includes('[ACCESS DENIED]') ? '#f87171' : '#4ade80') 
                }}>
                  {log}
                </div>
              ))}
              <div ref={consoleEndRef} />
            </div>

            {/* Terminal Command Input Bar */}
            <div style={{
              padding: '10px 20px',
              borderTop: '1px solid rgba(56, 189, 248, 0.15)',
              display: 'flex',
              gap: '10px',
              alignItems: 'center',
              backgroundColor: '#090d16'
            }}>
              <span style={{ color: '#38bdf8', fontWeight: 'bold' }}>$</span>
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder={gameState.active ? 'Enter your answer (A, B, or C)...' : 'Type command here (e.g. help)...'}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  fontFamily: 'Courier New, Courier, monospace',
                  fontSize: '0.85rem',
                  color: '#4ade80',
                  caretColor: '#38bdf8'
                }}
                autoFocus
              />
              <button
                onClick={() => handleCommand(inputValue)}
                disabled={!inputValue.trim()}
                style={{
                  background: 'none',
                  border: 'none',
                  color: inputValue.trim() ? '#38bdf8' : 'rgba(56, 189, 248, 0.3)',
                  cursor: inputValue.trim() ? 'pointer' : 'default'
                }}
              >
                <Play size={16} />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
