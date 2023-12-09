import { set } from 'date-fns';
import { useState, useEffect } from 'react';

export function useUserdata() {
  const [user, setUser] = useState(null);

  function updateUser() {
    console.log("FETCHING USER");
    const abortController = new AbortController();
    async function fetchUser() {
      try {
        const fetchedUser = await fetch('/api/user', { signal: abortController.signal }).then((response) => response.json());
        setUser(fetchedUser);
        console.log("FETCHED USER", fetchedUser);
      } catch (err) {
        setUser(null);
      }
    }
    fetchUser();
    return () => {
      console.log("abort called");
      abortController.abort();
    }
  }

  useEffect(() => {
    console.log("useEffect called");
    const destroyer = updateUser();
    return () => {
      console.log("useEffect cleanup called");
      destroyer();
    }
  }, []);
  return [user, updateUser];
}
