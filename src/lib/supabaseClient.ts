import { createClient } from '@supabase/supabase-js'

const supabaseUrl: string = 'https://deeskytavmrojvpftqfv.supabase.co';
// const supabaseAnonKey: string = process.env.SUPAPOLLS_SUPABASE_KEY!;
const supabaseAnonKey: string = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRlZXNreXRhdm1yb2p2cGZ0cWZ2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ1Mzc1MDUsImV4cCI6MjA0MDExMzUwNX0.RySZqxkWoqYMisU8LUWsNclI2QdUkDPkYW21LY_oKvY';

export const supabase = createClient(supabaseUrl, supabaseAnonKey)