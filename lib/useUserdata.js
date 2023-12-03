import { set } from 'date-fns';
import { useState, useEffect } from 'react';

export function useUserdata({ caller }) {
  console.log("useUserdata called by ", caller || "unknown");
  const [user, setUser] = useState(null);
  useEffect(() => {
    console.log("useEffect called");
    const abortController = new AbortController();
    async function fetchUser() {
      try {
        const fetchedUser = await fetch('/api/user', { signal: abortController.signal }).then((response) => response.json());
        setUser(fetchedUser);
      } catch (err) {
        setUser(null);
      }
    }
    fetchUser();
    return () => {
      console.log("useEffect cleanup called");
      abortController.abort();
    }
  }, []);
  return user;
}
