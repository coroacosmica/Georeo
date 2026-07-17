import { createClient } from '@supabase/supabase-js';

// We fall back to the provided publishable key if the env variable isn't set
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://YOUR_PROJECT_ID.supabase.co';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__4A6xNaSW5THBBVpAYr77w_OHOHPrZ8';

export const supabase = createClient(supabaseUrl, supabaseKey);
