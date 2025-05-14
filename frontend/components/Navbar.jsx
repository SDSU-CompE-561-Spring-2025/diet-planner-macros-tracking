import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '../src/contexts/AuthContext';

export default function Navbar() {
  const router = useRouter();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    await logout();
    router.push('/');
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
              {user && (
                <>
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
                </>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center sm:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-white hover:text-mint focus:outline-none"
            >
              <span className="sr-only">Open main menu</span>
              {isMenuOpen ? (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>

          {/* Desktop menu */}
          <div className="hidden sm:flex sm:items-center sm:space-x-4">
            {user ? (
              <>
                <span className="text-sm">Welcome, {user.name}!</span>
                <button
                  onClick={handleLogout}
                  className="bg-white text-forest px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-white hover:text-mint px-3 py-2 rounded-md text-sm font-medium transition"
                >
                  Login
                </Link>
                <Link
                  href="/signup"
                  className="bg-mint text-forest px-4 py-2 rounded-lg text-sm font-medium hover:bg-mint/90 transition"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <div className={`${isMenuOpen ? 'block' : 'hidden'} sm:hidden`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {user ? (
            <>
              <span className="block px-3 py-2 text-base font-medium">
                Welcome, {user.name}!
              </span>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-base font-medium hover:bg-mint hover:text-forest transition"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="block px-3 py-2 text-base font-medium hover:bg-mint hover:text-forest transition"
              >
                Login
              </Link>
              <Link
                href="/signup"
                className="block px-3 py-2 text-base font-medium hover:bg-mint hover:text-forest transition"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
} 