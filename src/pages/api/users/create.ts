/**
 * @api {get} /api/users/create Create User
 *
 * Resolva o exercício aqui:
 *
 * [x] Crie uma API que registre um usuário no array users
 * [x] A request deve receber apenas o método POST
 * [x] A request deve receber um body com os dados do usuário
 * [x] O body vai seguir a interface IUserCreate, removendo o id
 * [x] Você deve corrigir a interface IUserCreate em src/types/user.d.ts
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import { IUser, createUserSchema } from '@/types/user.d';
import fs from 'node:fs/promises';
import { randomUUID } from 'node:crypto';

import users from '../../../../users.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
	
	const {method} = req

	if(method !== 'POST') {
		return res.status(405).json({message: 'Method not allowed'})
	}

	const response = createUserSchema.safeParse(req.body);

	if (!response.success) {
		const { errors } = response.error;
	
		return res.status(400).json({
			error: { message: "Invalid request", errors },
		});
	}

	const { name, email } = response.data;

	const userAlreadyExists = users.some(user => user.email === email)

	if(userAlreadyExists) {
		return res.status(409).json({message: 'Usuário já existe'})
	}

	const user: IUser = {
		id: randomUUID(),
		name,
		email
	}

	fs.writeFile('users.json', JSON.stringify([...users, user], null, 2));

	return res.status(201).json({user});
};
