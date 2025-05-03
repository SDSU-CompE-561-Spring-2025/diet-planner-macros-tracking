import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">
        Welcome to AI-Driven Meal Planner
      </h1>
      <p className="text-lg mb-6">
        Plan your meals, track nutrition, and more!
      </p>
      <div className="space-x-4">
        <Link href="/login">
          <a className="px-4 py-2 bg-blue-500 text-white rounded">Login</a>
        </Link>
        <Link href="/signup">
          <a className="px-4 py-2 bg-green-500 text-white rounded">Sign Up</a>
        </Link>
      </div>
    </div>
  );
}
