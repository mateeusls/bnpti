/**
 * Formulário
 *
 * [x] Primeiramente vá até /src/pages/api/users/create.ts e implemente a API
 * [x] Deve ser implementado utilizando a lib react-hook-form
 * [x] O formulário deve ter os seguintes campos: nome, e-mail
 * [x] Os dois campos são obrigatórios e precisam de validação
 * [x] Ao dar 'submit', deve ser feito uma request para /api/users/create
 * [] Lide com os possíveis erros
 */

import styles from '@/styles/formulario.module.css';

import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const FormSchema = z.object({
  name: z.string().nonempty({ message: 'Campo é obrigatório' }),
	email: z.string().nonempty({ message: 'Campo é obrigatório' }).email({ message: 'E-mail inválido' }),
})
type MainFormData = z.infer<typeof FormSchema>


export default function Form() {
	const { 
			register,
			handleSubmit, 
			reset,
			formState: {errors} 
		} = useForm<MainFormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
			name: '',
    },
  })
	console.log(errors)

	const [output, setOutput] = useState('')

	async function createUser(data: MainFormData) {
		const { name, email } = data;
		
		try {
			const response = await fetch('/api/users/create', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({
					name,
					email,
				})
			});

			const data = await response.json();
			
			if(response.status === 409) {
				alert(data.message);
				return;
			}

			if (!response.ok) throw new Error('Erro ao cadastrar o usuário');

			alert('Usuário cadastrado com sucesso!');
			setOutput('')
			reset();
		} catch (error) {
			console.error(error);
		}
	}

	function onSubmit(data: MainFormData) {
		setOutput(JSON.stringify(data, null, 2))
		createUser(data);
	}

	return (
		<div className={styles.container}>
			<div className={styles.content}>
				<form onSubmit={handleSubmit(onSubmit)}>
					<div>
						<input type="text" placeholder="Name" {...register("name")}/>
						{errors.name && 
							<p>{errors.name.message}</p>
						}
					</div>

					<div>
						<input type="email" placeholder="E-mail" {...register("email")}/>
						{errors.email && 
							<p>{errors.email.message}</p>
						}
					</div>

					<button type="submit" data-type="confirm">
						Enviar
					</button>
				</form>

				<div className={styles.output}>
					{output && (
						<pre>{output}</pre>
					)}
				</div>
			</div>
		</div>
	);
}
