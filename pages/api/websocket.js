// pages/api/websocket.js

import { Server } from 'ws';

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const wss = new Server({ noServer: true });

    wss.on('connection', (socket) => {
      console.log('WebSocket connection established');

      const interval = setInterval(() => {
        socket.send(`Server says: ${new Date().toLocaleTimeString()}`);
      }, 1000);

      socket.on('close', () => {
        console.log('WebSocket connection closed');
        clearInterval(interval);
      });

      // Close the WebSocket connection after 10 seconds (for testing purposes)
      setTimeout(() => {
        socket.close();
      }, 10000);
    });

    wss.handleUpgrade(req, req.socket, Buffer.alloc(0), (client) => {
      wss.emit('connection', client, req);
    });
  } else {
    res.status(405).end();
  }
}
