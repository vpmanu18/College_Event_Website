from supabase import create_client, Client
from backend.config.settings import Config

# Initialize Supabase client
Config.validate()
supabase: Client = create_client(Config.SUPABASE_URL, Config.SUPABASE_KEY)

def get_supabase_client() -> Client:
    return supabase
