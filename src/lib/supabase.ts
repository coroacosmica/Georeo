import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || '';
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable__4A6xNaSW5THBBVpAYr77w_OHOHPrZ8';

export const supabase = supabaseUrl && supabaseUrl.startsWith('http') 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;

