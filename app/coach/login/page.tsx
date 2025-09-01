"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { coachLoginAction } from "@/lib/action";
import { Mail, Lock } from "lucide-react"; 
export default function CoachLoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await coachLoginAction({ email, password });
    setLoading(false);

   // CoachLoginForm.tsx
if (res.success && res.coachId && res.coachName) {
  localStorage.setItem("coachId", res.coachId);
  localStorage.setItem("coachName", res.coachName);
  router.push("/coach/dashboard");
} else {
  setError(res.message || "Login failed");
}

  }

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <form
        onSubmit={handleSubmit}
        className="bg-gray-800 p-8 rounded-xl shadow-lg w-96 flex flex-col gap-6"
      >
        <h2 className="text-2xl font-bold text-white text-center">Coach Login</h2>

        {error && (
          <p className="text-red-500 text-center font-medium">{error}</p>
        )}

        {/* Email field */}
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Password field */}
        <div className="relative">
          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full pl-10 pr-3 py-2 rounded-md border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500"
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={loading}
          className="bg-orange-500 hover:bg-orange-600 transition text-white py-2 rounded-md font-semibold flex items-center justify-center gap-2"
        >
          {loading && (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
          )}
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Forgot password link */}
        <p className="text-sm text-gray-400 text-center">
          Forgot password?{" "}
          <a href="#" className="text-orange-500 hover:underline">
            Reset
          </a>
        </p>
      </form>
    </div>
  );
}
