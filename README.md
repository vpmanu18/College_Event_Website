# KLE Society's Degree College Gangavathi - Tech Fest 2k26-27

A complete, production-quality, responsive, and secure full-stack web application designed for the official technical festival of KLE Society's Degree College, Gangavathi. 

Featuring a futuristic campus theme, glassmorphism UI card components, a real-time participant statistics countdown timer, and secure database registrations, this platform is built to deliver a premium user experience on all screen layouts.

---

## Technical Stack

### Frontend
- **React 19** & **Vite**: Ultra-fast build environment and modular component framework.
- **React Router Dom**: Dynamic client-side routing.
- **Framer Motion**: Micro-interactions, scroll reveals, and custom animations.
- **Lucide React**: Clean futuristic UI icons.
- **Vanilla CSS3**: Tailored dark grid layout design system.

### Backend
- **Python Flask**: Secure REST API gateway separating credentials from client-side vulnerability.
- **Flask-CORS**: Cross-Origin Resource Sharing capabilities for React client connection.
- **Supabase Python Client**: Secure database transactions.

### Database
- **Supabase (PostgreSQL)**: Persistent cloud relational database storing events, registrations, and contact submissions.

---

## Directory Architecture

```
tech_fest_KLE/
├── frontend/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/      # Reusable UI (Navbar, Hero, Countdown, Slider, etc.)
│   │   ├── context/         # AuthContext state management
│   │   ├── pages/           # Page layouts (Home, Events, Details, Register, Contact)
│   │   ├── services/        # API service connection client
│   │   ├── App.jsx          # Router & layouts setup
│   │   ├── index.css        # Design tokens, variables & animations
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── config/              # Environment configs & validation
│   ├── database/            # SQL schemas & migration seed scripts
│   ├── routes/              # Modular API & auth endpoints
│   ├── services/            # Supabase connection clients
│   ├── requirements.txt     # Python requirements
│   └── app.py               # Main Flask entrance script
│
├── .env.example             # Configuration setup guide
├── .gitignore               # Ignored local files
└── README.md
```

---

## Database Schema Configuration

Execute the following SQL queries within the **Supabase SQL Editor** to establish the necessary relational tables:

```sql
-- Create events table
CREATE TABLE events (
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
CREATE TABLE registrations (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    participant_name TEXT NOT NULL,
    mobile_number TEXT NOT NULL,
    email TEXT NOT NULL,
    event_id UUID REFERENCES events(id) ON DELETE CASCADE,
    event_name TEXT NOT NULL,
    registered_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL,
    user_id UUID, -- Links to Supabase Auth User ID if registered by a logged-in user
    UNIQUE (email, event_id) -- Prevent duplicate registration for the same event
);

-- Create contact messages table
CREATE TABLE contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial events
INSERT INTO events (name, slug, description, location, event_time, event_date, category)
VALUES
('Hackathon', 'hackathon', 'A 24-hour intense coding sprint where teams collaborate to build innovative technological solutions for real-world problems.', 'Auditorium', '9:00 AM', '2026-11-13', 'coding'),
('Blind Coding', 'blind-coding', 'Test your muscle memory and syntactical command by writing functional programs with your monitors turned completely off.', 'Auditorium', '9:00 PM', '2026-11-13', 'coding'),
('Error Debugging', 'error-debugging', 'Sleuth through code bases, trace stack traces, fix compile errors, and optimize broken algorithms against a ticking clock.', 'B.Com 3rd Year Classroom', '11:00 AM', '2026-11-13', 'debugging'),
('DSA Coding', 'dsa-coding', 'Solve complex algorithm challenges and data structure problems. Optimize for time and space complexity to top the leaderboard.', 'BCA 2nd Year Classroom', '9:00 AM', '2026-11-13', 'coding'),
('Treasure Hunt', 'treasure-hunt', 'Crack technical riddles, decipher cryptographic clues, and navigate around campus to find the hidden treasure.', 'KLE Hall', '1:00 PM', '2026-11-13', 'challenge')
ON CONFLICT (slug) DO NOTHING;
```

---

## Local Setup & Development

### 1. Environment Configuration
Create a `.env` file at the root folder based on `.env.example`:

```env
SUPABASE_URL=https://your-supabase-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_KEY=your-supabase-service-role-key-here
FLASK_SECRET_KEY=any-secure-random-string-key
```

### 2. Backend Server Setup
Navigate to the root folder, optionally start a virtual environment, and install dependencies:

```bash
# Optional virtual env setup
python -m venv venv
venv\Scripts\activate   # Windows

# Install requirements
pip install -r backend/requirements.txt

# Run server
python -m backend.app
```
The server will boot on `http://localhost:5000`.

### 3. Frontend Client Setup
Navigate to the `frontend/` folder:

```bash
cd frontend

# Install packages
npm install

# Start Vite dev client
npm run dev
```
The client dashboard will open on `http://localhost:5173`.

---

## API Documentation

| Method | Endpoint | Description | Headers |
|---|---|---|---|
| **GET** | `/api/events` | Fetch all events & participant registration count | None |
| **GET** | `/api/events/<id_or_slug>` | Fetch single event details | None |
| **POST** | `/api/register` | Submit registration form for specific event | `Authorization` (optional) |
| **GET** | `/api/participants/count` | Retrieve total registrations count | None |
| **POST** | `/api/contact` | Post support message | None |
| **POST** | `/api/auth/signup` | Signup participant credential | None |
| **POST** | `/api/auth/login` | Login user, retrieve access token JWT | None |
| **GET** | `/api/auth/dashboard` | Fetch logged-in user registrations details | `Authorization: Bearer <token>` |

---

## Security Practices
- **Credential Separation**: Secrets like `SUPABASE_SERVICE_KEY` are kept strictly in backend `.env` variables and never packaged to client builds.
- **Input Sanitation**: Emails and phones are validated against regex models before database insertions.
- **Duplicate Prevention**: Row indexes prevent users from registering multiple times for the same event category.
