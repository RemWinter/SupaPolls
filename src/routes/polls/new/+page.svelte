<script lang="ts">
  import { supabase } from '$lib/supabaseClient'; // Import Supabase client
  import type { Poll } from '$lib/types'; // Import types if applicable
  import { createPoll } from '$lib/polls';

  let title: string = '';
  let options: string[] = []; // Array to hold options
  let isPublic = true

 // Function to create a new poll
// async function createPoll(): Promise<void> {
//   // Check if user is authenticated
//   const { data: userData, error: userError } = await supabase.auth.getUser();
  
//   if (userError) {
//     console.error('Error fetching user:', userError.message);
//     return;
//   }

//   const user = userData.user;
//   if (!user) {
//     console.error('User is not authenticated');
//     return;
//   }
//   console.log(user)

//   // Step 1: Insert poll into Polls table
//   const { data: pollData, error: pollError } = await supabase
//     .from('Polls')
//     .insert([{ title: title }])
//     .select()
//     .single(); // Get the inserted poll data

//   if (pollError) {
//     console.error('Error creating poll:', pollError);
//     return;
//   }

//   console.log(pollData)

//   // Step 2: Insert options into Options table
//   if (pollData) {
//     const pollId = pollData.id; // Capture the poll id

//     // Map options to the format needed by the Options table
//     const optionsToInsert = options.map(option => ({
//       poll_id: pollId,
//       option
//     }));

//     const { data: optionsData, error: optionsError } = await supabase
//       .from('Options')
//       .insert(optionsToInsert);

//     if (optionsError) {
//       console.error('Error creating poll options:', optionsError);
//       return;
//     }

//     console.log('Poll created:', pollData);
//     console.log('Options created:', optionsData);

//     // Optionally, redirect to the polls list or the newly created poll
//     // import { goto } from '$app/navigation';
//     // goto('/polls');
//   }
// }

</script>

<div>
  <input bind:value={title} placeholder="Enter poll title" />
  <input bind:value={options[0]} placeholder="Enter option 1" />
  <input bind:value={options[1]} placeholder="Enter option 2" />
  <input bind:checked={isPublic} type="checkbox" placeholder="Public has access to poll"/>
  <!-- Add more option inputs as needed -->

  <button on:click={() => createPoll(title, options, isPublic)}>Create Poll</button>
</div>
