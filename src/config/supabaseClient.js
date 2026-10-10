const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn(
    '[WARNING] SUPABASE_URL atau SUPABASE_KEY belum di-set. Cek file .env atau Environment Variables di Vercel.'
  );
}

const supabase = createClient(supabaseUrl, supabaseKey);

module.exports = supabase;
