import Link from 'next/link';
import Head from 'next/head';
import { useEffect, useState } from 'react';

export default function CreateThread() {
  const [threadParams, setThreadParams] = useState({ 'name': "enter thread name here", });

  const createButtonHandler = () => {
    // send thread name to API
    fetch(`/api/create-thread?name=${threadParams.name}`);
  }

  return (
    <>
      <Head>
        <title>Create Thread</title>
      </Head>
      <input type="text" onChange={(ev) => setThreadParams({...threadParams, "name": ev.target.value })} value={threadParams.name}></input>
      <button onClick={createButtonHandler}>Create</button>
    </>
  );
}
