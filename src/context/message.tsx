import { IToastMessage } from "@/types/toast-message";
import { ReactNode, createContext, useContext, useState } from "react";

interface MessageContextData {
  messages: Array<IToastMessage>;
  typeMessage: 'success' | 'error';
  handleSuccessButtonClick: () => void
  handleErrorButtonClick: () => void;
  isOpen: boolean;
  handleCloseButtonClick: () => void;
}

export const MessageContext = createContext({} as MessageContextData);

export function MessageProvider({ children }: { children: ReactNode }) {
  const [typeMessage, setTypeMessage] = useState<'success' | 'error'>('success')

  const [isOpen, setIsOpen] = useState(true);

	function handleCloseButtonClick() {
		setIsOpen(false);
	}

  const messages: Array<IToastMessage> = [
		{
			id: '1',
			message: 'Mensagem de sucesso',
			type: 'success',
		},
		{
			id: '2',
			message: 'Mensagem de erro',
			type: 'error',
		},
	];

  function handleSuccessButtonClick() {
    setIsOpen(true);
    setTypeMessage("success")
	}

  function handleErrorButtonClick() {
    setIsOpen(true);
    setTypeMessage('error')
	}

  return (
    <MessageContext.Provider 
      value={{ 
        messages,
        typeMessage, 
        handleSuccessButtonClick, 
        handleErrorButtonClick,
        isOpen,
        handleCloseButtonClick
      }}
    >
      {children}
    </MessageContext.Provider>
  );
}

export const useMessage = () => {
  return useContext(MessageContext);
}