<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';

	let { data } = $props();
	const { workspace } = data;
</script>

<div class="flex flex-col gap-3">
	<h1>This is a <b>{workspace.name}</b> workspace</h1>
	<h2>Members of the workspace</h2>
	{#if workspace.users.length > 0}
		<ul>
			{#each workspace.users as user (user.id)}
				<li class="flex flex-row gap-2">
					<p>{user.name}</p>
					<form method="POST" use:enhance>
						<button name="user" value={user.id} class="text-red-600">Kick</button>
					</form>
				</li>
			{/each}
		</ul>
	{:else}
		<p>No active members</p>
	{/if}
	<form method="POST" use:enhance action="?/deleteWorkspace">
		<Button type="submit" class="w-max bg-red-500 text-white hover:bg-red-600">
			Delete this workspace
		</Button>
	</form>
</div>
