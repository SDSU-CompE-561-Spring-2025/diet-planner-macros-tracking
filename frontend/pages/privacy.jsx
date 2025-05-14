export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Privacy Policy</h1>
      
      <div className="prose prose-forest max-w-none">
        <div className="mb-8">
          <p className="text-lg text-forest/80 mb-8">
            At E-Meal, we value your privacy and are committed to protecting your
            personal information. This Privacy Policy outlines how we collect, use,
            and safeguard your data.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <div className="bg-ivory rounded-lg p-6">
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-forest mr-3">•</span>
                <div>
                  <strong className="block text-lg mb-1">Personal Information</strong>
                  <p className="text-forest/80">Name, email address, and contact details when you create an account</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-forest mr-3">•</span>
                <div>
                  <strong className="block text-lg mb-1">Dietary Preferences</strong>
                  <p className="text-forest/80">Food preferences, allergies, and dietary restrictions</p>
                </div>
              </li>
              <li className="flex items-start">
                <span className="text-forest mr-3">•</span>
                <div>
                  <strong className="block text-lg mb-1">Usage Data</strong>
                  <p className="text-forest/80">Information about how you use our services, including meal plans and restaurant visits</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-ivory rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Service Improvement</h3>
              <ul className="space-y-2 text-forest/80">
                <li>• Personalize your meal recommendations</li>
                <li>• Improve our recipe suggestions</li>
                <li>• Enhance your overall experience</li>
              </ul>
            </div>
            <div className="bg-ivory rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Communication</h3>
              <ul className="space-y-2 text-forest/80">
                <li>• Send important updates about our service</li>
                <li>• Share personalized nutrition tips</li>
                <li>• Respond to your inquiries</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Data Protection</h2>
          <p className="text-forest/80 mb-4">
            We implement robust security measures to protect your personal information:
          </p>
          <div className="bg-ivory rounded-lg p-6">
            <ul className="space-y-3 text-forest/80">
              <li className="flex items-center">
                <span className="text-mint mr-2">✓</span>
                Secure data encryption
              </li>
              <li className="flex items-center">
                <span className="text-mint mr-2">✓</span>
                Regular security audits
              </li>
              <li className="flex items-center">
                <span className="text-mint mr-2">✓</span>
                Strict access controls
              </li>
              <li className="flex items-center">
                <span className="text-mint mr-2">✓</span>
                Regular data backups
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">Your Rights</h2>
          <p className="text-forest/80 mb-4">
            You have several rights regarding your personal data:
          </p>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-ivory rounded-lg p-6">
              <ul className="space-y-3 text-forest/80">
                <li>• Access your personal data</li>
                <li>• Request data correction</li>
                <li>• Delete your account</li>
              </ul>
            </div>
            <div className="bg-ivory rounded-lg p-6">
              <ul className="space-y-3 text-forest/80">
                <li>• Opt-out of communications</li>
                <li>• Export your data</li>
                <li>• Update preferences</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="bg-mint/10 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-forest/80 mb-4">
            If you have any questions about our Privacy Policy or how we handle your data,
            please contact us at:
          </p>
          <div className="flex items-center space-x-2">
            <a
              href="mailto:privacy@emeal.com"
              className="text-forest hover:text-forest/80 underline"
            >
              privacy@emeal.com
            </a>
            <span className="text-forest/60">|</span>
            <a
              href="tel:+1234567890"
              className="text-forest hover:text-forest/80 underline"
            >
              +1 (234) 567-890
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
