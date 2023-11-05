export const dynamic = 'force-dynamic';

console.log("SSE file run");

export default (req, res) => {
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Content-Encoding', 'none');
  res.setHeader('Connection', 'keep-alive');

  // Send an initial message to the client
  res.write('data: Welcome to SSE\n\n');

  // Simulate sending updates at intervals (you can replace this with your own logic)
  const interval = setInterval(() => {
    const message = `data: ${new Date().toLocaleTimeString()}\n\n`;
    res.write(message);
    console.log("Sending", message);
    console.log("res status:", res.writableEnded, res.writableFinished, res.destroyed);
  }, 1000);

  req.on('error', (e) => {
      console.error("SSE error", e);
  })

  // Handle client disconnect
  const closeHandle = () => {
    console.log("Closing SSE api by event handler");
    clearInterval(interval);
    res.end();
  };

  res.on('close', closeHandle);
  res.on('abort', closeHandle);
  
};
