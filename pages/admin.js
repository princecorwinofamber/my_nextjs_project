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
      <button>Click me!</button>
    </>
  )
}
