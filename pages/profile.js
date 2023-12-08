import StringInput from "../components/StringInput";
import ProfilePicture from '../components/ProfilePicture';
import { Profile } from "../components/Profile";
import { useState } from "react";
import { useUserdata } from "../lib/useUserdata";
import Image from "next/image";
import utilStyles from '../styles/utils.module.css';
import { read } from "gray-matter";

export default function ProfilePage() {
  // ToDo: add a nice layout, display the current display name, register date, etc. (and the avatar of course)
  // and add the ability to edit the display name and the password

  console.log("redraw started");

  const user = useUserdata({ caller: "ProfilePage" });

  const [avatarFile, setAvatarFile] = useState(null);
  const [avatarFromReader, setAvatarFromReader] = useState(null);

  function onAvatarInputChange(ev) {
    setAvatarFile(ev.target.files[0]);
    let reader = new FileReader();
    reader.onload = function() {
      setAvatarFromReader(reader.result);
    }
    reader.readAsDataURL(ev.target.files[0]);
  }

  async function onSubmit(ev) {
    ev.preventDefault();
    const formData = new FormData();
    console.log(avatarFile);
    formData.append('avatar', avatarFile, avatarFile.name);
    fetch('/api/edit-profile-avatar', {
      method: 'POST',
      headers: { },
      body: formData,
    });
  }

  console.log("redraw finishing");

  return (
    <>
      <div>
        <h1>You are logged in as {user?.user ? user.user.username : "error" }</h1>
        {console.log("user requested") == null && user?.user && true ? <Profile userId={user.user.id} /> : null}
      </div>
      <Image id="pic" src={avatarFromReader ? avatarFromReader : "/images/forest-small.png"} width="160" height="160" className={utilStyles.borderCircle} />
      <form method="POST" action="/api/edit-profile-avatar" enctype="multipart/form-data">
        <input type="file" name="avatar" accept="image/png" onChange={onAvatarInputChange} />
        <p>{avatarFile?.name}</p>
        <button type="submit" onClick={onSubmit}>Upload</button>
      </form>
    </>
  );
}
