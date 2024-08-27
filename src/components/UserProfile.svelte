<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { writable } from 'svelte/store';

  let user = writable<any>(null);

  // Function to fetch the current user
  async function fetchUser() {
    const { data: { user: currentUser }, error } = await supabase.auth.getUser();

    if (error) {
      console.error('Error fetching user:', error.message);
    } else {
      user.set(currentUser);
    }
  }

  // Fetch user on component mount
  onMount(async () => {
    await fetchUser();

    // Subscribe to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      user.set(session?.user ?? null);
    });

    // Clean up subscription on component destroy
    onDestroy(() => {
      subscription.unsubscribe();
    });
    console.log($user)
  });

  // Handle sign out
  async function handleSignOut() {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.error('Error signing out:', error.message);
    } else {
      user.set(null);
    }
  }
</script>

{#if $user}
  <div>
    <p>Welcome, {$user.email}!</p>
    <button on:click={handleSignOut}>Sign Out</button>
  </div>
{:else}
  <p>Please sign in</p>
{/if}
