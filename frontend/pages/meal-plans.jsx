import Image from "next/image";
import Link from "next/link";

export default function MealPlans() {
  return (
    <div className="bg-white min-h-screen text-gray-900 px-6 py-12 max-w-5xl mx-auto">
      <h1 className="text-4xl font-bold mb-4">Meal Planner</h1>
      <p className="text-lg text-gray-600 mb-6">
        Members can create personalized meal plans based on dietary needs and lifestyle goals.
      </p>

      <Link href="/signup">
        <button className="bg-black text-white px-6 py-2 rounded hover:opacity-90 mb-8">
          Sign Up to Get Started
        </button>
      </Link>

      <div className="mb-10">
        <Image
          src="/clipboard-meal.jpg"
          alt="Meal Planning Clipboard"
          width={800}
          height={500}
          className="rounded shadow"
        />
      </div>

      <section className="space-y-10">
        <div>
          <h2 className="text-2xl font-bold mb-2">Plan 1: Personalized Nutrition</h2>
          <p className="text-gray-700">
            Suggest meals filtered by macros, allergies, or preferred ingredients.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Plan 2: Budget-Friendly Meals</h2>
          <p className="text-gray-700">
            Find affordable options with cost breakdowns and efficient grocery lists.
          </p>
        </div>
        <div>
          <h2 className="text-2xl font-bold mb-2">Plan 3: Craving & Location-Based</h2>
          <p className="text-gray-700">
            Get real-time AI meal suggestions based on cravings and nearby restaurants.
          </p>
        </div>
      </section>
    </div>
  );
}
