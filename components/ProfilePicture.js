import Image from 'next/image';

function avatarLoader({ src, width, quality }) {
  return `/api/avatar?user=${src}&width=${width}&quality=${quality || 75}`;
}

export default function ProfilePicture({ userId, size }) {
    return (
      <>
        <Image
          src={`${userId}`}
          loader={avatarLoader}
          alt="Profile Picture"
          width={size}
          height={size}
          className="profile-picture"
          onError={(e) => console.log(e)}
        />
        <style jsx>{`
          .profile-picture {
            border-radius: 9999px;
          }
        `}</style>
      </>
    );
}
