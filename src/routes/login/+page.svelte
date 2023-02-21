<script lang="ts">
  export let name = '';
</script>

<div class="min-h-screen grid place-content-center">
  <div class="card p-4">
    <h2>Log in</h2>

   <div class="space-y-2">
    <label class="label">
      <span>Email</span>
      <input type="email" class="input rounded-md">
    </label>
   
    <label class="label">
      <span>Password</span>
      <input type="password" class="input rounded-md">
    </label>

    <button class="btn variant-filled-primary">Login</button>
   </div>
  </div>
</div>

<style>

</style>
