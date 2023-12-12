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

  const user = useUserdata();

  const [avatar, setAvatar] = useState(null);
  const [displayName, setDisplayName] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");

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
  }

  async function onPasswordSubmit(ev) {
    ev.preventDefault();
    const success = await fetch('/api/change-password', {
      method: 'POST',
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        oldPassword: currentPassword,
        newPassword: newPassword,
        repeatPassword: newPasswordConfirm,
      })
    });
  }

  return (
    <>
      <div className="profile">
        <p style={{display: 'flex', justifyContent: 'center'}}>Change Avatar</p>
        <a onClick={() => fileInputRef.current.click()} style={{ margin: "auto" }}>{
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
        <form onSubmit={(ev) => ev.preventDefault()} style={formStyle}>
          <p style={{display: 'flex', justifyContent: 'center'}}>Displayed Name</p>
          <div style={formElementStyle}>
            <StringInput placeholder="Display Name" value={displayName} setValue={onDisplayNameInputChange} validatorRegex={/^[\w ]*$/} />
          </div>
        </form>
        <form onSubmit={(ev) => ev.preventDefault()} style={formStyle}>
          <p style={{display: 'flex', justifyContent: 'center'}}>Change password</p>
          <div style={formElementStyle}>
            <StringInput placeholder="Current Password" value={currentPassword} setValue={setCurrentPassword}/>
          </div>
          <div style={formElementStyle}>
            <StringInput placeholder="New Password" value={newPassword} setValue={setNewPassword}/>
          </div>
          <div style={formElementStyle}>
            <StringInput placeholder="Repeat Password" value={newPasswordConfirm} setValue={setNewPasswordConfirm}/>
          </div>
          <div style={{display: 'flex', justifyContent: 'center', ...formElementStyle}}>
            <button type="submit" onClick={onPasswordSubmit}>Change Password</button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .profile {
          display: grid;
          row-gap: 20px;
          justify-content: center;
          margin-top: 40px;
          height: 100%;
        }
        .error {
          color: red;
        }
      `}</style>
    </>
  );
}

const formStyle = {
  "marginTop": "32px",
}

const formElementStyle = {
  "marginTop": "10px",
}
