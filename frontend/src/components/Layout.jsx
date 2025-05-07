import Navbar from './Navbar';

export default function Layout({ children }) {
    return (
      <div className="min-h-screen bg-white text-black font-sans">
        <header className="p-4 shadow mb-8">
          <h1 className="text-2xl font-bold">Diet Planner</h1>
        </header>
        <main className="px-6">{children}</main>
      </div>
    );
  }
  