import styled from "styled-components"

const Button = styled.button`
  background-color: teal;
  color: white;
`

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
      <Button>Click me!</Button>
    </>
  )
}
