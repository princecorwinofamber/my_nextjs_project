import StringInput from "./StringInput";
import RoundedButton from "./RoundedButton";
import { useState } from "react";

export default function Form({ errorMessage, onSubmit }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  return (
    <form onSubmit={() => onSubmit(username, password)}>
      <label>
        <span>Enter your username</span>
        <StringInput value={username} setValue={setUsername} placeholder="username" type="text" name="username" required />
      </label>

      <label>
        <span>Enter your password</span>
        <StringInput value={password} setValue={setPassword} placeholder="password" type="text" name="password" required />
      </label>

      <RoundedButton onClick={() => onSubmit(username, password)}>Login</RoundedButton>

      {errorMessage && <p className="error">{errorMessage}</p>}

      <style jsx>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          gap: 20px;
        }
        label > span {
          font-weight: 600;
        }
        input {
          padding: 8px;
          margin: 0.3rem 0 1rem;
          border: 1px solid #ccc;
          border-radius: 4px;
        }
        .error {
          color: brown;
          margin: 1rem 0 0;
        }
      `}</style>
    </form>
  );
}
  