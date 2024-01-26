import { useEffect } from 'react';
import styles from './style.module.css';
import { X } from 'lucide-react';
import { Button } from '../ui/button';

type ModalProps = {
	children: React.ReactNode;
	title: string;
	isOpen: boolean;
	onClose?: (type: 'click' | 'esc', target: EventTarget) => void;
	onConfirm?: () => void;
	footer?: {
		hidden?: boolean;
		confirmText?: string;
		cancelText?: string;
	};
};

/* 
	Modal

	[x] Ao clicar no wrapper do modal, o modal deve ser fechado, 
		porém esta ação deve ser ignorada caso o usuário clique em qualquer elemento dentro do modal
*/

export const Modal: React.FC<ModalProps> = ({ children, title, isOpen, ...props }) => {
	
	function handleCloseClick(e: React.MouseEvent) {
		if (e.target === e.currentTarget) props.onClose?.('click', e.target);
	}

	function handleConfirmClick(e: React.MouseEvent) {
		props.onConfirm?.()
	}

	function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
		if (e.key === 'Escape') props.onClose?.('esc', e.target);
	}

	if (!isOpen) return null;

	return ( 
		<div data-modal-wrapper className={styles.wrapper} onClick={handleCloseClick} onKeyDown={handleKeyDown}>
			<div data-modal-container>
				<header data-modal-header>
					<h2 className='font-bold text-xl'>{title}</h2>

					<Button variant="ghost" className='text-xl' onClick={handleCloseClick}>
						X
					</Button>
				</header>

				{children}

				{props.footer && (
					<div data-modal-footer>
						<Button variant="secondary" onClick={handleCloseClick}>
							{props.footer?.cancelText ?? 'Cancelar'}
						</Button>

						<Button variant="success" onClick={handleConfirmClick}>
							{props.footer?.confirmText ?? 'Confirmar'}
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};
