<script lang="ts">
	import { signIn, signOut } from '$lib/auth';
	import { fetchUser, user } from '$lib/users';
  import { onMount } from 'svelte';

  let loggedIn: boolean | null = null

  onMount(() => {
    fetchUser()
    if ($user) {
      loggedIn = true
    } else {
      loggedIn = false
    }

    console.log(loggedIn)
  })

  let isOpen = false;

  function toggleMenu() {
    isOpen = !isOpen;
  }
  
  function closeMenu() {
    isOpen = false;
  }

  const handleAuth = () => {
    loggedIn ? signOut() : window.location.assign('/login')
  }
</script>

<style>

</style>

<nav class="flex items-center justify-between p-6 lg:px-8 h-nav-height bg-navBackground" aria-label="Global">
  <div class="flex lg:flex-1">
    <a href="#" class="-m-1.5 p-1.5 w-20 h-20">
      <span class="sr-only">SupaPolls</span>
      <img class="w-full h-full" src="/supa_polls_logo_cleaned.png" alt="">
    </a>
  </div>
  <div class="flex lg:hidden">
    <button type="button" class="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700" on:click={toggleMenu}>
      <span class="sr-only">Open main menu</span>
      <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
      </svg>
    </button>
  </div>
  <div class="hidden lg:flex lg:gap-x-12">
    <a href="/polls/new" class="text-sm font-semibold leading-6 text-gray-900">Create</a>
    <a href="/polls" class="text-sm font-semibold leading-6 text-gray-900">Browse</a>
    <a href="#" class="text-sm font-semibold leading-6 text-gray-900">About</a>
  </div>
  <div class="hidden lg:flex lg:flex-1 lg:justify-end">
    <a on:click={handleAuth} href='' class="text-sm font-semibold leading-6 text-gray-900">{!loggedIn ? 'Log in' : 'Log out'} <span aria-hidden="true">&rarr;</span></a>
  </div>
</nav>

<div class={isOpen ? "lg:hidden fixed inset-0 z-50" : "lg:hidden fixed inset-0 z-50 hidden"} role="dialog" aria-modal="true">
  <!-- Background backdrop, show/hide based on slide-over state. -->
  <div class="fixed inset-0 z-50 bg-black opacity-50" on:click={closeMenu}></div>
  <div class="pt-[11px] fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
    <div class="flex items-center justify-between">
      <a href="#" class="-m-1.5 p-1.5">
        <span class="sr-only">SupaPolls</span>
        <img class="h-[68px] w-[68px]" src="/supa_polls_logo_cleaned.png" alt="">
      </a>
      <button type="button" class="-m-2.5 rounded-md p-2.5 text-gray-700" on:click={closeMenu}>
        <span class="sr-only">Close menu</span>
        <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div class="mt-6 flow-root">
      <div class="-my-6 divide-y divide-gray-500/10">
        <div class="space-y-2 py-6">
          <a href="/polls/new" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" on:click={closeMenu}>Create</a>
          <a href="/polls" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" on:click={closeMenu}>Browse</a>
          <a href="#" class="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" on:click={closeMenu}>About</a>
        </div>
        <div class="py-6">
          <a on:click={handleAuth} href="" class="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50" on:click={closeMenu}>{!loggedIn ? 'Log in' : 'Log out'}</a>
        </div>
      </div>
    </div>
  </div>
</div>
