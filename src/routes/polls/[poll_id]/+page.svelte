<script lang="ts">
  import PieChart from '../../../components/PieChart.svelte';
  import { user, fetchUser } from '$lib/users';
  import { vote, getOptionIdsByPoll, getVoteCountsByOptions } from '$lib/polls';
  import type { Poll } from '$lib/types';

  export let data: any;
  let poll: Poll = data.props.poll;
  let options: { id: string, option: string, vote_count: number }[] = data.props.options;
  export let error: string | undefined;

  if (error) {
    throw new Error(error);
  }

  async function fetchVoteCounts() {
    const optionIds = await getOptionIdsByPoll(poll.id);

    if (optionIds) {
      const voteData = await getVoteCountsByOptions(optionIds);

      if (voteData) {
        options = options.map(option => {
          const voteCount = voteData.find(vote => vote.option_id === option.id);
          return {
            ...option,
            vote_count: voteCount ? voteCount.count : 0
          };
        });
      } else {
        console.error('Failed to load vote counts');
      }
    } else {
      console.error('Failed to load option IDs');
    }
  }

  // Fetch vote counts on mount
  fetchVoteCounts();

  async function handleVote(optionId: string) {
    const { error } = await vote(optionId, poll, options);
    if (!error) {
      await fetchVoteCounts();
    } else {
      console.error('Error while voting:', error.message);
    }
  }
</script>

{#if error}
  <p>Error: {error}</p>
{:else if !poll}
  <p>Poll not found</p>
{:else}
  <h1>{poll.title}</h1>
  <PieChart data={options} />
  <ul>
    {#each options as option}
      <li>
        {option.option} - {option.vote_count} votes
        <button on:click={() => handleVote(option.id)}>Vote</button>
      </li>
    {/each}
  </ul>
{/if}