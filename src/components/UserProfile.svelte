<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import { supabase } from '$lib/supabaseClient';
  import { writable } from 'svelte/store';
  import { user, fetchUser } from '$lib/users';
	import { signOut } from '$lib/auth';
  import Swiper from 'swiper';
  import 'swiper/css';
  import 'swiper/css/navigation';
  import 'swiper/css/pagination';
  import 'swiper/css/scrollbar';
  import 'swiper/css/free-mode';
  import emblaCarouselSvelte from 'embla-carousel-svelte'
	import { FreeMode, Mousewheel, Navigation, Pagination } from 'swiper/modules';
	import PollCard from './PollCard.svelte';
	import type { Poll } from '$lib/types';

  export let allPolls: Poll[];
  export let error;

  let options = { loop: false }
  let plugins:any[] = []

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

  });

</script>

{#if $user}
  <div class="flex flex-col items-center">
    <h1 class="font-bold text-3xl mb-2 mt-10">My Polls</h1>
  </div>
  <div class="embla" use:emblaCarouselSvelte="{{ options, plugins }}">
    <div class="embla__container">
      {#each allPolls as poll, i}
        <div class="embla__slide">
          <PollCard poll={poll} error={error}/>
        </div>
      {/each}
    </div>
  </div>
{:else}
  <p>Please sign in</p>
{/if}


<style>
  .embla {
    overflow: hidden;
  }
  .embla__container {
    display: flex;
  }
  .embla__slide {
    flex: 0 0 100%;
    min-width: 0;
  }
</style>
