import os
from dotenv import load_dotenv
from supabase import create_client

# Load env file from the project root
root_dir = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
load_dotenv(os.path.join(root_dir, '.env'))

url = os.environ.get('SUPABASE_URL')
key = os.environ.get('SUPABASE_SERVICE_KEY') or os.environ.get('SUPABASE_ANON_KEY')

if not url or not key:
    print("Error: SUPABASE_URL and key are not configured in your .env file.")
    exit(1)

supabase = create_client(url, key)

events = [
    {
        "name": "Hackathon",
        "slug": "hackathon",
        "description": "A 24-hour intense coding sprint where teams collaborate to build innovative technological solutions for real-world problems.",
        "location": "Auditorium",
        "event_time": "9:00 AM",
        "event_date": "2026-11-13",
        "participant_limit": 50,
        "category": "coding"
    },
    {
        "name": "Blind Coding",
        "slug": "blind-coding",
        "description": "Test your muscle memory and syntactical command by writing functional programs with your monitors turned completely off.",
        "location": "Auditorium",
        "event_time": "9:00 PM",
        "event_date": "2026-11-13",
        "participant_limit": 50,
        "category": "coding"
    },
    {
        "name": "Error Debugging",
        "slug": "error-debugging",
        "description": "Sleuth through code bases, trace stack traces, fix compile errors, and optimize broken algorithms against a ticking clock.",
        "location": "B.Com 3rd Year Classroom",
        "event_time": "11:00 AM",
        "event_date": "2026-11-13",
        "participant_limit": 50,
        "category": "debugging"
    },
    {
        "name": "DSA Coding",
        "slug": "dsa-coding",
        "description": "Solve complex algorithm challenges and data structure problems. Optimize for time and space complexity to top the leaderboard.",
        "location": "BCA 2nd Year Classroom",
        "event_time": "9:00 AM",
        "event_date": "2026-11-13",
        "participant_limit": 50,
        "category": "coding"
    },
    {
        "name": "Treasure Hunt",
        "slug": "treasure-hunt",
        "description": "Crack technical riddles, decipher cryptographic clues, and navigate around campus to find the hidden treasure.",
        "location": "KLE Hall",
        "event_time": "1:00 PM",
        "event_date": "2026-11-13",
        "participant_limit": 50,
        "category": "challenge"
    },
    {
        "name": "Web Design Showdown",
        "slug": "web-design-showdown",
        "description": "A design challenge where participants craft visual aesthetics and layout prototypes for dynamic web applications within a strict timeline.",
        "location": "BCA 1st Year Classroom",
        "event_time": "10:30 AM",
        "event_date": "2026-11-13",
        "participant_limit": 40,
        "category": "challenge"
    },
    {
        "name": "SQL Murder Mystery",
        "slug": "sql-murder-mystery",
        "description": "Put your database queries to the test to investigate schemas, join tables, and filter records to solve a complex murder case.",
        "location": "Computer Lab 1",
        "event_time": "2:00 PM",
        "event_date": "2026-11-13",
        "participant_limit": 30,
        "category": "debugging"
    },
    {
        "name": "Speed Typing Duel",
        "slug": "speed-typing-duel",
        "description": "Go keyboard-to-keyboard in high-stakes elimination rounds to prove your words-per-minute speed and character accuracy.",
        "location": "Seminar Hall",
        "event_time": "11:30 AM",
        "event_date": "2026-11-13",
        "participant_limit": 64,
        "category": "challenge"
    },
    {
        "name": "Code Golfing",
        "slug": "code-golfing",
        "description": "Write functional programs using the fewest characters possible. Test your syntax efficiency and creative logic.",
        "location": "B.Com 1st Year Classroom",
        "event_time": "3:30 PM",
        "event_date": "2026-11-13",
        "participant_limit": 40,
        "category": "coding"
    },
    {
        "name": "AI Prompt Engineering Challenge",
        "slug": "ai-prompt-engineering",
        "description": "Manipulate large language models through structured prompts to solve coding queries, debug files, and produce clean code output.",
        "location": "Computer Lab 2",
        "event_time": "4:00 PM",
        "event_date": "2026-11-13",
        "participant_limit": 50,
        "category": "coding"
    },
    {
        "name": "Capture The Flag",
        "slug": "capture-the-flag",
        "description": "A cybersecurity competition where teams find flags hidden in vulnerable services, cryptosystems, and reverse engineered binaries.",
        "location": "Seminar Hall",
        "event_time": "10:00 AM",
        "event_date": "2026-11-13",
        "participant_limit": 30,
        "category": "challenge"
    },
    {
        "name": "Code Refactoring Arena",
        "slug": "code-refactoring-arena",
        "description": "Clean up bloated, unreadable, and nested legacy code bases to make them modular, fast, and testable without altering output behavior.",
        "location": "BCA 3rd Year Classroom",
        "event_time": "1:30 PM",
        "event_date": "2026-11-13",
        "participant_limit": 50,
        "category": "debugging"
    }
]

print("Starting database seeding...")

for event in events:
    try:
        # Check if the event already exists by slug
        existing = supabase.table('events').select('id').eq('slug', event['slug']).execute()
        if existing.data:
            # Update the existing event's details (specifically participant_limit)
            res = supabase.table('events').update({
                "participant_limit": event["participant_limit"],
                "description": event["description"],
                "location": event["location"],
                "event_time": event["event_time"]
            }).eq('slug', event['slug']).execute()
            print(f"Updated event '{event['name']}' with participant limit: {event['participant_limit']}")
        else:
            res = supabase.table('events').insert(event).execute()
            if res.data:
                print(f"Successfully seeded event: {event['name']}")
            else:
                print(f"Failed to seed event: {event['name']}")
    except Exception as e:
        print(f"Error seeding event '{event['name']}': {e}")

print("Seeding completed!")
