import React, { useState } from "react";
import useUser from "../lib/useUser";
import LoginLayout from "../components/LoginLayout";
import Form from "../components/Form";
import fetchJson, { FetchError } from "../lib/fetchJson";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  // here we just check if user is already logged in and redirect to profile
  const { user, mutateUser } = useUser({
    redirectTo: "/profile",
    redirectIfFound: true,
  });

  const [errorMsg, setErrorMsg] = useState("");
  const router = useRouter();

  if (user?.user?.id) {
    router.push("/threads-overview");
  }

  return (
    <LoginLayout>
      <div className="login">
        <Form
          errorMessage={errorMsg}
          onSubmit={async function handleSubmit(username, password) {
            event.preventDefault();
            console.log("event", event);

            const body = {
              username: username,
              password: password,
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
              router.reload();
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
      <div style={{ textAlign: "center" }}>
        <Link href="/signup">Sign up</Link>
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
