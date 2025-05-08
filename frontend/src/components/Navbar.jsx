import Link from "next/link";
import { useState } from "react";
import Image from "next/image";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-ivory shadow font-inherit">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/">
              <Image
                src="/images/logo.png"
                alt="Diet Planner Logo"
                width={65}
                height={65}
                className="object-contain"
                priority
              />
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-4 items-center text-forest">
            <Link href="/meal-plans" className="hover:text-amber">Meal Plans</Link>
            <Link href="/meals" className="hover:text-amber">Meals</Link>
            <Link href="/nutrition" className="hover:text-amber">Nutrition</Link>
            <Link href="/restaurants" className="hover:text-amber">Restaurants</Link>
            <Link href="/shopping-list" className="hover:text-amber">Shopping List</Link>
            <Link href="/profile" className="hover:text-amber">Profile</Link>
            <Link href="/login" className="text-raspberry hover:underline">Login</Link>
            <Link href="/sign_up" className="px-3 py-1 bg-brightOrange text-white rounded hover:bg-orange">Sign Up</Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)} className="text-forest focus:outline-none text-xl">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden px-4 pb-4 space-y-2 bg-ivory border-t text-forest font-inherit">
          <Link href="/meal-plans" className="block hover:text-amber">Meal Plans</Link>
          <Link href="/meals" className="block hover:text-amber">Meals</Link>
          <Link href="/nutrition" className="block hover:text-amber">Nutrition</Link>
          <Link href="/restaurants" className="block hover:text-amber">Restaurants</Link>
          <Link href="/shopping-list" className="block hover:text-amber">Shopping List</Link>
          <Link href="/profile" className="block hover:text-amber">Profile</Link>
          <Link href="/login" className="block text-raspberry hover:underline">Login</Link>
          <Link href="/sign_up" className="block px-3 py-1 bg-brightOrange text-white rounded hover:bg-orange">Sign Up</Link>
        </div>
      )}
    </nav>
  );
}
