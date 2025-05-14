export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-4xl font-bold mb-8 text-center">Terms of Service</h1>
      
      <div className="prose prose-forest max-w-none">
        <div className="mb-8">
          <p className="text-lg text-forest/80">
            Welcome to E-Meal! By using our services, you agree to these terms and conditions.
            Please read them carefully before using our platform.
          </p>
        </div>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">1. Acceptance of Terms</h2>
          <div className="bg-ivory rounded-lg p-6">
            <p className="text-forest/80 mb-4">
              By accessing or using E-Meal's services, you agree to be bound by these Terms of Service
              and our Privacy Policy. If you do not agree to these terms, please do not use our services.
            </p>
            <p className="text-forest/80">
              We reserve the right to modify these terms at any time. We will notify you of any changes
              by posting the updated terms on this page.
            </p>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">2. User Accounts</h2>
          <div className="bg-ivory rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Account Responsibilities</h3>
            <ul className="space-y-3 text-forest/80">
              <li className="flex items-start">
                <span className="text-forest mr-3">•</span>
                <span>You are responsible for maintaining the confidentiality of your account credentials</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest mr-3">•</span>
                <span>You must provide accurate and complete information when creating an account</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest mr-3">•</span>
                <span>You are responsible for all activities that occur under your account</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">3. Use of Services</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-ivory rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Permitted Use</h3>
              <ul className="space-y-2 text-forest/80">
                <li>• Personal, non-commercial use</li>
                <li>• Creating and managing meal plans</li>
                <li>• Tracking nutritional information</li>
                <li>• Accessing restaurant information</li>
              </ul>
            </div>
            <div className="bg-ivory rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">Prohibited Use</h3>
              <ul className="space-y-2 text-forest/80">
                <li>• Unauthorized data collection</li>
                <li>• Harmful or malicious activities</li>
                <li>• Violation of others' rights</li>
                <li>• Commercial exploitation</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">4. Content and Intellectual Property</h2>
          <div className="bg-ivory rounded-lg p-6">
            <p className="text-forest/80 mb-4">
              All content on E-Meal, including text, graphics, logos, and software, is protected by
              intellectual property rights and belongs to E-Meal or its licensors.
            </p>
            <ul className="space-y-3 text-forest/80">
              <li className="flex items-center">
                <span className="text-mint mr-2">✓</span>
                <span>You may not copy, modify, or distribute our content without permission</span>
              </li>
              <li className="flex items-center">
                <span className="text-mint mr-2">✓</span>
                <span>User-generated content remains your property, but you grant us a license to use it</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="mb-8">
          <h2 className="text-2xl font-semibold mb-4">5. Limitation of Liability</h2>
          <div className="bg-ivory rounded-lg p-6">
            <p className="text-forest/80 mb-4">
              E-Meal provides its services "as is" and makes no warranties, express or implied.
              We are not liable for:
            </p>
            <ul className="space-y-3 text-forest/80">
              <li className="flex items-start">
                <span className="text-forest mr-3">•</span>
                <span>Any direct, indirect, or consequential damages</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest mr-3">•</span>
                <span>Accuracy of nutritional information or restaurant data</span>
              </li>
              <li className="flex items-start">
                <span className="text-forest mr-3">•</span>
                <span>Service interruptions or technical issues</span>
              </li>
            </ul>
          </div>
        </section>

        <section className="bg-mint/10 rounded-lg p-6">
          <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
          <p className="text-forest/80 mb-4">
            If you have any questions about these Terms of Service, please contact us:
          </p>
          <div className="flex items-center space-x-2">
            <a
              href="mailto:legal@emeal.com"
              className="text-forest hover:text-forest/80 underline"
            >
              legal@emeal.com
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
