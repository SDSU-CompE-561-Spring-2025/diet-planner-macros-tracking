export default function PrivacyPolicy() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Privacy Policy</h1>
      <p className="text-gray-700 mb-4">
        At E-Meal, we value your privacy and are committed to protecting your
        personal information. This Privacy Policy outlines how we collect, use,
        and safeguard your data.
      </p>
      <h2 className="text-lg font-semibold mb-2">Information We Collect</h2>
      <p className="text-gray-700 mb-4">
        We may collect personal information such as your name, email address,
        and dietary preferences when you use our services.
      </p>
      <h2 className="text-lg font-semibold mb-2">
        How We Use Your Information
      </h2>
      <p className="text-gray-700 mb-4">
        Your information is used to provide personalized meal plans, improve our
        services, and communicate with you about updates or promotions.
      </p>
      <h2 className="text-lg font-semibold mb-2">Your Rights</h2>
      <p className="text-gray-700 mb-4">
        You have the right to access, update, or delete your personal
        information. Please contact us at{" "}
        <a
          href="mailto:support@emeal.com"
          className="text-blue-500 hover:underline"
        >
          support@emeal.com
        </a>{" "}
        for assistance.
      </p>
      <p className="text-gray-700">
        For more details, feel free to reach out to us. Thank you for trusting
        E-Meal!
      </p>
    </div>
  );
}
