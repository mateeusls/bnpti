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

import { TextError } from '@/components/text-error';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

import { zodResolver } from '@hookform/resolvers/zod'
import { Loader } from 'lucide-react';
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
			formState: {errors, isSubmitting} 
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

	async function onSubmit(data: MainFormData) {
		await new Promise((resolve) => setTimeout(resolve, 1000));

		setOutput(JSON.stringify(data, null, 2))
		createUser(data);
	}

	return (
		<div className='flex justify-center items-center h-screen'>
			<div className='bg-gray-400 rounded p-1.5 w-[450px]'>
				<form 
					className='flex flex-col gap-y-4 p-4'
					onSubmit={handleSubmit(onSubmit)}
				>
					<div>
						<Input type="text" placeholder="Name" {...register("name")}/>
						{errors.name && 
							<TextError>{errors.name.message}</TextError>
						}
					</div>

					<div>
						<Input type="email" placeholder="E-mail" {...register("email")}/>
						{errors.email && 
							<TextError>{errors.email.message}</TextError>
						}
					</div>

					<Button type="submit" variant="success" disabled={isSubmitting}>
						{isSubmitting ? 
							<Loader 
								size={24} 
								className='animate-spin'
							/>
						 : 
							<p>Enviar</p>
						}
					</Button>
				</form>

				<div className='px-4 py-2'>
					{output && (
						<pre>{output}</pre>
					)}
				</div>
			</div>
		</div>
	);
}
