import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "@/lib/api";
import { useEffect } from "react";

export default function LoginPage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
  const token = localStorage.getItem("token");

  if (token) {
    navigate("/admin", { replace: true });
  }
}, [navigate]);

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    setLoading(true);
    setError("");

    const res = await api.post("/auth/login", {
      email,
      password,
    });

    const { token, admin } = res.data.data;

    localStorage.setItem("token", token);
    localStorage.setItem("admin", JSON.stringify(admin));

    navigate("/admin");
  } catch (err: any) {
    setError(
      err.response?.data?.message || "Invalid email or password."
    );
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h1 className="mb-2 text-center text-3xl font-bold">
          Admin Login
        </h1>

        <p className="mb-8 text-center text-gray-500">
          Sign in to access the dashboard
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-2 block font-medium">
              Email
            </label>

            <input
              type="email"
              placeholder="admin@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>

          <div>
            <label className="mb-2 block font-medium">
              Password
            </label>

            <input
              type="password"
              placeholder="********"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border px-4 py-3 outline-none transition focus:border-blue-600"
            />
          </div>

          {error && (
            <div className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-md bg-blue-600 py-3 font-medium text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-blue-400"
          >
            {loading ? "Signing In..." : "Login"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <Link
            to="/"
            className="text-blue-600 transition hover:underline"
          >
            ← Back to Website
          </Link>
        </div>
      </div>
    </div>
  );
}