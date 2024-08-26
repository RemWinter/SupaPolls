<script lang="ts">
  import { onMount } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import type { Poll } from '$lib/types';

  let polls: Poll[] = [];

  async function loadPolls(): Promise<void> {
  const { data: pollsData, error } = await supabase
    .from('Polls')
    .select('*'); // Let Supabase infer the correct return type
  if (error) {
    console.error('Error loading polls:', error);
  } else {
    polls = pollsData ? pollsData : []; // Handle potential nulls
  }
  console.log(supabase)
}

  onMount(loadPolls);
</script>

{#each polls as poll}
  <div>
    <p>{poll.title}</p>
  </div>
{/each}
