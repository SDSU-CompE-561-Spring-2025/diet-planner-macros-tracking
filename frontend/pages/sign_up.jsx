import { useState } from "react";
import api from "../src/services/api";
import { useRouter } from "next/router";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSignUp = async (e) => {
    e.preventDefault();
    try {
      await api.post("/users/", { name, email, password });
      router.push("/login");
    } catch (error) {
      console.error("Sign-up failed", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-ivory px-4">
      <form
        onSubmit={handleSignUp}
        className="w-full max-w-sm p-6 bg-white shadow-md rounded-lg"
      >
        <h1 className="text-3xl font-extrabold text-forest mb-6 text-center">Sign Up</h1>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-forest"
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-forest"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-forest"
        />
        <button
          type="submit"
          className="w-full bg-forest text-white font-semibold py-3 rounded hover:bg-green-700 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
}
