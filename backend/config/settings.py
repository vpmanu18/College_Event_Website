import os
from dotenv import load_dotenv

# Load env variables from root or backend directory .env file
load_dotenv(os.path.join(os.path.dirname(os.path.dirname(os.path.dirname(__file__))), '.env'))
load_dotenv()

class Config:
    SECRET_KEY = os.environ.get('FLASK_SECRET_KEY')
    if not SECRET_KEY:
        # Fallback for development, warning printed
        SECRET_KEY = 'dev-secret-key-kle-tech-fest'
        print("[WARNING] FLASK_SECRET_KEY environment variable not set. Using dev fallback.")

    SUPABASE_URL = os.environ.get('SUPABASE_URL')
    SUPABASE_ANON_KEY = os.environ.get('SUPABASE_ANON_KEY')
    SUPABASE_SERVICE_KEY = os.environ.get('SUPABASE_SERVICE_KEY')

    # The backend should prioritize using the service key for administrative bypass of RLS,
    # but fall back to the anon key if that's all that's provided.
    SUPABASE_KEY = SUPABASE_SERVICE_KEY or SUPABASE_ANON_KEY

    @classmethod
    def validate(cls):
        missing = []
        if not cls.SUPABASE_URL:
            missing.append('SUPABASE_URL')
        if not cls.SUPABASE_KEY:
            missing.append('SUPABASE_ANON_KEY (or SUPABASE_SERVICE_KEY)')
        
        if missing:
            raise ValueError(f"Missing required configuration variables: {', '.join(missing)}")
