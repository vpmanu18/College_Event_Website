# KLE Society's Degree College Gangavathi — Tech Fest 2k26-27

![Tech Fest Banner](https://img.shields.io/badge/Event%20Date-18%20February%202027-00f0ff?style=for-the-badge&logo=eventbrite)
![License](https://img.shields.io/badge/License-MIT-38ef7d?style=for-the-badge)
![React](https://img.shields.io/badge/React%2019-Vite-61dafb?style=for-the-badge&logo=react)
![Python](https://img.shields.io/badge/Flask%203-API-ffdd54?style=for-the-badge&logo=flask)
![Supabase](https://img.shields.io/badge/Supabase-PostgreSQL-3ecf8e?style=for-the-badge&logo=supabase)
![Streamlit](https://img.shields.io/badge/Streamlit-Free%20Tier-ff4b4b?style=for-the-badge&logo=streamlit)

A modern, production-grade, responsive, and secure full-stack web platform designed for the official technical festival of **KLE Society's Degree College, Gangavathi**.

Featuring a futuristic cyber-campus theme, glassmorphic UI components, a real-time countdown timer to **February 18, 2027**, an integrated **Grok AI Chatbot Agent**, interactive retro CLI terminal, and cloud database persistence with Supabase.

---

## 🌟 Key Highlights

- **Event Date**: **18 February 2027** at KLE BCA College Campus, Gangavathi.
- **12 Flagship Competitions**: Hackathon, Blind Coding, Error Debugging, DSA Coding, Treasure Hunt, Web Design, SQL Murder Mystery, Speed Typing, Code Golfing, AI Prompt Engineering, CTF, and Code Refactoring.
- **Permanent Cloud Database**: Backed by Supabase PostgreSQL for persistent registrations, slot tracking, and zero data loss.
- **Dual Portal Experience**:
  - **Student Portal (React + Vite)**: Event browsing, countdown timers, slot progress, student registration receipts, and participant authentication dashboard.
  - **Admin / Organizer Portal (Streamlit Cloud)**: Live registrations viewer, participant search/filtering by event or college, and **1-click CSV export**.
- **Deployable Anywhere**: Configured for **Render** (via `render.yaml`), **Streamlit Community Cloud** (100% Free), and standard local development.

---

## 🛠️ Technical Stack

| Layer | Technologies |
|---|---|
| **Frontend** | React 19, Vite, React Router Dom 7, Framer Motion, Lucide Icons, Vanilla CSS3 Variables |
| **Backend API** | Python 3.11+, Flask 3, Flask-CORS, PyJWT, Gunicorn |
| **Database** | Supabase (Cloud PostgreSQL) |
| **Admin Portal** | Streamlit Community Cloud, Pandas |
| **Deployment** | Render Blueprint (`render.yaml`), Streamlit Cloud (`streamlit_app.py`) |

---

## 📁 Directory Architecture

```
tech_fest_KLE/
├── .streamlit/
│   └── config.toml          # Neon dark theme for Streamlit Portal
├── backend/
│   ├── config/              # Environment settings & validation (settings.py)
│   ├── database/            # Database schema.sql & seed.py
│   ├── routes/              # Modular API blueprints (api.py, auth.py)
│   ├── services/            # Supabase database client (supabase_client.py)
│   ├── requirements.txt     # Backend specific dependencies
│   └── app.py               # Flask application entrypoint & factory
├── frontend/
│   ├── public/              # Static assets (favicons, icons)
│   ├── src/
│   │   ├── assets/          # Media & graphics
│   │   ├── components/      # Glassmorphism UI (Navbar, Hero, Countdown, GrokAgent, etc.)
│   │   ├── context/         # AuthContext state management
│   │   ├── pages/           # Page routes (Home, Events, Details, Dashboard, Contact)
│   │   ├── services/        # Client API service connector (api.js)
│   │   ├── App.jsx          # Router & layouts setup
│   │   ├── index.css        # Cyber theme tokens & layout styles
│   │   └── main.jsx
│   ├── package.json
│   └── vite.config.js
├── streamlit_app.py         # Free-tier Streamlit Admin & Database Viewer
├── requirements.txt         # Root Python requirements (Streamlit Cloud & Backend)
├── render.yaml              # Render Blueprint specification (Web Service + Static Site)
├── .env.example             # Environment configuration template
├── .gitignore               # Strict exclusion rules (secrets, venv, node_modules)
└── README.md
```

---

## 🗄️ Database Setup (Supabase PostgreSQL)

To set up your permanent cloud database:
1. Log in to [supabase.com](https://supabase.com) and create a free project.
2. Open the **SQL Editor** in your Supabase Dashboard.
3. Paste and run the following schema from [backend/database/schema.sql](backend/database/schema.sql):

```sql
-- Create users table for authentication
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
    event_date TEXT NOT NULL DEFAULT '2027-02-18',
    image TEXT,
    participant_limit INTEGER DEFAULT 50,
    category TEXT NOT NULL,
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
    user_id UUID,
    UNIQUE (email, event_id)
);

-- Create contacts table
CREATE TABLE IF NOT EXISTS contacts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Seed initial 12 events
INSERT INTO events (name, slug, description, location, event_time, event_date, participant_limit, category)
VALUES
('Hackathon', 'hackathon', 'A 24-hour intense coding sprint where teams collaborate to build innovative technological solutions.', 'Auditorium', '9:00 AM', '2027-02-18', 50, 'coding'),
('Blind Coding', 'blind-coding', 'Test muscle memory and syntax command by writing functional code with monitors turned off.', 'Auditorium', '9:00 PM', '2027-02-18', 50, 'coding'),
('Error Debugging', 'error-debugging', 'Sleuth through code bases, trace stack traces, fix compile errors, and optimize broken algorithms.', 'B.Com 3rd Year Classroom', '11:00 AM', '2027-02-18', 50, 'debugging'),
('DSA Coding', 'dsa-coding', 'Solve complex algorithm challenges. Optimize for time and space complexity to top the leaderboard.', 'BCA 2nd Year Classroom', '9:00 AM', '2027-02-18', 50, 'coding'),
('Treasure Hunt', 'treasure-hunt', 'Crack technical riddles, decipher cryptographic clues, and navigate around campus.', 'KLE Hall', '1:00 PM', '2027-02-18', 50, 'challenge'),
('Web Design Showdown', 'web-design-showdown', 'Craft visual aesthetics and responsive UI prototypes within a strict timeline.', 'BCA 1st Year Classroom', '10:30 AM', '2027-02-18', 40, 'challenge'),
('SQL Murder Mystery', 'sql-murder-mystery', 'Investigate schemas, join tables, and filter records to solve a complex murder case.', 'Computer Lab 1', '2:00 PM', '2027-02-18', 30, 'debugging'),
('Speed Typing Duel', 'speed-typing-duel', 'High-stakes elimination rounds testing words-per-minute speed and character accuracy.', 'Seminar Hall', '11:30 AM', '2027-02-18', 64, 'challenge'),
('Code Golfing', 'code-golfing', 'Write functional programs using the fewest characters possible.', 'B.Com 1st Year Classroom', '3:30 PM', '2027-02-18', 40, 'coding'),
('AI Prompt Engineering Challenge', 'ai-prompt-engineering', 'Manipulate LLMs through structured prompts to solve queries and produce clean code output.', 'Computer Lab 2', '4:00 PM', '2027-02-18', 50, 'coding'),
('Capture The Flag', 'capture-the-flag', 'Cybersecurity competition finding hidden flags in vulnerable services and binaries.', 'Seminar Hall', '10:00 AM', '2027-02-18', 30, 'challenge'),
('Code Refactoring Arena', 'code-refactoring-arena', 'Clean up nested legacy code bases to make them modular and testable without altering output.', 'BCA 3rd Year Classroom', '1:30 PM', '2027-02-18', 50, 'debugging')
ON CONFLICT (slug) DO NOTHING;
```

---

## 💻 Local Setup & Development

### 1. Environment Configuration
Create a `.env` file in the root folder based on `.env.example`:

```env
SUPABASE_URL=https://your-supabase-project-id.supabase.co
SUPABASE_ANON_KEY=your-supabase-anon-key-here
SUPABASE_SERVICE_KEY=your-supabase-service-role-key-here
FLASK_SECRET_KEY=any-secure-random-32-character-key
FLASK_ENV=development
PORT=5000
```

### 2. Run the Backend API (Flask)
In your first terminal:

```powershell
# Windows
.\venv\Scripts\Activate.ps1
pip install -r backend/requirements.txt
python -m backend.app

# Linux / macOS
source venv/bin/activate
pip install -r backend/requirements.txt
python -m backend.app
```
Backend starts on: `http://localhost:5000`

### 3. Run the Frontend Client (React + Vite)
In your second terminal:

```bash
cd frontend
npm install
npm run dev
```
Frontend starts on: `http://localhost:5173`

### 4. Run the Admin Portal (Streamlit — Optional)
In a third terminal:

```bash
streamlit run streamlit_app.py
```
Admin Portal opens on: `http://localhost:8501`

---

## 🌐 Production Deployment

### Option A: Render Full Stack Hosting (`render.yaml`)

This repository includes a [render.yaml](render.yaml) Blueprint that sets up both the Flask API Web Service and the React Static Site in one click.

1. Push your code to your GitHub repository.
2. Sign in to [dashboard.render.com](https://dashboard.render.com).
3. Click **New +** $\rightarrow$ **Blueprint**.
4. Select your repository `College_Event_Website`.
5. Enter the external environment variables:
   - For **`kle-techfest-backend`**:
     - `SUPABASE_URL`: `https://<your-project>.supabase.co`
     - `SUPABASE_ANON_KEY`: `your-anon-key`
     - `SUPABASE_SERVICE_KEY`: `your-service-role-key`
   - For **`kle-techfest-frontend`**:
     - `VITE_API_URL`: `https://kle-techfest-backend.onrender.com/api`
6. Click **Apply**. Render will automatically build and deploy both services!

---

### Option B: Streamlit Community Cloud (100% Free Hosting)

Deploy the companion Admin & Registration Management Portal permanently for free:

1. Sign in to [share.streamlit.io](https://share.streamlit.io) with GitHub.
2. Click **Create app** $\rightarrow$ **I already have an app**.
3. Configure settings:
   - **Repository**: `vpmanu18/College_Event_Website`
   - **Branch**: `main`
   - **Main file path**: `streamlit_app.py`
4. Expand **Advanced settings** $\rightarrow$ **Secrets**, and paste:
   ```toml
   SUPABASE_URL = "https://your-project.supabase.co"
   SUPABASE_KEY = "your-anon-or-service-role-key"
   ```
5. Click **Deploy!**
6. Access your live database viewer at: `https://<your-app-name>.streamlit.app`

---

## 📡 API Reference

| Method | Endpoint | Description | Auth Required |
|---|---|---|---|
| `GET` | `/api/events` | List all 12 events with live registration counts | No |
| `GET` | `/api/events/<slug_or_id>` | Get specific event details and slot availability | No |
| `POST` | `/api/register` | Register student for an event (checks duplicates & slots) | Optional |
| `GET` | `/api/participants/count` | Aggregate participant and registration statistics | No |
| `POST` | `/api/contact` | Submit contact/support message | No |
| `POST` | `/api/chat` | Grok AI Chat assistant endpoint | No |
| `POST` | `/api/auth/signup` | Student account registration | No |
| `POST` | `/api/auth/login` | Student login returning JWT Bearer token | No |
| `GET` | `/api/auth/dashboard` | Fetch logged-in student's confirmed event passes | `Bearer <token>` |

---

## 🔒 Security Practices

- **Zero Secret Leakage**: Database service keys are excluded from git via strict [.gitignore](.gitignore) rules.
- **Input Validation**: Student phone numbers (10-digit Indian pattern `^[6-9]\d{9}$`) and emails are regex-validated.
- **Duplicate Prevention**: Database unique constraint `UNIQUE (email, event_id)` prevents accidental multi-registration for the same competition.
- **Capacity Enforcement**: Real-time slot checks prevent over-registration beyond venue capacity.

---

## 👥 Institution & Credits

- **Institution**: KLE Society's Degree College, Gangavathi, Karnataka.
- **Academic Year**: 2026–2027.
- **Main Event Date**: **18 February 2027**.
- **Departments**: BCA, B.Sc, B.Com, BBA.
