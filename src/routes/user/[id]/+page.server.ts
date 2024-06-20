import type { PageServerLoad, Actions } from './$types.js';
import { prisma } from '$lib/server/db';
import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms';
import { formSchema } from './schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load: PageServerLoad = async () => {
	return {
		form: await superValidate(zod(formSchema))
	};
};

export const actions: Actions = {
	updateProfile: async ({ request, params }) => {
		const form = await superValidate(request, zod(formSchema));
		if (!form.valid) {
			return fail(400, {
				form
			});
		}

		await prisma.user.update({
			where: {
				id: params.id
			},
			data: {
				name: form.data.name
			}
		});
	},
	deleteProfile: async ({ params }) => {
		await prisma.user.delete({
			where: {
				id: params.id
			}
		});
		redirect(303, '/');
	}
};
