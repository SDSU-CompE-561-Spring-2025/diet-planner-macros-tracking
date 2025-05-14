import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-forest text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link href="/" className="text-xl font-bold">
                Diet Planner
              </Link>
            </div>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname === '/'
                    ? 'border-white'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Home
              </Link>
              <Link
                href="/meal-planner"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname === '/meal-planner'
                    ? 'border-white'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Meal Planner
              </Link>
              <Link
                href="/restaurants"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname === '/restaurants'
                    ? 'border-white'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Restaurants
              </Link>
              <Link
                href="/profile"
                className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                  router.pathname === '/profile'
                    ? 'border-white'
                    : 'border-transparent hover:border-gray-300'
                }`}
              >
                Profile
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="sm:hidden flex items-center">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-green-700 focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className={`${isMenuOpen ? 'hidden' : 'block'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
              <svg
                className={`${isMenuOpen ? 'block' : 'hidden'} h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="pt-2 pb-3 space-y-1">
          <Link
            href="/"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              router.pathname === '/'
                ? 'bg-green-700'
                : 'hover:bg-green-700'
            }`}
          >
            Home
          </Link>
          <Link
            href="/meal-planner"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              router.pathname === '/meal-planner'
                ? 'bg-green-700'
                : 'hover:bg-green-700'
            }`}
          >
            Meal Planner
          </Link>
          <Link
            href="/restaurants"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              router.pathname === '/restaurants'
                ? 'bg-green-700'
                : 'hover:bg-green-700'
            }`}
          >
            Restaurants
          </Link>
          <Link
            href="/profile"
            className={`block pl-3 pr-4 py-2 text-base font-medium ${
              router.pathname === '/profile'
                ? 'bg-green-700'
                : 'hover:bg-green-700'
            }`}
          >
            Profile
          </Link>
        </div>
      </div>
    </nav>
  );
} 