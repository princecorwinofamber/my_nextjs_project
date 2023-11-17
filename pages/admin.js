import RoundedButton from "../components/RoundedButton";
import StringInput from "../components/StringInput";

export async function getStaticProps({ params }) {
  // Add the "await" keyword like this:
  const postData = 1234;

  return {
    props: {
      postData,
    },
  };
}

export default function Admin({ postData }) {
  return (
    <>
      <h1>This is the admin page</h1>
      <RoundedButton children={"Hello, world!"} onClick={() => alert(123)} />
      <StringInput placeholder={"Enter your username here"} validatorRegex={/^[a-z]*$/} />
      <div className="flex-container">
        <button>kotiki</button>
        <button className="d-flex justify-content-end">meow</button>
      </div>
    </>
  )
}

