import { IToastMessage } from '@/types/toast-message.d';

import styles from './style.module.css';
import { useState } from 'react';
import { useMessage } from '@/context/message';

type ToastMessageProps = {
	content: IToastMessage;
};

export const ToastMessage: React.FC<ToastMessageProps> = ({ content: data }) => {
	const { 
		isOpen,
		handleCloseButtonClick
	} = useMessage()

	return (
		<div className={styles.container} data-toast-type={data.type} data-toast-id={data.id} data-isOpen={isOpen}>
			<span data-content>{data.message}</span>

			<button data-close onClick={handleCloseButtonClick}>
				╳
			</button>
		</div>
	);
};
