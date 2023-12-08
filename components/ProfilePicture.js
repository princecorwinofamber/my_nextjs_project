import { set } from 'date-fns';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import utilStyles from '../styles/utils.module.css';

function avatarLoader({ src, width, quality }) {
  return `/api/avatar?user=${src}&width=${width}&quality=${quality || 75}`;
}

export default function ProfilePicture({ userId, size }) {
  const [available, setAvailable] = useState(true);

  useEffect(() => {
    setAvailable(true);
  }, [userId]);

  return (
    <>
      {available ? 
      <Image
        src={`${userId}`}
        loader={avatarLoader}
        alt="Profile Picture"
        width={size}
        height={size}
        className={utilStyles.borderCircle}
        onError={() => setAvailable(false)}
      /> :
      <Image
        src="/images/default-avatar.png"
        alt="Default Profile Picture"
        width={size}
        height={size}
        className={utilStyles.borderCircle}
      />}
    </>
  );
}
