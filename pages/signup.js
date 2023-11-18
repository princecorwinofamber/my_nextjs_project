import RoundedButton from "../components/RoundedButton";
import StringInput from "../components/StringInput";

export default function Signup() {
  const onSubmit=async (event) => {
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
  };
  return (
    <>
      <form>
        <StringInput type="text" name="username" required />
        <StringInput type="text" name="password" required />
        <StringInput type="text" name="display_name" required />
        <RoundedButton type="submit">Sign up</RoundedButton>
      </form>
    </>
  );
}
