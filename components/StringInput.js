import { useState } from 'react';
import styles from './StringInput.module.css';

export default function StringInput({ value, setValue, placeholder, name, required=false, validatorRegex = /[\s\S]*/ }) {
  const [hover, setHover] = useState(false);

  return (
    <input
      type="text"
      className={`${styles.StringInput} ${hover ? styles.hover : ""}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onChange={(ev) => {
        if (validatorRegex.test(ev.target.value)) {
          setValue(ev.target.value);
        }
      }}
      placeholder={placeholder}
      required={required}
      value={value}
      name={name}
    />
  );
}
