<!-- src/components/SignInForm.svelte -->
<script lang="ts">
  import { signIn } from '$lib/auth';
  let email: string = '';
  let password: string = '';

  async function handleSubmit() {
    await signIn(email, password);
  }
</script>


<div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
  <div class="sm:mx-auto sm:w-full sm:max-w-sm">
    <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Sign in to your account</h2>
  </div>

  <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
    <form on:submit|preventDefault={handleSubmit} class="space-y-6" action="#" method="POST">
      <div>
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email address</label>
        <div class="mt-2">
          <input bind:value={email} id="email" name="email" type="email" autocomplete="email" required class="block w-full px-[10px] py-[8px] rounded-md border-0 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brandBlue sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <div class="flex items-center justify-between">
          <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
          <div class="text-sm">
            <a href="#" class="font-semibold text-brandBlue hover:text-brandBlue">Forgot password?</a>
          </div>
        </div>
        <div class="mt-2">
          <input bind:value={password} id="password" name="password" type="password" autocomplete="current-password" required class="block w-full rounded-md border-0 px-[10px] py-[8px] text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-brandBlue sm:text-sm sm:leading-6">
        </div>
      </div>

      <div>
        <button type="submit" class="flex w-full justify-center rounded-md bg-brandBlue px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-brandBlue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brandBlue">Sign in</button>
      </div>
    </form>

    <p class="mt-10 text-center text-sm text-gray-500">
      Not a member?
      <a href="/signup" class="font-semibold leading-6 text-brandBlue hover:text-brandBlue">Sign Up</a>
  </div>
</div>
