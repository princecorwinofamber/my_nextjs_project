import Navbar from "./Navbar";

export default function ForumLayout({ children }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
    </>
  );
}
