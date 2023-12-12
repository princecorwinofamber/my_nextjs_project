import styles from './PrettyForm.module.css';

export function PrettyForm({ children, onSubmit }) {
  const childArray = Array.isArray(children) ? children : [children];
  return (
    <>
      <form className={styles.PrettyForm} onSubmit={onSubmit}>
        {childArray.map((child, index) => <PrettyFormElement key={index}>{child}</PrettyFormElement>)}
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
          margin-top: 10px;
        }
      `}</style>
    </>
  );
}
