export default function Footer() {
  return (
    <footer className="bg-moss text-ivory font-inherit py-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">About</h3>
            <p className="text-sm text-ivory/80">
              E-Meal helps you plan your meals, track nutrition, and explore
              nearby food options — all in one place.
            </p>
          </div>

          {/* Contact Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li>
                Email:{" "}
                <a
                  href="mailto:support@emeal.com"
                  className="text-amber hover:underline"
                >
                  support@emeal.com
                </a>
              </li>
              <li>
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="text-amber hover:underline"
                >
                  +1 (234) 567-890
                </a>
              </li>
              <li>Address: 123 E-Meal Street, Food City</li>
            </ul>
          </div>

          {/* Quick Links Section */}
          <div>
            <h3 className="text-lg font-bold mb-2">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="/about" className="text-amber hover:underline">
                  About Us
                </a>
              </li>
              <li>
                <a href="/privacy" className="text-amber hover:underline">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="/terms" className="text-amber hover:underline">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="/contact" className="text-amber hover:underline">
                  Contact Us
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 text-center text-sm text-ivory/60">
          &copy; {new Date().getFullYear()} E-Meal. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
