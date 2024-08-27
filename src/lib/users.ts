import { supabase } from './supabaseClient';
import { writable } from 'svelte/store';

// Create a writable store to hold the user
export const user = writable<any>(null);

// Function to fetch the current user
export async function fetchUser(): Promise<void> {
  const { data: { user: currentUser }, error } = await supabase.auth.getUser();

  if (error) {
    console.error('Error fetching user:', error.message);
  } else {
    user.set(currentUser);
  }
}
