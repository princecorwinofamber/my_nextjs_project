import StringInput from "../components/StringInput";

export default function Profile() {
  function onSubmit(ev) {
    ev.preventDefault();
    console.log(ev.currentTarget);
    const formData = new FormData(ev.currentTarget);
    fetch('/api/edit-profile-avatar', {
      method: 'POST',
      headers: { "Content-Type": "image/png" },
      body: formData,
    });
  }
  return (
    <>
      <form method="POST" action="/api/edit-profile-avatar">
        <input type="file" name="avatar" accept="image/png" />
        <button type="submit">Upload</button>
      </form>
    </>
  );
}
