import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Diet Planner Logo"
                width={90} // try 60–80px range
                height={90}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center">
            <Link href="/meal-plans" className="text-gray-700 hover:text-blue-600">Meal Plans</Link>
            <Link href="/meals" className="text-gray-700 hover:text-blue-600">Meals</Link>
            <Link href="/nutrition" className="text-gray-700 hover:text-blue-600">Nutrition</Link>
            <Link href="/restaurants" className="text-gray-700 hover:text-blue-600">Restaurants</Link>
            <Link href="/shopping-list" className="text-gray-700 hover:text-blue-600">Shopping List</Link>
            <Link href="/profile" className="text-gray-700 hover:text-blue-600">Profile</Link>
            <Link href="/login" className="text-blue-600 hover:underline">Login</Link>
            <Link href="/sign_up" className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-white border-t">
          <Link href="/meal-plans" className="block text-gray-700 hover:text-blue-600">Meal Plans</Link>
          <Link href="/meals" className="block text-gray-700 hover:text-blue-600">Meals</Link>
          <Link href="/nutrition" className="block text-gray-700 hover:text-blue-600">Nutrition</Link>
          <Link href="/restaurants" className="block text-gray-700 hover:text-blue-600">Restaurants</Link>
          <Link href="/shopping-list" className="block text-gray-700 hover:text-blue-600">Shopping List</Link>
          <Link href="/profile" className="block text-gray-700 hover:text-blue-600">Profile</Link>
          <Link href="/login" className="block text-blue-600 hover:underline">Login</Link>
          <Link href="/sign_up" className="block px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
