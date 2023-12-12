import Link from 'next/link';
import Head from 'next/head';
import RoundedButton from "../components/RoundedButton";
import StringInput from "../components/StringInput";
import { useEffect, useState } from 'react';
import { useRouter } from "next/router";

export default function CreateThread() {
  const [threadParams, setThreadParams] = useState({ 'name': "", });
  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  async function createButtonHandler(ev) {
    ev.preventDefault();
    // send thread name to API
    const response = await fetch(`/api/create-thread?name=${threadParams.name}`, {
      method: 'POST'
    });
    const result = await response.json();
    console.log("result", result);
    if (result.success) {
      // redirect to thread page
      router.push(`/thread?id=${result.id}`);
    } else {
      // display error message
      setErrorMsg(result.reason);
    }
  }

  return (
    <>
      <Head>
        <title>Create Thread</title>
      </Head>
      <form className="createThread" onSubmit={createButtonHandler}>
        <div style={{display: 'flex', justifyContent: 'center', ...formElementStyle}}>
          <StringInput value={threadParams.name} setValue={(value) => setThreadParams({...threadParams, name: value })} placeholder="enter thread name here" name="thread_name" validatorRegex={/^[\w\d]*$/} required />
        </div>
        <div style={{display: 'flex', justifyContent: 'center', ...formElementStyle}}>
          <RoundedButton type="submit">Create</RoundedButton>
        </div>
        <div style={{display: 'flex', justifyContent: 'center', ...formElementStyle}}>
          <p className="error">{errorMsg}</p>
        </div>
      </form>
      <style jsx>{`
        .createThread {
          display: grid;
          row-gap: 20px;
          justify-content: center;
          margin-top: 40px;
          height: 100%;
        }
        .error {
          color: red;
        }
      `}</style>
    </>
  );
}

const formStyle = {
  "margin-top": "32px",
}

const formElementStyle = {
  "margin-top": "10px",
}