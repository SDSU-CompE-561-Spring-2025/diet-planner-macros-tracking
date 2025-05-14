import { useState } from "react";
import api from "../src/services/api";
import { useRouter } from "next/router";
import Link from "next/link";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    // Basic validation
    if (!email || !password) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address");
      setLoading(false);
      return;
    }

    try {
      // Using URLSearchParams for login since the backend expects x-www-form-urlencoded
      const formData = new URLSearchParams();
      formData.append("username", email); // OAuth2 expects 'username' field
      formData.append("password", password);

      const response = await api.post("/api/auth/login", formData.toString(), {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      });
      
      document.cookie = `token=${response.data.access_token}; path=/; max-age=86400`; // 24 hours
      router.push("/dashboard");
    } catch (error) {
      console.error("Login error:", error.response?.data);
      setError(error.response?.data?.detail || "Login failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ivory px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg"
      >
        <h1 className="text-3xl font-extrabold text-forest mb-6 text-center">Login</h1>
        
        {error && (
          <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm">
            {error}
          </div>
        )}

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-forest"
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-forest"
          required
          minLength={6}
        />
        <button
          type="submit"
          disabled={loading}
          className={`w-full bg-forest text-white font-semibold py-3 rounded transition ${
            loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-green-700'
          }`}
        >
          {loading ? 'Logging in...' : 'Login'}
        </button>

        <p className="mt-4 text-center text-gray-600">
          Don't have an account?{' '}
          <Link href="/sign_up" className="text-forest hover:underline">
            Sign up
          </Link>
        </p>
      </form>
    </div>
  );
}
