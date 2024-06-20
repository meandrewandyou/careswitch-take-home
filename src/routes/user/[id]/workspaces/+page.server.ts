import { prisma } from '$lib/server/db.js';
import type { Actions } from './$types.js';

export const actions: Actions = {
	join: async ({ request, params }) => {
		const formData = await request.formData();
		const workspaceId = formData.get('workspace');

		const workspace = await prisma.workspace.findUnique({
			where: {
				id: workspaceId
			}
		});

		const user = await prisma.user.findUnique({
			where: {
				id: params.id
			},
			include: { workspaces: true }
		});

		if (workspace && user) {
			await prisma.user.update({
				where: {
					id: params.id
				},
				data: {
					workspaces: { set: [...user.workspaces, workspace] }
				}
			});
		}
	},
	leave: async ({ request, params }) => {
		const formData = await request.formData();
		const workspaceId = formData.get('workspace');

		const workspace = await prisma.workspace.findUnique({
			where: {
				id: workspaceId
			}
		});

		const user = await prisma.user.findUnique({
			where: {
				id: params.id
			},
			include: { workspaces: true }
		});

		const newWorkspacesArray = user?.workspaces.filter((workspace) => {
			return workspace.id !== workspaceId;
		});

		if (workspace && user) {
			await prisma.user.update({
				where: {
					id: params.id
				},
				data: {
					workspaces: { set: newWorkspacesArray }
				}
			});
		}
	}
};
