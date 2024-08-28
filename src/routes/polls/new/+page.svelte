<script lang="ts">
  import { supabase } from '$lib/supabaseClient'; // Import Supabase client
  import type { Poll } from '$lib/types'; // Import types if applicable
  import { createPoll } from '$lib/polls';

  let title: string = '';
  let description: string = '';
  let options: string[] = []; // Array to hold options
  let isPublic = true

</script>

<div>
  <input bind:value={title} placeholder="Enter poll title" />
  <input bind:value={description} placeholder="Enter poll description" />
  <input bind:value={options[0]} placeholder="Enter option 1" />
  <input bind:value={options[1]} placeholder="Enter option 2" />
  <input bind:checked={isPublic} type="checkbox" placeholder="Public has access to poll"/>
  <!-- Add more option inputs as needed -->

  <button 
    on:click={() => createPoll(title, description, options, isPublic)}
    class="px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
    >Create Poll</button>
</div>
