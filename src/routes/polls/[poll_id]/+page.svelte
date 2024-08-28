<script lang="ts">
  import PieChart from '../../../components/PieChart.svelte';
  import { user, fetchUser } from '$lib/users';
  import { vote, getOptionIdsByPoll, getVoteCountsByOptions } from '$lib/polls';
  import type { Poll } from '$lib/types';
	import PollCard from '../../../components/PollCard.svelte';

  export let data: any;
  let poll: Poll = data.poll;
  let options: { id: string, option: string, vote_count: number }[] = data.options;
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

</script>

{#if error}
  <p>Error: {error}</p>
{:else if !poll}
  <p>Poll not found</p>
{:else}
  <PollCard poll={poll} options={options} error={error}/>
{/if}