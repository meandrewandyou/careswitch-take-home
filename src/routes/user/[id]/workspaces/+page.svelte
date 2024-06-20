<script lang="ts">
	let { data } = $props();
	import { enhance } from '$app/forms';
</script>

<h2>Avaliable workspaces:</h2>
<ul>
	{#each data.workspaces as workspace (workspace.id)}
		{@const memberOf = data.user.workspaces.find(
			(usersWorkspace) => usersWorkspace.id === workspace.id
		)}
		<li>
			<div class="flex flex-row gap-3">
				<p>{workspace.name}</p>
				<form method="POST" use:enhance action="?/{memberOf ? 'leave' : 'join'}">
					<button
						class="text-{memberOf ? 'red' : 'green'}-600"
						name="workspace"
						value={workspace.id}
						type="submit"
					>
						{memberOf ? 'Leave' : 'Join'}
					</button>
				</form>
			</div>
		</li>
	{/each}
</ul>
