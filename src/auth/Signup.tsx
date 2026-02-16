import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const signup = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter email and password");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      if (error.message.toLowerCase().includes("already")) {
        setError("This email is already registered");
      } else if (error.message.toLowerCase().includes("email")) {
        setError("Please enter a valid email address");
      } else {
        setError("Unable to create account. Try again.");
      }
      return;
    }

    navigate("/admin");
  };

  return (
    <div className="h-full w-full grid grid-cols-1 md:grid-cols-2 overflow-hidden">
      
      {/* LEFT – FORM */}
      <div className="flex items-center justify-center bg-gray-50">
        <div className="w-full max-w-sm px-6">
          <h2 className="text-3xl font-semibold mb-1">
            Create Account
          </h2>
          <p className="text-gray-500 mb-6 text-sm">
            Access your retail management dashboard
          </p>

          <div className="space-y-4">
            <input
              className="w-full px-5 py-3 rounded-full shadow-sm
              border border-gray-200
              focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className="w-full px-5 py-3 rounded-full shadow-sm
              border border-gray-200
              focus:ring-2 focus:ring-indigo-500 outline-none"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            {error && (
              <p className="text-xs text-red-600 text-center">
                {error}
              </p>
            )}

            <button
              onClick={signup}
              disabled={loading}
              className={`w-full py-3 rounded-full font-medium text-white
              bg-indigo-600 hover:bg-indigo-700 transition
              ${loading ? "opacity-60 cursor-not-allowed" : ""}`}
            >
              {loading ? "Creating..." : "Create Account"}
            </button>
          </div>
        </div>
      </div>

      {/* RIGHT – ENHANCED MOON & CIRCLES DESIGN */}
      <div className="hidden md:flex items-center justify-center relative overflow-hidden bg-gradient-to-br from-slate-900 via-purple-900/90 to-violet-950">
        
        {/* Animated floating circles/moons */}
        <div className="absolute inset-0">
          {/* Large moon */}
          <div className="absolute top-1/4 right-1/4 w-72 h-72 rounded-full bg-gradient-to-br from-purple-300/10 to-pink-200/5 blur-xl"></div>
          
          {/* Medium circles */}
          <div className="absolute bottom-1/3 left-1/4 w-40 h-40 rounded-full bg-gradient-to-tr from-indigo-300/15 to-transparent blur-lg"></div>
          <div className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full bg-gradient-to-br from-violet-300/10 to-transparent blur-lg"></div>
          
          {/* Small floating dots */}
          <div className="absolute top-1/2 left-1/2 w-6 h-6 rounded-full bg-white/10 blur-sm"></div>
          <div className="absolute bottom-1/4 right-1/3 w-8 h-8 rounded-full bg-purple-300/15 blur-sm"></div>
          <div className="absolute top-1/4 left-1/4 w-4 h-4 rounded-full bg-indigo-300/20 blur-sm"></div>
          <div className="absolute bottom-1/2 right-1/4 w-5 h-5 rounded-full bg-white/10 blur-sm"></div>
          
          {/* Glowing orb */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 rounded-full bg-gradient-to-br from-purple-400/20 to-pink-300/10 blur-2xl"></div>
        </div>

        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "50px 50px",
          }}
        />

        <div className="relative max-w-md text-center px-10 z-10">
          <div className="mb-6">
            <div className="inline-block p-4 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-sm border border-white/10">
              <svg className="w-12 h-12 text-white mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13-7.748a4 4 0 11-5.392-5.392"></path>
              </svg>
            </div>
          </div>
          
          <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">
            Retail MS
          </h1>
          <p className="text-slate-300 text-sm leading-relaxed">
            A centralized platform for inventory, sales,
            and operational control designed for growing businesses.
          </p>
        </div>
      </div>

    </div>
  );
}