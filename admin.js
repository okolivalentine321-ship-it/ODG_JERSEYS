const SUPABASE_URL = "https://fbsvgzvwzkceyoekhvna.supabase.co";
const SUPABASE_KEY = "YOUR_SUPABASE_KEY";

const supabaseClient = supabase.createClient(
  SUPABASE_URL,
  SUPABASE_KEY
);

console.log("Admin Supabase connected");

