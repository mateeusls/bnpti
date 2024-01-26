/**
 * Modal
 *
 * [x] O modal fecha ao clicar em qualquer elemento, resolva o problema
 */

import { useState } from 'react';

import styles from '@/styles/modal.module.css';
import { Modal } from '@/components/Modal';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Home() {
	const [modalIsOpen, setModalIsOpen] = useState(false);

	function handleModalConfirm() {
		setModalIsOpen(false);
		alert('confirmado');
	}

	function handleModalClose() {
		setModalIsOpen(false);
	}

	function renderModalContent() {
		return (
			<div data-modal-content className={styles['modal-form']}>
				<form onSubmit={() => false}>
					<div>
						<Label htmlFor="input-name">Nome</Label>
						<Input type="text" id="input-name" placeholder="Insira um nome" />
					</div>

					<div>
						<Label htmlFor="input-name">E-mail</Label>
						<Input type="email" id="input-name" placeholder="Insira um e-mail válido" />
					</div>
				</form>
			</div>
		);
	}

	return (
		<>
			<main className={styles.container}>
				<Button type="button" onClick={() => setModalIsOpen(true)} className='bg-gray-800'>
					Abrir modal
				</Button>
			</main>

			{/* modal */}
			<Modal
				isOpen={modalIsOpen}
				title="Criar novo usuário"
				onClose={handleModalClose}
				onConfirm={handleModalConfirm}
				footer={{ confirmText: 'Criar usuário' }}
			>
				{renderModalContent()}
			</Modal>
		</>
	);
}
