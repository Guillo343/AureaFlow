import { motion } from "framer-motion";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { signUpWithEmail } from "../../lib/Auth";
import { supabase } from "../../lib/supabaseClient";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function SignUp() {
  const navigate = useNavigate();
  const {user} = useAuth();

  if (user) {
    return <Navigate to="/dashboard" replace />;
  }

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSignUp(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    const { data, error } = await signUpWithEmail(email, password);

    if (error) {
      setErrorMsg(error.message);
      setLoading(false);
      return;
    }

    const user = data.user;

    // Guardamos full name en profiles
    await supabase.from("profiles").insert({
      id: user?.id,
      full_name: fullName,
    });

    navigate("/dashboard");
  }

  return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: "easeOut" }}
        className="w-full max-w-md bg-[#151515] p-8 rounded-2xl shadow-xl border border-white/10">
        <h1 className="text-3xl font-semibold text-white text-center mb-6">
          Create Account
        </h1>
        <p className="text-gray-400 text-center mb-8">
          Start your journey with AureaFlow
        </p>

        <form className="space-y-5" onSubmit={handleSignUp}>
          {errorMsg && (
            <p className="text-red-400 text-sm text-center">{errorMsg}</p>
          )}

          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">
              Full Name
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
              placeholder="John Doe"/>
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">
              Email
            </label>
            <input
              type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email"
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"
            />
          </div>

          <div>
            <label className="block text-gray-300 mb-1 text-sm font-medium">
              Password
            </label>
            <input
              type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Create a password"
              className="w-full px-4 py-3 bg-[#0f0f0f] border border-white/10 rounded-lg text-white focus:outline-none focus:border-indigo-500 transition"/>
          </div>

          <button
            type="submit" disabled={loading}
            className="w-full py-3 mt-4 bg-indigo-600 hover:bg-indigo-500 transition rounded-lg text-white font-semibold disabled:opacity-50">
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <Link
            to="/login"
            className="text-indigo-400 hover:text-indigo-300 transition">
            Sign in
          </Link>
        </p>
      </motion.div>
    </div>
  );
}
