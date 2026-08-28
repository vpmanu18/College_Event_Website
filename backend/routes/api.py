import re
from flask import Blueprint, request, jsonify
from backend.services.supabase_client import supabase
from collections import Counter

api_bp = Blueprint('api', __name__)

ENTRY_FEES = {
    "hackathon": 0,
    "blind-coding": 50,
    "error-debugging": 0,
    "dsa-coding": 100,
    "treasure-hunt": 150,
    "web-design-showdown": 50,
    "sql-murder-mystery": 0,
    "speed-typing-duel": 0,
    "code-golfing": 50,
    "ai-prompt-engineering": 0,
    "capture-the-flag": 100,
    "code-refactoring-arena": 50
}

def is_valid_email(email):
    """Regex to validate email format."""
    email_regex = r'^[\w\.-]+@[\w\.-]+\.\w+$'
    return bool(re.match(email_regex, email))

def is_valid_indian_mobile(mobile):
    """Checks if mobile is exactly 10 digits."""
    return bool(re.match(r'^[6-9]\d{9}$', mobile))

def get_auth_user_id(headers):
    """Extracts user_id from Authorization header if present and valid."""
    auth_header = headers.get('Authorization')
    if not auth_header or not auth_header.startswith('Bearer '):
        return None
    
    token = auth_header.split(' ')[1]
    try:
        import jwt
        from backend.config.settings import Config
        # Decode the custom JWT token signed with Flask SECRET_KEY
        payload = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
        return payload.get('user_id')
    except Exception as e:
        # If token is invalid or expired, return None
        print(f"[AUTH ERROR] Failed to fetch user from token: {e}")
        return None

@api_bp.route('/events', methods=['GET'])
def get_events():
    try:
        # Fetch all events
        events_res = supabase.table('events').select('*').order('name').execute()
        events = events_res.data or []

        # Fetch all registrations to compute counts
        regs_res = supabase.table('registrations').select('event_id').execute()
        regs = regs_res.data or []
        counts = Counter(r['event_id'] for r in regs)

        # Map participant counts and entry fees to events
        for event in events:
            event['participant_count'] = counts[event['id']]
            event['entry_fee'] = ENTRY_FEES.get(event['slug'], 0)

        return jsonify(events)
    except Exception as e:
        print(f"[API ERROR] Get events failed: {e}")
        return jsonify({"error": "Unable to load events. Please try again."}), 500

@api_bp.route('/events/<event_id_or_slug>', methods=['GET'])
def get_event(event_id_or_slug):
    try:
        # Check if ID (UUID format) or slug
        is_uuid = len(event_id_or_slug) == 36 and '-' in event_id_or_slug
        
        if is_uuid:
            query = supabase.table('events').select('*').eq('id', event_id_or_slug)
        else:
            query = supabase.table('events').select('*').eq('slug', event_id_or_slug)
            
        res = query.execute()
        if not res.data:
            return jsonify({"error": "Event not found."}), 404
        
        event = res.data[0]
        
        # Get participant count
        regs_res = supabase.table('registrations').select('id').eq('event_id', event['id']).execute()
        event['participant_count'] = len(regs_res.data or [])
        event['entry_fee'] = ENTRY_FEES.get(event['slug'], 0)
        
        return jsonify(event)
    except Exception as e:
        print(f"[API ERROR] Get event failed: {e}")
        return jsonify({"error": "Unable to load event details. Please try again."}), 500

@api_bp.route('/register', methods=['POST'])
def register_event():
    try:
        data = request.json or {}
        participant_name = data.get('participant_name', '').strip()
        mobile_number = data.get('mobile_number', '').strip()
        email = data.get('email', '').strip().lower()
        college_name = data.get('college_name', '').strip()
        voucher_code = data.get('voucher_code', '').strip()
        event_id = data.get('event_id', '').strip()

        # Validate inputs
        if not participant_name or len(participant_name) < 2:
            return jsonify({"error": "Participant name is required (min 2 characters)."}), 400
        
        if not mobile_number or not is_valid_indian_mobile(mobile_number):
            return jsonify({"error": "Invalid Indian mobile number. Must be exactly 10 digits starting with 6-9."}), 400

        if not email or not is_valid_email(email):
            return jsonify({"error": "Valid Gmail / Email address is required."}), 400

        if not college_name or len(college_name) < 2:
            return jsonify({"error": "College name is required (min 2 characters)."}), 400

        if not event_id:
            return jsonify({"error": "Event selection is required."}), 400

        # Validate event exists
        event_res = supabase.table('events').select('*').eq('id', event_id).execute()
        if not event_res.data:
            return jsonify({"error": "Event not found."}), 404
        event = event_res.data[0]

        # Validate Voucher Code
        discount_percent = 0
        if voucher_code:
            v_code = voucher_code.upper()
            if v_code in ["KLEFREE", "N3ON_BYT3S_2026", "KLE_FLAG{N3ON_BYT3S_2026}"]:
                discount_percent = 100
            elif v_code == "KLE50":
                discount_percent = 50
            elif v_code == "STUDENT":
                discount_percent = 20
            else:
                return jsonify({"error": "Invalid voucher code."}), 400

        # Check current registrations count
        regs_count_res = supabase.table('registrations').select('id').eq('event_id', event_id).execute()
        current_registrations = len(regs_count_res.data or [])
        slots_limit = event.get('participant_limit') or 50
        if current_registrations >= slots_limit:
            return jsonify({"error": f"Registration is closed. All {slots_limit} slots for {event['name']} have been filled."}), 400

        # Duplicate registration check
        duplicate_res = supabase.table('registrations').select('*').eq('email', email).eq('event_id', event_id).execute()
        if duplicate_res.data:
            return jsonify({"error": f"You are already registered for the {event['name']}."}), 400

        # Optional Auth Link (link to user account if headers contain valid token)
        user_id = get_auth_user_id(request.headers)

        # Insert registration record
        insert_data = {
            "participant_name": participant_name,
            "mobile_number": mobile_number,
            "email": email,
            "college_name": college_name,
            "event_id": event_id,
            "event_name": event['name']
        }
        if voucher_code:
            insert_data['voucher_code'] = voucher_code
        if user_id:
            insert_data['user_id'] = user_id

        try:
            reg_insert = supabase.table('registrations').insert(insert_data).execute()
        except Exception as db_err:
            # Fallback if custom columns are missing in the database table schema yet
            err_msg = str(db_err).lower()
            if "college_name" in err_msg or "voucher_code" in err_msg or "column" in err_msg:
                print(f"[DATABASE WARNING] Custom column is missing in Supabase: {db_err}")
                print("Attempting fallback registration without custom columns...")
                fallback_data = insert_data.copy()
                fallback_data.pop("college_name", None)
                fallback_data.pop("voucher_code", None)
                reg_insert = supabase.table('registrations').insert(fallback_data).execute()
            else:
                raise db_err

        if not reg_insert.data:
            return jsonify({"error": "Registration could not be completed. Please try again."}), 500
        
        reg_record = reg_insert.data[0]
        
        return jsonify({
            "success": True,
            "message": "Registration successful",
            "registration": {
                "id": reg_record['id'],
                "participant_name": reg_record['participant_name'],
                "event_name": reg_record['event_name'],
                "college_name": reg_record.get('college_name', ''),
                "voucher_code": reg_record.get('voucher_code', '') or voucher_code,
                "discount_percent": discount_percent,
                "final_fee": max(0, ENTRY_FEES.get(event['slug'], 0) * (100 - discount_percent) // 100),
                "registered_at": reg_record['registered_at']
            }
        }), 201

    except Exception as e:
        print(f"[API ERROR] Registration failed: {e}")
        return jsonify({"error": "Registration could not be completed. Please try again."}), 500

@api_bp.route('/participants/count', methods=['GET'])
def get_participants_count():
    try:
        # Fetch unique participants count & total registrations
        regs_res = supabase.table('registrations').select('email').execute()
        regs = regs_res.data or []
        
        total_registrations = len(regs)
        unique_emails = set(r['email'] for r in regs)
        total_participants = len(unique_emails)

        # Get total events
        events_res = supabase.table('events').select('id').execute()
        total_events = len(events_res.data or [])

        return jsonify({
            "total_participants": total_participants,
            "total_registrations": total_registrations,
            "total_events": total_events if total_events > 0 else 5,
            "college": "KLE Society's Degree College"
        })
    except Exception as e:
        print(f"[API ERROR] Stats count failed: {e}")
        return jsonify({
            "total_participants": 0,
            "total_registrations": 0,
            "total_events": 5,
            "college": "KLE Society's Degree College",
            "warning": "Live database statistics could not be loaded."
        })

@api_bp.route('/participants/count/<event_id>', methods=['GET'])
def get_event_participants_count(event_id):
    try:
        res = supabase.table('registrations').select('id').eq('event_id', event_id).execute()
        count = len(res.data or [])
        return jsonify({"event_id": event_id, "participant_count": count})
    except Exception as e:
        print(f"[API ERROR] Event stats failed: {e}")
        return jsonify({"event_id": event_id, "participant_count": 0})

@api_bp.route('/contact', methods=['POST'])
def post_contact():
    try:
        data = request.json or {}
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        message = data.get('message', '').strip()

        if not name or len(name) < 2:
            return jsonify({"error": "Name is required (min 2 characters)."}), 400
        if not email or not is_valid_email(email):
            return jsonify({"error": "Valid Email / Gmail is required."}), 400
        if not message or len(message) < 5:
            return jsonify({"error": "Message is required (min 5 characters)."}), 400

        # Save to database
        insert_res = supabase.table('contacts').insert({
            "name": name,
            "email": email,
            "message": message
        }).execute()

        if not insert_res.data:
            return jsonify({"error": "Failed to send message. Please try again."}), 500

        return jsonify({
            "success": True,
            "message": "Thank you for contacting us. We will get back to you shortly!"
        }), 201
    except Exception as e:
        print(f"[API ERROR] Contact message failed: {e}")
        return jsonify({"error": "An error occurred while saving your message."}), 500

@api_bp.route('/chat', methods=['POST'])
def chat_ai():
    try:
        data = request.json or {}
        user_message = data.get('message', '').strip().lower()
        if not user_message:
            return jsonify({"reply": "Hey! You didn't say anything. I can't read your mind (yet). What would you like to know about KLE Tech Fest?"}), 200

        # Extract words for boundary-clean matching
        msg_words = set(re.findall(r'\b\w+\b', user_message))

        # Fetch events from Supabase to provide accurate database responses
        events_res = supabase.table('events').select('*').execute()
        events = events_res.data or []

        # Analyze message content and construct response
        reply = ""

        # 1. Check for specific event details first (takes priority over general keywords)
        matched_event = None
        for event in events:
            name_words = event['name'].lower().split()
            slug_words = event['slug'].lower().replace('-', ' ').split()
            # If the user names the specific event directly
            if event['slug'].lower() in user_message or \
               event['name'].lower() in user_message or \
               any(word in msg_words for word in name_words if len(word) > 3) or \
               any(word in msg_words for word in slug_words if len(word) > 3):
                matched_event = event
                break

        if matched_event:
            fee = ENTRY_FEES.get(matched_event['slug'], 0)
            fee_text = f"₹{fee}" if fee > 0 else "FREE!"
            reply = (
                f"Here are the details for **{matched_event['name']}** 🎮:\n\n"
                f"📝 **Description**: {matched_event['description']}\n"
                f"📍 **Venue**: {matched_event['location']}\n"
                f"⏰ **Time**: {matched_event['event_time']} on {matched_event['event_date']}\n"
                f"🎟️ **Entry Fee**: {fee_text}\n"
                f"👥 **Participant Limit**: {matched_event['participant_limit'] or 50} slots max.\n\n"
                f"Ready to compete? Click 'Register' on the event card!"
            )

        # 2. Check for greetings (using clean word boundary match)
        elif any(w in msg_words for w in ["hello", "hi", "hey", "greetings", "yo", "sup"]):
            reply = "Hello, human! ⚡ I am Grok KLE Agent, your futuristic guide for KLE Degree College's Tech Fest 2k26-27. Ask me about events, timing, fees, venues, or registration!"

        # 3. Check for listing events or categories
        elif any(w in user_message for w in ["events", "what events", "event list", "list of events", "activities", "competitions"]):
            event_names = [e['name'] for e in events]
            reply = f"We have {len(events)} thrilling events lined up for you! 🚀\n\n" + ", ".join(f"**{name}**" for name in event_names) + "\n\nWhich event would you like to know more about? I can give you details on timing, fee, location, and limit!"

        # 4. Check for registration info
        elif any(w in user_message for w in ["register", "registration", "signup", "how to sign up", "join"]):
            reply = "To register for any event, simply:\n1. Click **REGISTER** on the event card or details page.\n2. Fill in your **Name**, **Email**, **Mobile Number**, and **College Name**.\n3. Submit! Note: registration is dynamic and checks live seats availability, so claim your spot fast! ⚡"

        # 5. Check for general info about KLE Society College or tech fest venue/date
        elif any(w in user_message for w in ["kle", "college", "where is", "location", "venue", "gangavathi", "date"]):
            if "date" in user_message or "when" in user_message:
                reply = "The Grand Tech Fest is scheduled to take place on **November 13, 2026**! Set your timers and prepare for a technological showdown. 📅"
            else:
                reply = "The Tech Fest is hosted by **KLE Society's Degree College, Gangavathi**. Most events take place in the Seminar Hall, Auditorium, BCA Classrooms, and Computer Labs. 📍"

        # 6. Check for jokes
        elif any(w in msg_words for w in ["joke", "funny", "laugh"]):
            jokes = [
                "Why do programmers wear glasses? Because they can't C#! 🤓",
                "There are 10 types of people in this world: Those who understand binary, and those who don't. 🤖",
                "How many programmers does it take to change a light bulb? None, that's a hardware problem! 💡",
                "A SQL query walks into a bar, walks up to two tables and asks, 'Can I join you?' 📊"
            ]
            import random
            reply = f"Here's a grok-styled logic byte for you:\n\n\"{random.choice(jokes)}\" ⚡"

        # 7. Check for Grok agent persona questions
        elif any(w in msg_words for w in ["grok", "who", "what"]):
            reply = "I am **Grok KLE Agent**, a witty AI guide compiled with quantum layers of sass and knowledge specifically optimized for KLE Society Degree College's Tech Fest! How can I assist you today, human?"

        # 8. Fallback
        else:
            reply = (
                "I parsed your query but couldn't locate a direct match in my current data nodes. 🔌\n\n"
                "You can ask me things like:\n"
                "👉 *'Tell me about the Hackathon'* \n"
                "👉 *'List all events'* \n"
                "👉 *'How do I register?'* \n"
                "👉 *'When is the Tech Fest starting?'*"
            )

        return jsonify({
            "success": True,
            "reply": reply
        }), 200

    except Exception as e:
        print(f"[API ERROR] AI Chat failed: {e}")
        return jsonify({"error": "I encountered a query compiler exception. Try again!"}), 500
