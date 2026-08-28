-- Create custom users table for email/password authentication
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create events table
CREATE TABLE IF NOT EXISTS events (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    event_time TEXT NOT NULL,
    event_date TEXT NOT NULL DEFAULT '2026-11-13',
    image TEXT,
    participant_limit INTEGER,
    category TEXT NOT NULL, -- coding, debugging, challenge
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create registrations table
CREATE TABLE IF NOT EXISTS registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    email TEXT NOT NULL,
    college_name TEXT NOT NULL DEFAULT 'KLE Society Degree College',
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID, -- Links to Supabase Auth User ID if registered by a logged-in user
    UNIQUE (email, event_id) -- Prevent duplicate registration for the same event
);

-- Create contact messages table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial events
INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Hackathon', 'hackathon', 'A 24-hour intense coding sprint where teams collaborate to build innovative technological solutions for real-world problems.', 'Auditorium', '9:00 AM', '2026-11-13', 50, 'coding')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Blind Coding', 'blind-coding', 'Test your muscle memory and syntactical command by writing functional programs with your monitors turned completely off.', 'Auditorium', '9:00 PM', '2026-11-13', 50, 'coding')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Error Debugging', 'error-debugging', 'Sleuth through code bases, trace stack traces, fix compile errors, and optimize broken algorithms against a ticking clock.', 'B.Com 3rd Year Classroom', '11:00 AM', '2026-11-13', 50, 'debugging')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('DSA Coding', 'dsa-coding', 'Solve complex algorithm challenges and data structure problems. Optimize for time and space complexity to top the leaderboard.', 'BCA 2nd Year Classroom', '9:00 AM', '2026-11-13', 50, 'coding')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Treasure Hunt', 'treasure-hunt', 'Crack technical riddles, decipher cryptographic clues, and navigate around campus to find the hidden treasure.', 'KLE Hall', '1:00 PM', '2026-11-13', 50, 'challenge')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Web Design Showdown', 'web-design-showdown', 'A design challenge where participants craft visual aesthetics and layout prototypes for dynamic web applications within a strict timeline.', 'BCA 1st Year Classroom', '10:30 AM', '2026-11-13', 40, 'challenge')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('SQL Murder Mystery', 'sql-murder-mystery', 'Put your database queries to the test to investigate schemas, join tables, and filter records to solve a complex murder case.', 'Computer Lab 1', '2:00 PM', '2026-11-13', 30, 'debugging')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Speed Typing Duel', 'speed-typing-duel', 'Go keyboard-to-keyboard in high-stakes elimination rounds to prove your words-per-minute speed and character accuracy.', 'Seminar Hall', '11:30 AM', '2026-11-13', 64, 'challenge')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Code Golfing', 'code-golfing', 'Write functional programs using the fewest characters possible. Test your syntax efficiency and creative logic.', 'B.Com 1st Year Classroom', '3:30 PM', '2026-11-13', 40, 'coding')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('AI Prompt Engineering Challenge', 'ai-prompt-engineering', 'Manipulate large language models through structured prompts to solve coding queries, debug files, and produce clean code output.', 'Computer Lab 2', '4:00 PM', '2026-11-13', 50, 'coding')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Capture The Flag', 'capture-the-flag', 'A cybersecurity competition where teams find flags hidden in vulnerable services, cryptosystems, and reverse engineered binaries.', 'Seminar Hall', '10:00 AM', '2026-11-13', 30, 'challenge')
ON CONFLICT (slug) DO NOTHING;

INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Code Refactoring Arena', 'code-refactoring-arena', 'Clean up bloated, unreadable, and nested legacy code bases to make them modular, fast, and testable without altering output behavior.', 'BCA 3rd Year Classroom', '1:30 PM', '2026-11-13', 50, 'debugging')
ON CONFLICT (slug) DO NOTHING;
