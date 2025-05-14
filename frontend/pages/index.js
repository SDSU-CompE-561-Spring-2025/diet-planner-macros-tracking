import Link from 'next/link';
import Image from 'next/image';

export default function Home() {
  const features = [
    {
      title: 'Personalized Meal Plans',
      description: 'Get customized meal plans based on your preferences, dietary restrictions, and goals.',
      icon: '🍽️',
      link: '/meal-plans'
    },
    {
      title: 'Macro Tracking',
      description: 'Track your daily macronutrients and calories with our easy-to-use nutrition dashboard.',
      icon: '📊',
      link: '/nutrition'
    },
    {
      title: 'Restaurant Finder',
      description: 'Discover healthy dining options near you that match your dietary preferences.',
      icon: '🍴',
      link: '/restaurants'
    },
    {
      title: 'Shopping Lists',
      description: 'Automatically generate shopping lists based on your meal plans.',
      icon: '🛒',
      link: '/shopping-list'
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-cream py-20">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <h1 className="text-5xl font-bold text-forest mb-6">
                Your Personal Diet Planner & Macro Tracker
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Plan your meals, track your macros, and find healthy dining options - all in one place.
              </p>
              <div className="space-x-4">
                <Link
                  href="/signup"
                  className="inline-block bg-forest text-white px-8 py-3 rounded-lg hover:bg-forest/90 transition">
                  Get Started
                </Link>
                <Link
                  href="/about"
                  className="inline-block bg-transparent border-2 border-forest text-forest px-8 py-3 rounded-lg hover:bg-forest/10 transition">
                  Learn More
                </Link>
              </div>
            </div>
            <div className="md:w-1/2">
              <div className="relative h-[400px] w-full">
                <Image
                  src="/images/meal1.png"
                  alt="Healthy meal preparation"
                  fill
                  className="object-cover rounded-lg shadow-xl"
                  priority
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-forest mb-12">
            Everything You Need to Stay Healthy
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature) => (
              <Link
                key={feature.title}
                href={feature.link}
                className="p-6 bg-white rounded-lg shadow-lg hover:shadow-xl transition group"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-forest mb-2 group-hover:text-mint transition">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-forest text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-8">
            Ready to Start Your Health Journey?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of users who have transformed their eating habits with our platform.
          </p>
          <Link
            href="/signup"
            className="inline-block bg-mint text-forest px-8 py-3 rounded-lg hover:bg-mint/90 transition">
            Sign Up Now - It's Free
          </Link>
        </div>
      </section>
    </div>
  );
} 