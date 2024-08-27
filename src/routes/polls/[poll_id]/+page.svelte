<script lang="ts">
  export let data: any;
  let poll = data.props.poll 
  let options = data.props.options
  export let error: string | undefined;

  // If there's an error, throw it to be handled by the error boundary
  if (error) {
    throw new Error(error);
  }
</script>

{#if error}
  <p>Error: {error}</p>
{:else if !poll}
  <p>Poll not found</p>
{:else}
  <h1>{poll.title}</h1>
  <ul>
    {#each options as option}
      <li>{option.option}</li>
    {/each}
  </ul>
{/if}
