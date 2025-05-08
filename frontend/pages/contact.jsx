export default function Contact() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Contact Us</h1>
      <p className="text-gray-700 mb-4">
        We'd love to hear from you! Feel free to reach out to us using the
        contact details below:
      </p>
      <ul className="text-gray-700 space-y-2">
        <li>
          <strong>Email:</strong>{" "}
          <a
            href="mailto:support@emeal.com"
            className="text-blue-500 hover:underline"
          >
            support@emeal.com
          </a>
        </li>
        <li>
          <strong>Phone:</strong>{" "}
          <a href="tel:+1234567890" className="text-blue-500 hover:underline">
            +1 (234) 567-890
          </a>
        </li>
        <li>
          <strong>Address:</strong> 123 E-Meal Street, Food City
        </li>
      </ul>
    </div>
  );
}
