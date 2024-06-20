<script lang="ts">
	import { enhance } from '$app/forms';
	import Button from '$lib/components/ui/button/button.svelte';
	import * as Table from '$lib/components/ui/table';

	let { data } = $props();
</script>

<div class="mx-auto mt-8 max-w-3xl px-4 sm:px-6 lg:px-8">
	<div class="space-y-6 rounded-md border p-4">
		<p>
			🍾 Short message in the bottle. This is just a CRUD demo app, with no styling. Want to mention
			that almost every lib and tool used in this project - I used for the first time. Exept Svelte
			itself. So everything that implemented is not that pretty and likely could be done better, but
			it's a matter of practice anyway. Overall - to make the interface user friendly won't be a
			problem, it just will take some extra time, and I simply don't know how much time do I have))
			If I have some - please let me know.
		</p>
		<p>
			About forms. I used Shadcn Form + Superform validation here only in one case - editing
			username. Other form actions that implemented I believe will be just fine with what Svelte
			already has. I'd like to extend the user schema and keep on experimenting with validations and
			stuff, but again, matter of time.
		</p>
		<p>
			To test the app - just add random users (or seed them), add random workspaces and just click
			around. It's rather intuitive here)
		</p>
		<h2>Users:</h2>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">ID</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Workspaces</Table.Head>
					<Table.Head>Controls</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.users as user (user.id)}
					<Table.Row>
						<Table.Cell class="font-medium">{user.id}</Table.Cell>
						<Table.Cell>{user.name}</Table.Cell>
						<Table.Cell>
							{#if user.workspaces.length > 0}
								<ul>
									{#each user.workspaces as workspace (workspace.id)}
										<li>{workspace.name}</li>
									{/each}
								</ul>
							{:else}
								<p>Not a member of a workspace</p>
							{/if}
						</Table.Cell>
						<Table.Cell>
							<a href="/user/{user.id}">Edit</a>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
		<form method="POST" use:enhance action="?/createUser">
			<Button type="submit">Add random user</Button>
		</form>

		<h2>Workspaces:</h2>
		<Table.Root>
			<Table.Header>
				<Table.Row>
					<Table.Head class="w-[100px]">ID</Table.Head>
					<Table.Head>Name</Table.Head>
					<Table.Head>Members</Table.Head>
					<Table.Head>Controls</Table.Head>
				</Table.Row>
			</Table.Header>
			<Table.Body>
				{#each data.workspaces as workspace (workspace.id)}
					<Table.Row>
						<Table.Cell class="font-medium">{workspace.id}</Table.Cell>
						<Table.Cell>{workspace.name}</Table.Cell>
						<Table.Cell>
							{#if workspace.users.length > 0}
								<ul>
									{#each workspace.users as user (user.id)}
										<li>{user.name}</li>
									{/each}
								</ul>
							{:else}
								<p>Have no members</p>
							{/if}
						</Table.Cell>
						<Table.Cell>
							<a href="/workspace/{workspace.id}">Manage</a>
						</Table.Cell>
					</Table.Row>
				{/each}
			</Table.Body>
		</Table.Root>
		<form method="POST" use:enhance action="?/createWorkspace">
			<Button type="submit">Add random workspace</Button>
		</form>
		<div>
			Your assignment is to use all the libraries and tools already set up in this project to build
			a simple user management interface. You can use the table above as a starting point, but you
			are encouraged to start from scratch, as long as you follow the requirements below:

			<ul class="mt-4 list-disc space-y-2 pl-4">
				<li>
					<span class="font-semibold">CRUD</span> - You should be able to create, read, update, and delete
					models specified in the schema below, ideally across different routes and pages designed for
					listing, viewing, and updating.
				</li>
				<li>
					<span class="font-semibold">Forms</span> - You should use Shadcn
					<a
						class="underline underline-offset-2"
						target="_blank"
						href="https://shadcn-svelte.com/docs/components/form">Form</a
					>
					components alongside
					<a class="underline underline-offset-2" target="_blank" href="https://superforms.rocks/"
						>Superforms</a
					> to implement your forms and validation. You are generally encouraged to use as many Shadcn
					components as you see fit to build out the interface.
				</li>
				<li>
					<span class="font-semibold">Schema</span> - You are expected to modify the Prisma schema
					and add your own migrations to support the following domain models (you can use the
					<code class="text-sm">`npm run migrate`</code> command to apply your changes):
					<ul class="mt-2 list-disc space-y-2 pl-4">
						<li>
							<span class="font-medium">User</span> - Represents users in the system. A simple starting
							schema is provided for you, but you should expand it as needed.
						</li>
						<li>
							<span class="font-medium">Workspace</span> - Represents a workspace that groups users together.
							A user can belong to multiple workspaces. This is a lot like Slack.
						</li>
					</ul>
				</li>
				<li>
					<span class="font-semibold">Styling</span> - You should use a combination of Shadcn and Tailwind
					CSS to style your components. Put some thought into the design, layout, and navigation of your
					pages.
				</li>
			</ul>
		</div>
	</div>
</div>
