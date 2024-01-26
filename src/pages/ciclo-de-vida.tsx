/**
 * Ciclo de Vida
 *
 * - No evento de montagem deste component, deve ser registrados os seguintes events listeners:
 *  	[x] onCounterMount
 * 		[x] onCounterUnmount
 * 		[x] onCounterUpdate
 * [x] Os eventos devem ser disparados no componente Counter, seguindo o ciclo de vida do mesmo
 * [x] Ao atualizar o contador, deverá ser passado o valor atualizado no evento onCounterUpdate, e quando o valor
 * 		chegar a 10, o Counter deve ser desmontado.
 *
 * (Opcional)
 * [x] Ao observar os eventos, você verá que eles são disparados mais de uma vez, isso acontece porque o componente
 * 		Counter é desmontado e montado novamente, e os eventos são registrados novamente, isto é um problema comum
 * 		no nextjs, você deve resolver este problema.
 */

import { GetServerSideProps } from 'next/types';

import styles from '@/styles/ciclo-de-vida.module.css';
import { Counter } from '@/components/Counter';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';

type CicloDeVidaProps = {
	initialCount: number;
};

export default function CicloDeVida({ initialCount }: CicloDeVidaProps) {
	const [showCounter, setShowCounter] = useState(false);
	const [count, setCount] = useState(0);

	function handleOculteCounterClick() {
		setShowCounter(!showCounter);
	}

	useEffect(() => {
		const handleCounterMount = () => {
      console.log('O evento onCounterMount foi disparado!');
    };
    window.addEventListener('onCounterMount', handleCounterMount);

    const handleCounterUpdate = (event: CustomEventInit) => {
      const { count } = event.detail;
      console.log(`O evento onCounterUpdate foi disparado. Count: ${count}`);

			setCount(count);
    };
    window.addEventListener('onCounterUpdate', handleCounterUpdate);

		const handleCounterUnmount = () => {
			console.log('O evento onCounterUnmount foi disparado!');
			setShowCounter(false);
			setCount(0);
    };
    window.addEventListener('onCounterUnmount', handleCounterUnmount);

    return () => {
      window.removeEventListener('onCounterMount', handleCounterMount);
      window.removeEventListener('onCounterUpdate', handleCounterUpdate);
      window.removeEventListener('onCounterUnmount', handleCounterUnmount);
    };
	}, []);

	return (
		<div className={styles.container}>
			<div>
				<Button variant="secondary" onClick={handleOculteCounterClick}>
					{showCounter ? 'Ocultar contador' : 'Mostrar contador'}
				</Button>

				{showCounter && (
					<div className='bg-gray-400 p-5 h-96 w-96 rounded flex flex-col'>
						<h1 className='xl font-bold'>Exemplo de Ciclo de vida</h1>

						<div className='flex-1 flex justify-center items-center'>
							<Counter initialCount={initialCount} />
						</div>
					</div>
				)}
			</div>
		</div>
	);
}

export const getServerSideProps: GetServerSideProps<CicloDeVidaProps> = async () => {
	return {
		props: {
			initialCount: 0,
		},
	};
};
