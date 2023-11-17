import { useState } from 'react';
import styles from './StringInput.module.css';

export default function StringInput({ placeholder, validatorRegex = /[\s\S]*/ }) {
  const [hover, setHover] = useState(false);
  const [string, setString] = useState("");

  return (
    <input
      type="text"
      className={`${styles.StringInput} ${hover ? styles.hover : ""}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onChange={(ev) => {
        if (validatorRegex.test(ev.target.value)) {
          setString(ev.target.value);
        }
      }}
      placeholder={placeholder}
      value={string}
    />
  );
}
