import Link from 'next/link';
import Script from 'next/script';
import Head from 'next/head';
import Layout from '../../components/layout';

import path from 'path';
import { getDB } from '../../lib/db';
import { useEffect } from 'react';

const pseudoDBDirectory = path.join(process.cwd(), 'pseudo_db');

export async function getServerSideProps(context) {
  // Get file names under /pseudo_db
  /* const fileNames = fs.readdirSync(pseudoDBDirectory);
  console.log(fileNames);
  return {
    props: {
      entryList: fileNames
    },
  }; */

  const db = getDB();
  let postList = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM posts', (err, rows) => {
        resolve(rows);
    })
  });

  return {
    props: {
      entryList: postList
    },
  };
}

export default function FirstPost({ entryList }) {
  useEffect(() => {
    console.log("loaded");
    const eventSource = new EventSource('/api/sse');
    eventSource.onmessage = (event) => {
      console.log(event);
    };
    console.log("unload");
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
      <ul>
        {entryList.map((item) => (
          <li key={item.id}>
            File: {item.text}
          </li>
        ))}
      </ul>
      <h2>
        <Link href="/">Back to home</Link>
      </h2>
    </Layout>
  );
}

