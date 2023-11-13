export default function Signup() {
  return (
    <>
      <form onSubmit={async (event) => {
        event.preventDefault();
        const body = {
          username: event.currentTarget.username.value,
          password: event.currentTarget.password.value,
          display_name: event.currentTarget.display_name.value
        };
        await fetch("/api/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });
      }}>
        <input type="text" name="username" required />
        <input type="text" name="password" required />
        <input type="text" name="display_name" required />
        <button type="submit">Sign up</button>
      </form>
    </>
  );
}
