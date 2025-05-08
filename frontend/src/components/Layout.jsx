import Navbar from "./Navbar";
import Footer from "./Footer";

export default function Layout({ children }) {
  return (
    <div className="min-h-screen font-body bg-cream text-forest">
      <Navbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
}
