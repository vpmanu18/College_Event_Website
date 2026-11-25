import os
import io
import csv
from datetime import datetime
import streamlit as st
from dotenv import load_dotenv

# Page Configuration
st.set_page_config(
    page_title="KLE Tech Fest 2k26-27 | Admin & Event Portal",
    page_icon="⚡",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Load local environment variables as fallback
load_dotenv()

# Helper to retrieve config from Streamlit Secrets or Environment
def get_config(key, default=""):
    try:
        if key in st.secrets:
            return st.secrets[key]
    except Exception:
        pass
    return os.environ.get(key, default)

# Sidebar Configuration & Brand
with st.sidebar:
    st.markdown("## ⚡ KLE Tech Fest 2k26-27")
    st.caption("KLE Society's Degree College, Gangavathi")
    st.markdown("---")
    
    st.markdown("### 🔐 Database Settings")
    
    default_url = get_config("SUPABASE_URL", "")
    default_key = get_config("SUPABASE_SERVICE_KEY") or get_config("SUPABASE_ANON_KEY") or get_config("SUPABASE_KEY", "")
    
    supabase_url = st.text_input("Supabase URL", value=default_url, placeholder="https://xyz.supabase.co")
    supabase_key = st.text_input("Supabase Key (Anon or Service)", value=default_key, type="password", placeholder="eyJhbGci...")

    st.markdown("---")
    st.markdown("### 📅 Fest Date")
    st.info("**18 February 2027**\n\nCampus: KLE BCA College, Gangavathi")
    
    st.caption("Version 1.0.0 • Streamlit Cloud Free Tier")

# Initialize Supabase Client
@st.cache_resource(show_spinner=False)
def init_supabase(url, key):
    if not url or not key:
        return None
    try:
        from supabase import create_client
        return create_client(url.strip(), key.strip())
    except Exception as e:
        st.sidebar.error(f"Supabase connection error: {e}")
        return None

client = init_supabase(supabase_url, supabase_key)

# Header Section
st.title("⚡ KLE Tech Fest 2k26-27 Portal")
st.markdown("Official Registration Database, Analytics & Event Management Dashboard.")

if not client:
    st.warning("⚠️ **Database credentials not configured or inactive.**")
    st.markdown("""
    To connect your live permanent Supabase database:
    1. Enter your **Supabase URL** and **API Key** in the left sidebar.
    2. Or on **Streamlit Community Cloud**, add them under **Settings → Secrets**:
    ```toml
    SUPABASE_URL = "https://your-project.supabase.co"
    SUPABASE_KEY = "your-anon-or-service-key"
    ```
    """)
    st.stop()

# Helper query functions
def fetch_events():
    try:
        res = client.table("events").select("*").order("name").execute()
        return res.data or []
    except Exception as e:
        st.error(f"Error fetching events: {e}")
        return []

def fetch_registrations():
    try:
        res = client.table("registrations").select("*").order("registered_at", desc=True).execute()
        return res.data or []
    except Exception as e:
        st.error(f"Error fetching registrations: {e}")
        return []

def fetch_contacts():
    try:
        res = client.table("contacts").select("*").order("created_at", desc=True).execute()
        return res.data or []
    except Exception as e:
        return []

# Tabs Navigation
tab1, tab2, tab3, tab4 = st.tabs([
    "📊 Registrations Database", 
    "📝 Live Event Registration", 
    "📅 Event Directory & Slots",
    "📩 Contact Inquiries"
])

# =========================================================================
# TAB 1: REGISTRATIONS DATABASE
# =========================================================================
with tab1:
    st.subheader("📋 Registered Participants")
    
    registrations = fetch_registrations()
    events = fetch_events()
    
    # Top Metrics
    total_regs = len(registrations)
    unique_participants = len(set(r.get("email", "") for r in registrations if r.get("email")))
    total_events = len(events)
    
    col_m1, col_m2, col_m3 = st.columns(3)
    col_m1.metric("Total Registrations", total_regs)
    col_m2.metric("Unique Participants", unique_participants)
    col_m3.metric("Total Events", total_events)
    
    st.markdown("---")
    
    # Filter Controls
    col_f1, col_f2 = st.columns([2, 3])
    
    event_names = ["All Events"] + sorted(list(set(e.get("name", "") for e in events if e.get("name"))))
    selected_event = col_f1.selectbox("Filter by Event", event_names)
    search_query = col_f2.text_input("Search (Name, Email, Mobile, College)", placeholder="Type to search...").strip().lower()
    
    # Apply filters
    filtered_regs = registrations
    if selected_event != "All Events":
        filtered_regs = [r for r in filtered_regs if r.get("event_name") == selected_event]
        
    if search_query:
        filtered_regs = [
            r for r in filtered_regs if (
                search_query in str(r.get("participant_name", "")).lower() or
                search_query in str(r.get("email", "")).lower() or
                search_query in str(r.get("mobile_number", "")).lower() or
                search_query in str(r.get("college_name", "")).lower() or
                search_query in str(r.get("event_name", "")).lower()
            )
        ]
        
    # Export CSV Button
    if filtered_regs:
        csv_buffer = io.StringIO()
        fieldnames = ["Participant Name", "Mobile Number", "Email", "College Name", "Event Name", "Registration ID", "Registered At"]
        writer = csv.writer(csv_buffer)
        writer.writerow(fieldnames)
        
        for r in filtered_regs:
            writer.writerow([
                r.get("participant_name", ""),
                r.get("mobile_number", ""),
                r.get("email", ""),
                r.get("college_name", "KLE Society Degree College"),
                r.get("event_name", ""),
                r.get("id", ""),
                r.get("registered_at", "")
            ])
            
        st.download_button(
            label="📥 Download Filtered Data as CSV",
            data=csv_buffer.getvalue(),
            file_name=f"kle_techfest_registrations_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
            mime="text/csv",
            use_container_width=True
        )

    # Display Data Table
    if filtered_regs:
        try:
            import pandas as pd
            display_df = pd.DataFrame([
                {
                    "Participant Name": r.get("participant_name", ""),
                    "Mobile": r.get("mobile_number", ""),
                    "Email": r.get("email", ""),
                    "College": r.get("college_name", "KLE Society Degree College"),
                    "Event": r.get("event_name", ""),
                    "Date & Time": r.get("registered_at", "")[:19].replace("T", " ") if r.get("registered_at") else "",
                    "Registration ID": r.get("id", "")[:13] + "..." if r.get("id") else ""
                }
                for r in filtered_regs
            ])
            st.dataframe(display_df, use_container_width=True, hide_index=True)
        except ImportError:
            st.table(filtered_regs)
    else:
        st.info("No registrations match the selected criteria.")

# =========================================================================
# TAB 2: LIVE EVENT REGISTRATION
# =========================================================================
with tab2:
    st.subheader("📝 Register Participant for an Event")
    st.caption("Submit registrations directly into the permanent cloud database.")
    
    events = fetch_events()
    event_options = {e["name"]: e["id"] for e in events}
    
    if not event_options:
        st.warning("No events found in database. Please run schema seed first.")
    else:
        with st.form("admin_registration_form", clear_on_submit=True):
            col_r1, col_r2 = st.columns(2)
            
            p_name = col_r1.text_input("Participant Full Name *", placeholder="e.g. Ramesh Kumar")
            p_email = col_r2.text_input("Email / Gmail *", placeholder="ramesh@gmail.com")
            
            p_mobile = col_r1.text_input("10-Digit Mobile Number *", placeholder="9876543210", max_chars=10)
            p_college = col_r2.text_input("College Name *", value="KLE Society's Degree College, Gangavathi")
            
            chosen_event_name = st.selectbox("Select Event *", list(event_options.keys()))
            
            submit_btn = st.form_submit_button("Submit Registration ⚡", use_container_width=True)
            
            if submit_btn:
                if not p_name or len(p_name) < 2:
                    st.error("Please provide a valid participant name.")
                elif not p_email or "@" not in p_email:
                    st.error("Please provide a valid email address.")
                elif not p_mobile or len(p_mobile) != 10 or not p_mobile.isdigit():
                    st.error("Please provide a valid 10-digit mobile number.")
                else:
                    event_id = event_options[chosen_event_name]
                    try:
                        # Check duplicate
                        dup = client.table("registrations").select("id").eq("email", p_email.lower().strip()).eq("event_id", event_id).execute()
                        if dup.data:
                            st.error(f"Participant with email {p_email} is already registered for {chosen_event_name}.")
                        else:
                            new_record = {
                                "participant_name": p_name.strip(),
                                "email": p_email.strip().lower(),
                                "mobile_number": p_mobile.strip(),
                                "college_name": p_college.strip(),
                                "event_id": event_id,
                                "event_name": chosen_event_name
                            }
                            res = client.table("registrations").insert(new_record).execute()
                            if res.data:
                                reg = res.data[0]
                                st.success("✅ **REGISTRATION SUCCESSFUL!**")
                                st.json({
                                    "Registration ID": reg.get("id"),
                                    "Participant": reg.get("participant_name"),
                                    "Event": reg.get("event_name"),
                                    "College": reg.get("college_name"),
                                    "Status": "Confirmed Permanently in Database"
                                })
                            else:
                                st.error("Failed to register. Please try again.")
                    except Exception as e:
                        st.error(f"Database error: {e}")

# =========================================================================
# TAB 3: EVENT DIRECTORY & SLOTS
# =========================================================================
with tab3:
    st.subheader("📅 Event Directory & Slot Availability")
    events = fetch_events()
    registrations = fetch_registrations()
    
    # Calculate counts per event
    reg_counts = {}
    for r in registrations:
        eid = r.get("event_id")
        reg_counts[eid] = reg_counts.get(eid, 0) + 1
        
    for e in events:
        eid = e.get("id")
        limit = e.get("participant_limit") or 50
        registered = reg_counts.get(eid, 0)
        remaining = max(0, limit - registered)
        
        with st.expander(f"🎮 {e.get('name')} — {remaining} / {limit} Slots Remaining", expanded=False):
            col_e1, col_e2, col_e3 = st.columns(3)
            col_e1.write(f"**Date:** {e.get('event_date', '2027-02-18')}")
            col_e2.write(f"**Time:** {e.get('event_time', '9:00 AM')}")
            col_e3.write(f"**Venue:** {e.get('location', 'Auditorium')}")
            
            st.write(f"**Description:** {e.get('description', '')}")
            
            progress = min(1.0, registered / limit) if limit else 0.0
            st.progress(progress, text=f"{registered} of {limit} participants registered ({int(progress * 100)}% filled)")

# =========================================================================
# TAB 4: CONTACT INQUIRIES
# =========================================================================
with tab4:
    st.subheader("📩 Contact Messages Received")
    contacts = fetch_contacts()
    
    if contacts:
        for c in contacts:
            with st.container(border=True):
                col_c1, col_c2 = st.columns([3, 1])
                col_c1.markdown(f"**From:** {c.get('name')} (`{c.get('email')}`)")
                col_c2.caption(c.get("created_at", "")[:19].replace("T", " "))
                st.markdown(f"> {c.get('message')}")
    else:
        st.info("No contact messages received yet.")
