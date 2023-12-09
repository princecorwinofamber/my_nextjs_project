import StringInput from "../components/StringInput";
import ProfilePicture from '../components/ProfilePicture';
import { Profile } from "../components/Profile";
import { useState, useRef, useEffect } from "react";
import { useUserdata } from "../lib/useUserdata";
import Image from "next/image";
import utilStyles from '../styles/utils.module.css';

export default function ProfilePage() {
  // ToDo: add a nice layout, display the current display name, register date, etc. (and the avatar of course)
  // and add the ability to edit the display name and the password

  const [user, updateUser] = useUserdata();

  const [avatar, setAvatar] = useState(null);
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    if (user?.user?.display_name) {
      setDisplayName(user.user.display_name);
    }
  }, [user]);

  const fileInputRef = useRef(null);

  async function onAvatarInputChange(ev) {
    const formData = new FormData();
    console.log(ev.target.files[0]);
    formData.append('avatar', ev.target.files[0], ev.target.files[0].name);
    const success = await fetch('/api/edit-profile-avatar', {
      method: 'POST',
      headers: { },
      body: formData,
    });
    console.log("success", success);
    if (success.status == 200) {
      let reader = new FileReader();
      reader.onload = function() {
        setAvatar(reader.result);
      }
      reader.readAsDataURL(ev.target.files[0]);
    }
  }

  async function onDisplayNameInputChange(value) {
    setDisplayName(value);
    const success = await fetch('/api/edit-display-name', {
      method: 'POST',
      headers: { "Content-Type": "text/plain" },
      body: value,
    });
    console.log("user", user);
    if (success.status == 200) {
      updateUser();
    }
  }

  return (
    <>
      <div>
        <h1>You are logged in as {user?.user ? user.user.username : "error" }</h1>
        {console.log("user requested") == null && user?.user && true ? <Profile userId={user.user.id} /> : null}
      </div>
      <a onClick={() => fileInputRef.current.click()}>{
        avatar ? 
        <Image
          src={avatar}
          alt="Profile Picture"
          width={160}
          height={160}
          className={utilStyles.borderCircle}
        /> :
        <ProfilePicture userId={user?.user ? user.user.id : 0} size={160} />
      }</a>
      
      <form method="POST" action="/api/edit-profile-avatar" style={{ display: "none" }}>
        <input type="file" ref={fileInputRef} name="avatar" accept="image/png" onChange={onAvatarInputChange} />
      </form>
      <form method="POST" action="/api/edit-profile-displayname">
        <StringInput placeholder="Display Name" value={displayName} setValue={onDisplayNameInputChange}/>
      </form>
    </>
  );
}
