import { useEffect } from 'react';
import Link from 'next/link';

const MySSEComponent = () => {
  useEffect(() => {
    console.log("TestSSe useEffect called");
    const eventSource = new EventSource('/api/sse');

    eventSource.onmessage = (event) => {
      // Handle incoming SSE updates here
      console.log(event);
    };

    eventSource.onerror = (err) => {
        console.log("Error", err);
    }

    return () => {
      console.log("eventSource closed");
      eventSource.close();
      console.log("evSource status", eventSource.readyState);
    };
  }, []);

  return (
    <div>
      <p>Test component</p>
      <Link href="/">Back to home</Link>
    </div>
  );
};

export default MySSEComponent;
