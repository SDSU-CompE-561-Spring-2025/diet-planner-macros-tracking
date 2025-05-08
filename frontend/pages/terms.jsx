export default function TermsOfService() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Terms of Service</h1>
      <p className="text-gray-700 mb-4">
        Welcome to E-Meal! By using our services, you agree to the following
        terms and conditions. Please read them carefully.
      </p>
      <h2 className="text-lg font-semibold mb-2">Use of Services</h2>
      <p className="text-gray-700 mb-4">
        Our services are provided for personal use only. You agree not to misuse
        our platform or engage in any unlawful activities while using E-Meal.
      </p>
      <h2 className="text-lg font-semibold mb-2">Account Responsibilities</h2>
      <p className="text-gray-700 mb-4">
        You are responsible for maintaining the confidentiality of your account
        information and for all activities that occur under your account.
      </p>
      <h2 className="text-lg font-semibold mb-2">Limitation of Liability</h2>
      <p className="text-gray-700 mb-4">
        E-Meal is not liable for any damages arising from the use of our
        services. Use our platform at your own risk.
      </p>
      <p className="text-gray-700">
        If you have any questions about these terms, please contact us at{" "}
        <a
          href="mailto:support@emeal.com"
          className="text-blue-500 hover:underline"
        >
          support@emeal.com
        </a>
        .
      </p>
    </div>
  );
}
