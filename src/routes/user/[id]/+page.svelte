<script lang="ts">
	import { enhance } from '$app/forms';
	import { page } from '$app/stores';
	import Button from '$lib/components/ui/button/button.svelte';
	import UserForm from './UserForm.svelte';

	let { data } = $props();

	const url = $page.url;
</script>

<div class="flex flex-col gap-3">
	<h1>Hello there {data.user.name}! Update your profile:</h1>
	<UserForm data={data.form} />
	<a href={`${url}/workspaces`} class="text-green-400 underline">Check my workspaces</a>
	<form method="POST" use:enhance action="?/deleteProfile">
		<Button type="submit" class="w-max bg-red-500 text-white hover:bg-red-600">
			Terminate self
		</Button>
	</form>
</div>
