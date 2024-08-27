import { supabase } from './supabaseClient';
import { writable } from 'svelte/store';
import type { User as SupabaseUser } from '@supabase/auth-js';

// Create a writable store to hold the user
export const user = writable<SupabaseUser | null>(null);

// Function to fetch the current user
export async function fetchUser(): Promise<void> {
  const { data: { user: currentUser }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error.message);
  } else {
    user.set(currentUser);
  }
}
