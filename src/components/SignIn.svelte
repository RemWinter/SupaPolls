<!-- src/components/SignInForm.svelte -->
<script lang="ts">
  import { signIn } from '$lib/auth';
  let email: string = '';
  let password: string = '';

  async function handleSubmit() {
    await signIn(email, password);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button type="submit">Sign In</button>
</form>
