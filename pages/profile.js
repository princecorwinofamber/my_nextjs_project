import StringInput from "../components/StringInput";
import ProfilePicture from '../components/ProfilePicture';
import { Profile } from "../components/Profile";
import { useState, useRef } from "react";
import { useUserdata } from "../lib/useUserdata";
import Image from "next/image";
import utilStyles from '../styles/utils.module.css';

export default function ProfilePage() {
  // ToDo: add a nice layout, display the current display name, register date, etc. (and the avatar of course)
  // and add the ability to edit the display name and the password

  const user = useUserdata({ caller: "ProfilePage" });

  const [newAvatarSerialized, setNewAvatarSerialized] = useState(null);

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
        setNewAvatarSerialized(reader.result);
      }
      reader.readAsDataURL(ev.target.files[0]);
    }
  }

  return (
    <>
      <div>
        <h1>You are logged in as {user?.user ? user.user.username : "error" }</h1>
        {console.log("user requested") == null && user?.user && true ? <Profile userId={user.user.id} /> : null}
      </div>
      <a onClick={() => fileInputRef.current.click()}>{
        newAvatarSerialized ? 
        <Image
          src={newAvatarSerialized}
          alt="Profile Picture"
          width={160}
          height={160}
          className={utilStyles.borderCircle}
        /> :
        <ProfilePicture userId={user?.user ? user.user.id : 0} size={160} />
      }</a>
      
      <form method="POST" action="/api/edit-profile-avatar" enctype="multipart/form-data" style={{ display: "none" }}>
        <input type="file" ref={fileInputRef} name="avatar" accept="image/png" onChange={onAvatarInputChange} />
      </form>
    </>
  );
}
