import { useState } from 'react';
import styles from './RoundedButton.module.css';

export default function RoundedButton({ children, onClick }) {
  const [hover, setHover] = useState(false);

  return (
    <button
      className={`${styles.RoundedButton} ${hover ? styles.hover : ""}`}
      onPointerEnter={() => setHover(true)}
      onPointerLeave={() => setHover(false)}
      onClick={onClick}
    >{children}</button>
  );
}
