import React from "react";
import Link from "next/link";

const Home = () => {
  return (
    <div>
      <h1>Welcome to the Diet Planner</h1>
      <nav>
        <ul>
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
    </div>
  );
};

export default Home;
