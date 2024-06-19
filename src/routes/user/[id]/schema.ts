import { z } from 'zod';

export const formSchema = z.object({
	name: z.string().min(3).max(10)
});

export type FormSchema = typeof formSchema;
