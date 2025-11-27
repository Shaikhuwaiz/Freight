import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // ✅ Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/dashboard", { replace: true });
    }
  }, [navigate]);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await fetch("http://localhost:7000/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Registration failed");
        return;
      }

      setSuccess("Registration successful! Redirecting...");

      // ✅ Replace history so back button won't return here
      setTimeout(() => {
        navigate("/", { replace: true });
      }, 1200);

    } catch (err) {
      console.error(err);
      setError("Server error");
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* LEFT SECTION */}
      <div className="relative w-3/5 hidden lg:flex flex-col justify-center items-start p-16 text-white">
        <video autoPlay loop muted playsInline className="absolute inset-0 w-full h-full object-cover">
          <source src="/videos/video1.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/50 to-transparent" />
        <div className="relative z-10 max-w-lg translate-y-8">
          <h1 className="text-5xl font-extrabold mb-4 drop-shadow-lg">
            Join <span className="text-yellow-400">Talaria</span>
          </h1>
          <p className="text-lg text-gray-200 leading-relaxed">
            Become part of our delivery network. Create your account to manage
            shipments, track packages, and grow your business with us.
          </p>
        </div>
      </div>

      {/* RIGHT SECTION */}
      <div className="flex w-full lg:w-2/5 items-center justify-center bg-gradient-to-br from-[#1a1c2c] via-[#222b3a] to-[#1a1f2f]">
        <div className="relative bg-white/15 backdrop-blur-2xl border border-white/25 rounded-2xl 
                        shadow-2xl p-10 w-80 sm:w-96 text-white text-center">

          <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-sm">
            Create Account
          </h2>

          {error && <p className="text-red-400 text-sm mb-3">{error}</p>}
          {success && <p className="text-green-400 text-sm mb-3">{success}</p>}

          <form onSubmit={handleRegister} className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/20 border border-white/40 text-white 
                         placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full p-3 rounded-lg bg-white/20 border border-white/40 text-white 
                         placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />

            <button
              type="submit"
              className="w-full py-3 bg-yellow-400/90 hover:bg-yellow-500 text-black font-semibold rounded-lg 
                         transition-all shadow-lg"
            >
              Register
            </button>
          </form>

          <p className="text-sm mt-4 text-gray-200">
            Already have an account?{" "}
            <Link to="/" className="text-yellow-300 hover:underline">
              Login here
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}
