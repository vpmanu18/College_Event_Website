import hashlib
import jwt
import datetime
from flask import Blueprint, request, jsonify
from backend.services.supabase_client import supabase
from backend.config.settings import Config

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/signup', methods=['POST'])
def signup():
    try:
        data = request.json or {}
        name = data.get('name', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')

        if not name or len(name) < 2:
            return jsonify({"error": "Name is required (min 2 characters)."}), 400
        if not email or '@' not in email:
            return jsonify({"error": "Valid Email / Gmail is required."}), 400
        if not password or len(password) < 6:
            return jsonify({"error": "Password must be at least 6 characters long."}), 400

        # Check if the user already exists in the custom users table
        existing_res = supabase.table('users').select('id').eq('email', email).execute()
        if existing_res.data:
            return jsonify({"error": "An account with this email already exists."}), 400

        # Hash the password using SHA-256
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        # Insert user into the custom users table
        insert_res = supabase.table('users').insert({
            "name": name,
            "email": email,
            "password": hashed_password
        }).execute()

        if not insert_res.data:
            return jsonify({"error": "Sign up failed. User could not be created."}), 400

        return jsonify({
            "success": True,
            "message": "Account created successfully! You can now log in."
        }), 201

    except Exception as e:
        print(f"[AUTH ERROR] Signup failed: {e}")
        return jsonify({"error": "Failed to create account. Please try again."}), 500

@auth_bp.route('/login', methods=['POST'])
def login():
    try:
        data = request.json or {}
        email = data.get('email', '').strip().lower()
        password = data.get('password', '')

        if not email or not password:
            return jsonify({"error": "Email and password are required."}), 400

        # Hash the password using SHA-256 to match the stored hash
        hashed_password = hashlib.sha256(password.encode('utf-8')).hexdigest()

        # Query the custom users table
        res = supabase.table('users').select('*').eq('email', email).eq('password', hashed_password).execute()
        
        if not res.data:
            return jsonify({"error": "Invalid email or password."}), 401
        
        user = res.data[0]

        # Generate a custom JWT token signed with Flask's SECRET_KEY
        payload = {
            "user_id": user['id'],
            "email": user['email'],
            "name": user['name'],
            "exp": datetime.datetime.utcnow() + datetime.timedelta(days=7)
        }
        token = jwt.encode(payload, Config.SECRET_KEY, algorithm='HS256')

        # Return session credentials so frontend can authenticate APIs
        return jsonify({
            "success": True,
            "message": "Login successful",
            "access_token": token,
            "user": {
                "id": user['id'],
                "email": user['email'],
                "name": user['name']
            }
        }), 200

    except Exception as e:
        print(f"[AUTH ERROR] Login failed: {e}")
        return jsonify({"error": "Invalid email or password."}), 401

@auth_bp.route('/dashboard', methods=['GET'])
def dashboard():
    try:
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            return jsonify({"error": "Authentication token required."}), 401
        
        token = auth_header.split(' ')[1]
        
        # Verify custom JWT token
        try:
            payload = jwt.decode(token, Config.SECRET_KEY, algorithms=['HS256'])
            user_id = payload['user_id']
            email = payload['email']
            name = payload['name']
        except Exception as e:
            print(f"[AUTH ERROR] Token verification failed: {e}")
            return jsonify({"error": "Invalid or expired token."}), 401

        # Get registrations associated with this user's email
        # Note: Users can register before or after signing up.
        # We query by email for maximum coverage and link to user_id as secondary fallback.
        email = email.lower()
        
        regs_res = supabase.table('registrations').select('*').eq('email', email).execute()
        registrations = regs_res.data or []

        # If they registered with user_id but different email, fetch those too
        regs_by_uid_res = supabase.table('registrations').select('*').eq('user_id', user_id).execute()
        regs_by_uid = regs_by_uid_res.data or []
        
        # Merge list and remove duplicates by id
        merged_regs = {r['id']: r for r in registrations + regs_by_uid}
        final_regs = list(merged_regs.values())

        # Resolve event details for each registration to return date, venue, time, slug
        events_res = supabase.table('events').select('*').execute()
        events_dict = {e['id']: e for e in events_res.data or []}

        dashboard_registrations = []
        for reg in final_regs:
            event_details = events_dict.get(reg['event_id'], {})
            dashboard_registrations.append({
                "registration_id": reg['id'],
                "event_id": reg['event_id'],
                "event_slug": event_details.get('slug', ''),
                "event_name": reg['event_name'],
                "registered_at": reg['registered_at'],
                "event_date": event_details.get('event_date', '2026-11-13'),
                "event_time": event_details.get('event_time', '9:00 AM'),
                "venue": event_details.get('location', 'KLE BCA College, Gangavathi'),
                "status": "Confirmed"
            })

        return jsonify({
            "user": {
                "id": user_id,
                "email": email,
                "name": name
            },
            "registrations": dashboard_registrations
        }), 200

    except Exception as e:
        print(f"[AUTH ERROR] Dashboard fetch failed: {e}")
        return jsonify({"error": "Could not load dashboard data. Please try again."}), 500
