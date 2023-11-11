import Link from 'next/link';
import Script from 'next/script';
import Head from 'next/head';
import Layout from '../../components/layout';

import path from 'path';
import { getDB } from '../../lib/db';
import { useEffect, useState } from 'react';

export async function getServerSideProps(context) {
  const db = getDB();
  let postList = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM posts WHERE thread_id=1', (err, rows) => {
        resolve(rows);
    })
  });

  console.log("Generated initialEntryList");

  return {
    props: {
      initialEntryList: postList || []
    },
  };
}

export default function FirstPost({ initialEntryList }) {
  const [entryList, setEntryList] = useState(initialEntryList);
  console.log("entryList set to initialEntryList");
  const [testState, setTestState] = useState(0);

  useEffect(() => {
    const eventSource = new EventSource('/api/sse?thread_id=1');
    eventSource.onmessage = (event) => {
      console.log(event);
      console.log(entryList);
      setEntryList((currentEntryList) => [...currentEntryList, JSON.parse(event.data)]);
      setTestState((currentValue) => currentValue + 1);
    };
    return () => {
      eventSource.close();
    }
  }, []);

  return (
    <Layout>
      <Head>
        <title>First Post</title>
      </Head>
      <Script
        src="https://connect.facebook.net/en_US/sdk.js"
        strategy="lazyOnload"
        onLoad={() =>
          console.log(`script loaded correctly, window.FB has been populated`)
        }
      />
      <h1>First Post</h1>
      <p>{testState}</p>
      <ul>
        {entryList.map((item) => (
          <li key={item.id}>
            Cat: {item.text}
          </li>
        ))}
      </ul>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  );
}

