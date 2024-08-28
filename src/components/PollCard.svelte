<script lang="ts">
	import PieChart from "./PieChart.svelte";
  import type { Poll } from '$lib/types';
	import { fetchVoteCounts, getOptionIdsByPoll, getVoteCountsByOptions, vote } from "$lib/polls";
	import { onDestroy, onMount } from "svelte";
	import { supabase } from "$lib/supabaseClient";

  export let poll: Poll
  export let options: { id: string, option: string, vote_count: number }[]

  export let error: string | undefined;

  if (error) {
    throw new Error(error);
  }
  
  async function handleVote(optionId: string) {
    const res = await vote(optionId, poll, options);

    if (Array.isArray(res)) {
      options = res
    } else {
      console.error('An error occurred:', res.message);
      }
  }  
  onMount(() => {
    const channel = supabase
      .channel('votes-channel')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'Votes' }, async payload => {
        console.log('Change received!', payload);
        const res = await fetchVoteCounts(poll.id, options);
        if (Array.isArray(res)) options = res
      })
      .subscribe();

    onDestroy(() => {
      // Unsubscribe when the component is destroyed
      supabase.removeChannel(channel);
    });
  })
  
</script>

<div class="flex place-content-center flex-col justify-center items-center h-full gap-12">
  <div class="text-center">
    <h1 class="font-bold text-3xl mb-2">{poll.title}</h1>
    <h2>{poll.description}</h2>
  </div>
  <div>
    <PieChart data={options} />
  </div>
  <div>
    <div class="inline-flex border rounded-md overflow-hidden">
      {#each options as option, i}
        <button
          class="px-4 py-2 font-medium text-gray-700 bg-white 
                  {i === 0 ? 'rounded-l-md' : ''} 
                  {i === options.length - 1 ? 'rounded-r-md' : ''} 
                  {i < options.length - 1 ? 'border-r' : ''}"
          on:click={() => handleVote(option.id)}
        >
          {option.option} <br><span class="text-xs">{option.vote_count} {option.vote_count === 1 ? 'vote' : 'votes'}</span>
        </button>
      {/each}
    </div>
    
  </div>

</div>