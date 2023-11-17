import StringInput from "./StringInput";
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";

export default function Navbar() {
  // better add a custom hook for this
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("useEffect called");
    async function fetchUser() {
      const fetchedUser = await fetch('/api/user').then((response) => response.json());
      setUser(fetchedUser);
    }
    fetchUser();
  }, []);

  return (
    <header className={styles.Navbar}>
      <div className={styles.firstInput}>
        <StringInput placeholder={"navbar input"}></StringInput>
      </div>
      <div className={styles.secondInput}>
        <div style={{float: "right"}}>
          {user?.user ? <><p>Logged in as {user.user.username}</p><p><button>Log out</button></p></> : <button>Log in</button>}
        </div>
      </div>
    </header>
  )
}
