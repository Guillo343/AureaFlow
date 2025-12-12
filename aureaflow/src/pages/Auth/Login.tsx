import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signInWithEmail } from "../../lib/Auth";

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { error } = await signInWithEmail(email, password);

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-[#151515] p-8 rounded-2xl shadow-xl border border-white/10"
      >
        <h1 className="text-3xl font-semibold text-white text-center mb-6">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Sign in to continue to AureaFlow
        </p>

        <form className="space-y-5" onSubmit={handleLogin}>
          {errorMsg && (
            <p className="text-red-400 text-sm text-center">{errorMsg}</p>
          )}

          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
              placeholder="Enter your email"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
              placeholder="Enter your password"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-white font-semibold disabled:opacity-50"
          >
            {loading ? "Signing In..." : "Sign In"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Don't have an account?{" "}
          <Link
            to="/signup"
            className="text-indigo-400 hover:text-indigo-300 transition"
          >
            Create one
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
