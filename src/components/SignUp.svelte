<script lang="ts">
  import { signUp } from '$lib/auth';
  let email: string = '';
  let password: string = '';

  async function handleSubmit() {
    await signUp(email, password);
  }
</script>

<form on:submit|preventDefault={handleSubmit}>
  <input type="email" bind:value={email} placeholder="Email" />
  <input type="password" bind:value={password} placeholder="Password" />
  <button type="submit">Sign Up</button>
</form>
