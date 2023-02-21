<div class="flex h-screen flex-col items-center justify-center bg-gray-200">
	<h1>Welcome to SvelteKit</h1>
	<p>Visit <a href="https://kit.svelte.dev">kit.svelte.dev</a> to read the documentation</p>
</div>

<script lang="ts">
	import { goto } from "$app/navigation";


	goto("/login");
</script>
