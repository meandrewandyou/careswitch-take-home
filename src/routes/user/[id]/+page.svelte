<script lang="ts">
	import UserForm from './UserForm.svelte';

	let { data } = $props();
</script>

<h1>Hello there {data.user.name}! Update your profile:</h1>
<UserForm data={data.form} />
