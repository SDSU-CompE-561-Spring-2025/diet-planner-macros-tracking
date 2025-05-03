import React from "react";
import Link from "next/link";

const Layout = ({ children }) => {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link href="/">Home</Link>
            </li>
            <li>
              <Link href="/meal-plans">Meal Plans</Link>
            </li>
            <li>
              <Link href="/shopping-list">Shopping List</Link>
            </li>
            <li>
              <Link href="/nutrition">Nutrition</Link>
            </li>
            <li>
              <Link href="/restaurants">Nearby Restaurants</Link>
            </li>
          </ul>
        </nav>
      </header>
      <main>{children}</main>
    </div>
  );
};

export default Layout;
