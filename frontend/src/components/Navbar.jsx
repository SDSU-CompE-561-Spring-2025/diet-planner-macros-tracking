import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm px-6 py-4">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <h1 className="text-2xl font-bold text-black">Diet Planner</h1>
        <ul className="flex flex-wrap gap-4 text-sm font-medium text-blue-600">
          <li>
            <Link href="/meal-plans" className="hover:text-blue-800">Meal Plans</Link>
          </li>
          <li>
            <Link href="/shopping-list" className="hover:text-blue-800">Shopping List</Link>
          </li>
          <li>
            <Link href="/nutrition" className="hover:text-blue-800">Nutrition</Link>
          </li>
          <li>
            <Link href="/restaurants" className="hover:text-blue-800">Restaurants</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
