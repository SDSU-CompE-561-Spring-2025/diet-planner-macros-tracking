import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ivory text-forest px-4 text-center">
      <h1 className="text-4xl font-extrabold mb-3">Welcome to the Diet Planner</h1>
      <p className="text-lg text-forest mb-6 max-w-md">
        Plan your meals, track nutrition, and explore nearby food options — all in one place.
      </p>

      <section className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
        {/* Personalized Meal Plans */}
        <Link
          href="/meal-plans" // You can change this path later
          className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition"
        >
          <Image
            src="/images/meal1.png"
            alt="Personalized Meal Plans"
            width={400}
            height={300}
            className="rounded-md"
          />
          <h2 className="text-xl font-semibold mt-4">Personalized Meal Plans</h2>
          <p className="text-gray-700 mt-2">
            Tell us your dietary needs & budget. Our AI suggests the best meals tailored for you!
          </p>
        </Link>

        {/* Find Nearby Restaurants */}
        <Link
          href="/restaurants"
          className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition"
        >
          <Image
            src="/images/meal2.png"
            alt="Find Nearby Restaurants"
            width={400}
            height={300}
            className="rounded-md"
          />
          <h2 className="text-xl font-semibold mt-4">Find Nearby Restaurants</h2>
          <p className="text-gray-700 mt-2">
            Craving something specific? Discover top-rated restaurants based on your taste & location.
          </p>
        </Link>

        {/* How It Works */}
        <Link
          href="/how-it-works" // You can change this path later
          className="bg-white rounded-lg shadow p-4 flex flex-col items-center hover:shadow-lg transition"
        >
          <Image
            src="/images/meal3.png"
            alt="How It Works"
            width={400}
            height={300}
            className="rounded-md"
          />
          <h2 className="text-xl font-semibold mt-4">How It Works</h2>
          <p className="text-gray-700 mt-2">
            We believe that healthy eating and dining experiences should be accessible, personalized, and effortless.
          </p>
        </Link>
      </section>
    </div>
  );
}
