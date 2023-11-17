import Link from 'next/link';
import Head from 'next/head';
import { getDB } from '../lib/db';
import { useEffect, useState } from 'react';
// import useSWR from 'swr';

export async function getServerSideProps(context) {
  const db = getDB();
  let threadList = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM threads', (err, rows) => {
        resolve(rows);
    })
  });

  return {
    props: {
      entryList: threadList || []
    },
  };
}

export default function ThreadsOverview({ entryList }) {
  // useSWR works only in normal pages that are not used by _app.js
  
  // const { data: user, mutate: mutateUser } = useSWR('/api/user');
  // console.log(user);
  return (
    <>
      <Head>
        <title>Threads</title>
      </Head>
      <Link href="/create-thread">Start a new thread</Link>
      <ul>
        {entryList.map((item) => (
          <li key={item.id}>
            <Link href={`/thread?id=${item.id}`}>{item.thread_name}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}
