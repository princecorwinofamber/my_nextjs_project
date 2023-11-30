import { useState, useEffect } from 'react';
import ProfilePicture from './ProfilePicture';
import classes from './Profile.module.css';

function parseDate(timestamp) {
  const parsedArray = /(\d+)-(\d+)-(\d+)/.exec(timestamp);
  if (parsedArray) {
    const [_, year, month, date] = parsedArray;
    return { date, month, year };
  } else {
    return { date: "??", month: "??", year: "????" };
  }
}

export function Profile({ userId }) {
  const [user, setUser] = useState({});

  useEffect(() => {
    async function fetchUser() {
      const fetchedUser = await fetch(`/api/user-info?id=${userId}`).then((response) => response.json());
      setUser(fetchedUser?.user || {});
    }
    fetchUser();
  }, []);
  const date = parseDate(user.signup_date);

  return (
    <div className={`${classes.root}`}>
      <div className={classes.avatar}>
        <ProfilePicture userId={userId} size={80} />
      </div>
      <div className={classes.name}>{user.username}</div>
      <div className={classes.memberSince1262021}>membeer since {date.date}.{date.month}.{date.year}</div>
    </div>
  );
};
