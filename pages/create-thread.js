import Link from 'next/link';
import Head from 'next/head';
import RoundedButton from "../components/RoundedButton";
import StringInput from "../components/StringInput";
import { PrettyForm, PrettyFormElement } from '../components/PrettyForm';
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
      <PrettyForm onSubmit={createButtonHandler}>
        <StringInput value={threadParams.name} setValue={(value) => setThreadParams({...threadParams, name: value })} placeholder="enter thread name here" name="thread_name" validatorRegex={/^[\w\d]*$/} required />
        <RoundedButton type="submit">Create</RoundedButton>
        <p className="error">{errorMsg}</p>
      </PrettyForm>
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