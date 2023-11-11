import { getDBEventEmitter } from "../../lib/db";

export const dynamic = 'force-dynamic';

export default (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Encoding', 'none');
  res.setHeader('Connection', 'keep-alive');

  // Simulate sending updates at intervals (you can replace this with your own logic)
  /* const interval = setInterval(() => {
    const message = `data: ${new Date().toLocaleTimeString()}\n\n`;
    res.write(message);
  }, 1000); */

  const eventName = `post_${req.query.thread_id}`;
  console.log("subscribe to", eventName);

  const newPostHandler = ({ id, thread_id, author_id, text }) => {
    console.log("Sending to client,", id, thread_id, author_id, text);
    res.write(`data: ${JSON.stringify({id, thread_id, author_id, text})}\n\n`);
  };
  getDBEventEmitter().on(eventName, newPostHandler);

  req.on('error', (e) => {
    console.error("SSE error", e);
  })

  // Handle client disconnect
  const closeHandle = () => {
    // clearInterval(interval);
    getDBEventEmitter().removeListener(eventName, newPostHandler);
    res.end();
  };

  res.on('close', closeHandle);
  res.on('abort', closeHandle);
};
