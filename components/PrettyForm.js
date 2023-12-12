import styles from './PrettyForm.module.css';

export function PrettyForm({ children, onSubmit }) {
  return (
    <>
      <form className={styles.PrettyForm} onSubmit={onSubmit}>
        {children.map(child => <PrettyFormElement>{child}</PrettyFormElement>)}
      </form>
      <style jsx>{`
        .prettyForm {
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

export function PrettyFormElement({ children }) {
  return (
    <>
      <div className={styles.PrettyFormElement}>
        {children}
      </div>
      <style jsx>{`
        .prettyFormElement {
          display: flex;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
