/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { createContext, ReactNode, useContext, useState } from 'react';
import useWebSocket, { ReadyState } from 'react-use-websocket';

interface IWebsocketProviderProps {
  children: ReactNode;
}

// Criando o contexto
export const WebSocketContext = createContext<{
  sendMessage: (message: string) => void;
  readyState: ReadyState;
}>({
  sendMessage: () => {},
  readyState: ReadyState.CLOSED,
});

// Criando o componente provedor
export const WebsocketProvider = ({ children }: IWebsocketProviderProps) => {
  const [message, setMessage] = useState('');

  const socketUrl = 'wss://echo.websocket.org'
  const { sendMessage, lastMessage, readyState } = useWebSocket(socketUrl);

  return (
    <WebSocketContext.Provider value={{ sendMessage, readyState }}>
      {children}
    </WebSocketContext.Provider>
  );
};
