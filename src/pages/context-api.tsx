/**
 * Context Api
 *
 * [x] Criar um contexto para exibir mensagens de sucesso e erro
 * [x] Criar um componente para exibir as mensagens
 * [x] Criar um hook para disparar e consumir as mensagens
 * [x] Disparar as mensagens a partir dos botões abaixo
 */

import styles from '@/styles/context-api.module.css';
import { ToastMessage } from '@/components/ToastMessage';
import { useMessage } from '@/context/message';

export default function ContextApi() {
	const { 
		messages,
		handleErrorButtonClick, 
		handleSuccessButtonClick,
		typeMessage,
	} = useMessage()

	function renderToastMessage() {
		const message = messages.find((message) => message.type === typeMessage);

		if (typeMessage) {
			return (
				<ToastMessage
					content={{
						id: message?.id || '',
						message: message?.message || '',
						type: message?.type || 'success',
						duration: 100,
					}}
				/>
			);
		}
		return null;
	}

	return (
		<>
			<div className={styles.container}>
				<button type="button" onClick={handleSuccessButtonClick}>
					Disparar mensagem de sucesso
				</button>
				<button type="button" onClick={handleErrorButtonClick}>
					Disparar mensagem de erro
				</button>
			</div>

			<div className={styles['toast-container']}>
				{renderToastMessage()}
			</div>
		</>
	);
}