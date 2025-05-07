import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-gray-800 text-white px-6 py-4 shadow-md">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <h1 className="text-xl font-bold">Diet Planner</h1>
        <ul className="flex space-x-6">
          <li><Link href="/meal-plans" className="hover:underline">Meal Plans</Link></li>
          <li><Link href="/shopping-list" className="hover:underline">Shopping List</Link></li>
          <li><Link href="/nutrition" className="hover:underline">Nutrition</Link></li>
          <li><Link href="/restaurants" className="hover:underline">Restaurants</Link></li>
        </ul>
      </div>
    </nav>
  );
}
