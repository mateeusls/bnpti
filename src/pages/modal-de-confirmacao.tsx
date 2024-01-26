/**
 * Modal de confirmação
 *
 * [x] Crie um component para o modal de confirmação
 * [x] Utilize o código abaixo como base
 * [x] O modal deve ser aberto ao clicar no botão "Abrir modal de confirmação"
 * [x] O título deve ser "Confirmação"
 * [x] O conteúdo deve ser dinâmico
 */

import { useState } from 'react';
import Head from 'next/head';

import styles from '@/styles/modal-de-confirmacao.module.css';
import { ConfirmationModal } from '@/components/confirmation-modal';
import { Modal } from '@/components/Modal';

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);
	const [count, setCount] = useState(0);

	const isCountEqualZero = count === 0;

	function handleIncrementCount() {
		setCount(count + 1);
	}

	function renderConfirmationModalContent() {
		return (
			<div data-modal-content className={styles['modal-increment']}>
				<p>{count}</p>

				<button type="button" onClick={handleIncrementCount}>
					Incrementar
				</button>

			</div>
		);
	}

	return (
		<>
			<Head>
				<title>Confirmação</title>
			</Head>
			<main className={styles.container}>
				<button type="button" onClick={() => setModalIsOpen(true)}>
					Abrir modal de confirmação
				</button>
			</main>

			<Modal
				isOpen={modalIsOpen}
				title="Confirmação"
				onClose={() => {
					setModalIsOpen(false);
					setCount(0);
				}}
				onConfirm={() => {
					if(isCountEqualZero) return alert('Não é possível confirmar com valor 0');

					alert(`Confirmado: ${count}`);
					setModalIsOpen(false);
					setCount(0);
				}}
				footer={{
					confirmText: 'Confirmar',
					cancelText: 'Cancelar',
				}}
			>
				{renderConfirmationModalContent()}
			</Modal>
		</>
	);
}
