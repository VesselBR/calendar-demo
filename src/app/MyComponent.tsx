import { useContext } from "react";
import { WebSocketContext } from "./WebsocketProvider";
import { ReadyState } from "react-use-websocket";

// Consumindo o contexto em um componente filho
export default function MyComponent()  {
  const { sendMessage, readyState } = useContext(WebSocketContext);

  const handleSendMessage = () => {
    sendMessage('Hello from MyComponent!');
  };
  const connectionStatus = {
    [ReadyState.CONNECTING]: 'Connecting',
    [ReadyState.OPEN]: 'Open',
    [ReadyState.CLOSING]: 'Closing',
    [ReadyState.CLOSED]: 'Closed',
    [ReadyState.UNINSTANTIATED]: 'Uninstantiated',
  }[readyState];

  return (
    <>
    <div>
      <button onClick={handleSendMessage}>Enviar Mensagem</button>
      <p>Status: {connectionStatus}</p>
    </div>
    </>
  );
};