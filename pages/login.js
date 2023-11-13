import React, { useState } from "react";
import useUser from "../lib/useUser";
import LoginLayout from "../components/LoginLayout";
import Form from "../components/Form";
import fetchJson, { FetchError } from "../lib/fetchJson";

const crypto = require('crypto');
const sha256h = crypto.createHash('sha256').update("Hello, world!").digest('hex');
console.log(sha256h);

const SALT = process.env.SALT;

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { mutateUser } = useUser({
    redirectTo: "/profile-sg",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");

  return (
    <LoginLayout>
      <div className="login">
        <Form
          errorMessage={errorMsg}
          onSubmit={async function handleSubmit(event) {
            event.preventDefault();

            const body = {
              username: event.currentTarget.username.value,
              password: event.currentTarget.password.value
            };

            try {
              setErrorMsg("");
              mutateUser(
                await fetchJson("/api/login", {
                  method: "POST",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify(body),
                }),
                false,
              );
            } catch (error) {
              console.log("eeror", error.data);
              if (error instanceof FetchError) {
                setErrorMsg(error.data.reason);
              } else {
                console.error("An unexpected error happened:", error);
              }
            }
          }}
        />
      </div>
      <style jsx>{`
        .login {
          max-width: 21rem;
          margin: 0 auto;
          padding: 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
      `}</style>
    </LoginLayout>
  );
}
