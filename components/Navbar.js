import StringInput from "./StringInput";
import Image from 'next/image';
import styles from "./Navbar.module.css";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Navbar() {
  const router = useRouter();
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
        <Image
          src="/images/forest-small.png"
          width={286}
          height={55}
          alt="Forum logo"
        />
      </div>
      <div className={styles.secondInput}>
        <div style={{float: "right"}}>
          {user?.user?.username ?
          <>
            <p>Logged in as {user.user.username}</p>
            <p>
              <Link href="/admin">My Account</Link>
            </p>
            <p>
              <button onClick={() => fetch('/api/logout', { method: 'POST' }).then(() => router.reload())}>Log out</button>
            </p>
          </> :
          <button onClick={() => router.push('/login')}>Log in</button>}
        </div>
      </div>
    </header>
  )
}
