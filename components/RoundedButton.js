import styles from './RoundedButton.module.css';

export default function RoundedButton({ children }) {
  return (
    <>
      <button className={styles.RoundedButton}>{children}</button>
    </>
  );
}
