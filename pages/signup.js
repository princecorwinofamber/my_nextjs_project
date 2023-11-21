import RoundedButton from "../components/RoundedButton";
import StringInput from "../components/StringInput";
import { useState } from "react";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  async function obSubmit(ev) {
    ev.preventDefault();
    if (password != repeatPassword) {
      setErrorMessage("Passwords don't match");
      return;
    }
    const body = {
      username, password, display_name: displayName
    };
    try {
      const result = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const parsedResult = await result.json();
      console.log(parsedResult);
      if (!parsedResult.success) {
        setErrorMessage(parsedResult.reason);
      } else {
        setErrorMessage("");
      }
    } catch (err) {
      setErrorMessage("Error signing up");
    }
  }

  return (
    <>
      <form className="signup">
        <StringInput value={username} setValue={setUsername} placeholder="username" name="username" validatorRegex={/^[\w\d]*$/} required />
        <StringInput value={password} setValue={setPassword} placeholder="password" name="password" validatorRegex={/^[\w\d!@#%&*-_=+]*$/} required />
        <StringInput value={repeatPassword} setValue={setRepeatPassword} placeholder="repeat password" name="repeat_password" validatorRegex={/^[\w\d!@#%&*-_=+]*$/} required />
        <StringInput value={displayName} setValue={setDisplayName} placeholder="name displayed to other users" name="display_name" validatorRegex={/^[\w ]*$/} required />
        <RoundedButton onClick={obSubmit}>Sign up</RoundedButton>
        <p className="error">{errorMessage}</p>
      </form>
      <style jsx>{`
        .signup {
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
