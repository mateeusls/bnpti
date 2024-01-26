/**
 * @api {get} /api/users Read list
 *
 * Resolva o exercício aqui:
 *
 * [x] Crie uma API que retorne uma lista de usuários
 * [x] A request deve receber apenas o método GET
 * [x] A lista deve conter pelo menos 2 usuários
 * [x] Cada usuário deve ter um id, nome e email
 * [x] Utilize a interface IUser para tipar os dados
 */

import { NextApiRequest, NextApiResponse } from 'next/types';

import users from '../../../../users.json'

export default (req: NextApiRequest, res: NextApiResponse) => {
	const {method} = req

	if(method !== 'GET') {
		return res.status(405).json({message: 'Method not allowed'})
	}

	return res.status(200).json(users);
};
