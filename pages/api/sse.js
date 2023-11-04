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
    }, 1000);

    req.on('error', (e) => {
        console.error("SSE error", e);
    })
  
    // Handle client disconnect
    const closeHandle = () => {
      console.log("Closing SSE api");
      clearInterval(interval);
      res.end();
    };

    req.on('close', closeHandle);
    req.on('abort', closeHandle);
};
