import { prisma } from '$lib/server/db';

export const load = async () => {
	return {
		users: await prisma.user.findMany({
			include: {
				workspaces: true
			}
		}),
		workspaces: await prisma.workspace.findMany({
			include: {
				users: true
			}
		})
	};
};

export const actions = {
	createWorkspace: async () => {
		await prisma.workspace.create({
			data: {
				name: `WS-${Math.floor(Math.random() * 9999)}`
			}
		});
	},
	createUser: async () => {
		await prisma.user.create({
			data: {
				name: `Subject-${Math.floor(Math.random() * 9999)}`
			}
		});
	}
};
