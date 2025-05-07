import Navbar from "./navbar";
import Footer from "./footer"; // Import the Footer component

export default function Layout({ children }) {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">{children}</main>
      <Footer /> {/* Add the Footer here */}
    </>
  );
}
