import { useState } from "react";
import AuthLayout from "../components/AuthLayout";
import { supabase } from "../lib/supabase";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // ✅ ERROR STATE
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const login = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    setLoading(true);

    // ADMIN LOGIN (LOCAL)
    if (email === "admin@gmail.com" && password === "123456") {
      navigate("/admin");
      return;
    }

    // EMPLOYEE LOGIN (SUPABASE)
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      setError("Invalid email or password");
      return;
    }

    navigate("/employee");
  };

  return (
    <AuthLayout
      left={
        <>
          <h2 className="text-3xl font-bold mb-1">Hello 👋</h2>
          <p className="text-gray-500 mb-6">
            Sign in to your Retail MS account
          </p>

          <div className="space-y-4">
            <input
              className="w-full px-5 py-3 rounded-full shadow
              focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full px-5 py-3 rounded-full shadow
              focus:ring-2 focus:ring-purple-500 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {/* ✅ ERROR MESSAGE */}
            {error && (
              <p className="text-sm text-red-600 text-center">
                {error}
              </p>
            )}

           
            <button
              onClick={login}
              disabled={loading}
              className={`w-full py-3 rounded-full font-semibold text-white
              bg-gradient-to-r from-purple-600 to-indigo-600
              hover:scale-105 transition
              ${loading ? "opacity-70 cursor-not-allowed" : ""}`}
            >
              {loading ? "Signing in..." : "SIGN IN"}
            </button>

           
          </div>
        </>
      }
      right={
        <>
          <h1 className="text-4xl font-bold mb-4">
            Welcome to Retail MS
          </h1>
          <p className="text-purple-100 leading-relaxed">
            Manage sales, inventory, employees and reports
            from one powerful retail management system.
          </p>
        </>
      }
    />
  );
}
