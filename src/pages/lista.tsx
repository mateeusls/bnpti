/**
 * Lista
 *
 * [x] Primeiramente vá até /src/pages/api/users/index.ts e implemente a API
 * [x] Obter a lista de usuários da API
 * [x] Renderizar a lista de usuários
 */

import { useEffect, useState } from 'react';

import { IUser } from '@/types/user';
import { DataTable } from '@/components/user-list/data-table';
import { columns } from '@/components/user-list/columns';

export default function Lista() {
	const [users, setUsers] = useState<Array<IUser>>([]);

	async function getUsersList() {
		await new Promise((resolve) => setTimeout(resolve, 100));

		try {
			const response = await fetch('/api/users');
			const data = await response.json();

			if (!response.ok) throw new Error('Erro ao obter os dados');

			setUsers(data);
		} catch (error) {
			console.error(error);
		}
	}

	useEffect(() => {
		getUsersList();
	}, []);

	return (
		<div className="flex justify-center items-center h-screen">
			<div className="bg-gray-400 rounded p-5 max-w-[1024px] w-full h-[930px]">
				<h2 className='xl font-bold'>Lista de usuários</h2>

				<div>
					<DataTable columns={columns} data={users}/>
					{/* {users.map((user) => {
						return (
							<div data-list-item key={user.id}>
								ID {user.id} - Usuário {user.name} ({user.email})
							</div>
						);
					})} */}
					{/* <div data-list-item>ID 323 - Usuário 323 (user-323@mail.com)</div> */}
				</div>
			</div>
		</div>
	);
}
