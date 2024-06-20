import { prisma } from '$lib/server/db';
import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ params }) => {
	return {
		user: await prisma.user.findUnique({ where: { id: params.id }, include: { workspaces: true } }),
		workspaces: await prisma.workspace.findMany({
			include: {
				users: true
			}
		})
	};
};
