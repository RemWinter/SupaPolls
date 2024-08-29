<script lang="ts">
  import PieChart from '../../../components/PieChart.svelte';
  import { user, fetchUser } from '$lib/users';
  import { vote, getOptionIdsByPoll, getVoteCountsByOptions } from '$lib/polls';
  import type { Option, Poll } from '$lib/types';
	import PollCard from '../../../components/PollCard.svelte';

  export let data: any;

  let poll: Poll = data.poll;
  let options: Option[] = poll.options

  export let error: string | undefined;

  if (error) {
    throw new Error(error);
  }

</script>

{#if error}
  <p>Error: {error}</p>
{:else if !poll}
  <p>Poll not found</p>
{:else}
  <PollCard poll={poll} error={error}/>
{/if}