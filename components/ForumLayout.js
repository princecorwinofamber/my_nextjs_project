import Navbar from "./Navbar";

export default function ForumLayout({ children }) {
  return (
    <>
      <Navbar />
      <main style={{ margin: 8 }}>{children}</main>
    </>
  );
}
