import { useEffect } from 'react';

const WebSocketExample = () => {
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:3000/api/websocket/'); // Replace with your server URL

    socket.onopen = () => {
      console.log('WebSocket connection opened');
    };

    socket.onmessage = (event) => {
      console.log(`Received: ${event.data}`);
    };

    socket.onclose = () => {
      console.log('WebSocket connection closed');
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div>
      <p>Hello, Websocket!</p>
    </div>
  );
};

export default WebSocketExample;
