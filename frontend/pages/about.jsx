import Image from "next/image";

export default function About() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-6">About E-Meal</h1>
        <p className="text-xl text-forest/80 mb-8">
          Your all-in-one solution for meal planning, nutrition tracking, and exploring nearby food options.
        </p>
        <div className="relative w-full h-64 mb-12">
          <Image
            src="/images/about-hero.jpg"
            alt="Healthy meal preparation"
            fill
            className="object-cover rounded-lg shadow-lg"
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-12 mb-12">
        <div>
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-forest/80 mb-4">
            At E-Meal, we believe that healthy eating should be accessible, enjoyable, and stress-free. 
            Our mission is to empower individuals to make informed dietary choices while saving time 
            and discovering delicious food options in their area.
          </p>
          <p className="text-forest/80">
            Whether you're looking to maintain a balanced diet, explore new cuisines, or simply make 
            your meal planning more efficient, E-Meal provides the tools and resources you need.
          </p>
        </div>

        <div>
          <h2 className="text-2xl font-semibold mb-4">What We Offer</h2>
          <ul className="space-y-4 text-forest/80">
            <li className="flex items-start">
              <span className="text-forest mr-2">•</span>
              <span>Personalized meal planning based on your dietary preferences and goals</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest mr-2">•</span>
              <span>Comprehensive nutrition tracking with detailed insights</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest mr-2">•</span>
              <span>Curated restaurant recommendations in your area</span>
            </li>
            <li className="flex items-start">
              <span className="text-forest mr-2">•</span>
              <span>Smart shopping lists generated from your meal plans</span>
            </li>
          </ul>
        </div>
      </div>

      <div className="bg-ivory rounded-lg p-8 shadow-sm">
        <h2 className="text-2xl font-semibold mb-6 text-center">Why Choose E-Meal?</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-mint rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🎯</span>
            </div>
            <h3 className="font-semibold mb-2">Personalized Experience</h3>
            <p className="text-forest/80">Tailored recommendations based on your preferences and goals</p>
          </div>
          <div className="text-center">
            <div className="bg-mint rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">📊</span>
            </div>
            <h3 className="font-semibold mb-2">Data-Driven Insights</h3>
            <p className="text-forest/80">Detailed nutrition analytics to help you make informed decisions</p>
          </div>
          <div className="text-center">
            <div className="bg-mint rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">🌟</span>
            </div>
            <h3 className="font-semibold mb-2">User-Friendly</h3>
            <p className="text-forest/80">Intuitive interface designed for seamless user experience</p>
          </div>
        </div>
      </div>
    </div>
  );
}
