console.log("DEBUG - URL:", process.env.NEXT_PUBLIC_SUPABASE_URL);
console.log("DEBUG - KEY EXISTS?:", !!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY);
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)