<!-- src/routes/profile.svelte -->
<script lang="ts">
	import type { Poll } from '$lib/types';
	import PollCard from '../../components/PollCard.svelte';
  import UserProfile from '../../components/UserProfile.svelte';

  export let data;
  export let error;
  let allPolls: Poll[] | undefined | null= data.allPolls

  // console.log(allPolls)
</script>
{#if allPolls}
  <UserProfile allPolls={allPolls} error={error}/>
{/if}