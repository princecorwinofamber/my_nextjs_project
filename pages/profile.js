import StringInput from "../components/StringInput";
import { useState } from "react";

export default function Profile() {
  /* function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev.currentTarget);
    const formData = new FormData(ev.target);
    fetch('/api/edit-profile-avatar', {
      method: 'POST',
      headers: { "Content-Type": "multipart/form-data" },
      body: formData,
    });
  } */

  /* return (
    <>
      <form method="POST" action="/api/edit-profile-avatar" enctype="multipart/form-data">
        <input type="file" name="avatar" accept="image/png" />
        <button type="submit">Upload</button>
      </form>
    </>
  ); */

  const [avatarFile, setAvatarFile] = useState(null);

  function onAvatarInputChange(ev) {
    setAvatarFile(ev.target.files[0]);
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

  return (
    <>
      <form method="POST" action="/api/edit-profile-avatar" enctype="multipart/form-data">
        <input type="file" name="avatar" accept="image/png" onChange={onAvatarInputChange} />
        <p>{avatarFile?.name}</p>
        <button type="submit" onClick={onSubmit}>Upload</button>
      </form>
    </>
  );
}
