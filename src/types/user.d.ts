import { UUID } from "crypto";
import { z } from "zod";

export const createUserSchema = z.object({
	name: z.string({
		required_error: 'Nome é obrigatório'
	}),
	email: z.string({
		required_error: 'Email é obrigatório'
	}).email()
});

export interface IUser {
	id: string;
	name: string;
	email: string;
}

type IUserCreate = z.infer<typeof createUserSchema>