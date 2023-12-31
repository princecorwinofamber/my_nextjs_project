import Link from 'next/link';
import Head from 'next/head';
import ProfilePicture from '../components/ProfilePicture';
import { Profile } from '../components/Profile';
import { getDB } from '../lib/db';
import { useEffect, useState } from 'react';
import { URL } from 'node:url';
import classes from './thread.module.css';
import { useUserdata } from '../lib/useUserdata';
import RoundedButton from '../components/RoundedButton';

export async function getServerSideProps(context) {
  console.log("context", context.req.url);
  const parsedUrl = new URL(context.req.url, 'http://localhost:3000/');
  const thread_id = Number(parsedUrl.searchParams.get("id"));

  const db = getDB();
  const postList = await new Promise((resolve, reject) => {
      db.all('SELECT * FROM posts WHERE thread_id=?', [thread_id], (err, rows) => {
        resolve(rows);
    })
  });

  const threadName = await new Promise((resolve, reject) => {
    db.get('SELECT * FROM threads WHERE id=?', [thread_id], (err, row) => {
      console.log("rows", row);
      resolve(row.thread_name);
    })
  });

  return {
    props: {
      threadId: thread_id,
      initialEntryList: postList || [],
      threadName: threadName || "Error: thread name is null"
    },
  };
}

export default function ThreadPage({ initialEntryList, threadName, threadId }) {
  const [entryList, setEntryList] = useState(initialEntryList);
  const [postText, setPostText] = useState('Type here!');
  const user = useUserdata();

  useEffect(() => {
    const eventSource = new EventSource(`/api/sse?thread_id=${threadId}`);
    eventSource.onmessage = (event) => {
      setEntryList((currentEntryList) => [...currentEntryList, JSON.parse(event.data)]);
    };
    return () => {
      eventSource.close();
    }
  }, []);

  console.log("thread user", user);

  return (
    <>
      <Head>
        <title>{threadName}</title>
      </Head>
      <h2>
        <Link href="/threads-overview">Back to threads</Link>
      </h2>
      <h1>{threadName}</h1>
      <ul>
        {entryList.map((item) => (
          <li key={item.id}>
            <div className={classes.flexContainer}>
              <div className={classes.flexChild}>
                <Profile userId={item.author_id} />
              </div>
              <div className={classes.flexChild}>
                <pre style={{ padding: 10, fontSize: 16, whiteSpace: "pre-wrap", wordWrap: "break-word" }}>{item.text}</pre>
              </div>
            </div>
          </li>
        ))}
      </ul>
      {user?.user?.id ? <div>
        <textarea type="text" value={postText} onChange={(ev) => setPostText(ev.target.value)}/>
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: 8 }}>
          <RoundedButton onClick={() => fetch(`/api/post?thread_id=${threadId}`, {
            method: 'POST',
            headers: { "Content-Type": "text/plain" },
            body: postText
          })}>Send</RoundedButton>
        </div>
      </div> : <div></div>}
      <style jsx>{`
        ul {
          list-style: none;
        }
        textarea {
          width: 100%;
          height: 100px;
          font-size: 16px;
          padding: 10px;
          box-sizing: border-box;
        }
      `}</style>
    </>
  );
}
