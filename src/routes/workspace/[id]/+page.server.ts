import { prisma } from '$lib/server/db';
import { redirect } from '@sveltejs/kit';

export const load = async ({ params }) => {
	return {
		workspace: await prisma.workspace.findUnique({
			where: {
				id: params.id
			},
			include: { users: true }
		})
	};
};

export const actions: Actions = {
	kick: async ({ request, params }) => {
		const formData = await request.formData();
		const userId = formData.get('user');

		const userToKick = await prisma.user.findUnique({
			where: {
				id: userId
			}
		});

		const workspace = await prisma.workspace.findUnique({
			where: {
				id: params.id
			},
			include: { users: true }
		});

		const newUsersArray = workspace.users.filter((user) => {
			return user.id !== userToKick.id;
		});

		if (workspace && userToKick) {
			await prisma.workspace.update({
				where: {
					id: params.id
				},
				data: {
					users: { set: newUsersArray }
				}
			});
		}
	},
	deleteWorkspace: async ({ params }) => {
		await prisma.workspace.delete({
			where: {
				id: params.id
			}
		});
		redirect(303, '/');
	}
};
