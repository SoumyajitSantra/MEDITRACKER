
import React, { useState } from "react";
import { Mail, Lock, User, Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 533.5 544.3">
    <path
      fill="#4285F4"
      d="M533.5 278.4c0-18.5-1.5-36.2-4.3-53.4H272v101h146.9c-6.4 34-25 62.8-53.2 82.2v68h86c50.3-46.4 79.8-114.7 79.8-197.8z"
    />
    <path
      fill="#34A853"
      d="M272 544.3c72.6 0 133.7-24.1 178.3-65.5l-86-68c-24 16-54.6 25.5-92.3 25.5-70.9 0-131-47.8-152.4-112.1h-89.6v70.8c44.2 87.6 134.1 149.3 242 149.3z"
    />
    <path
      fill="#FBBC05"
      d="M119.6 330.9c-10.3-30.6-10.3-63.4 0-94l-89.6-70.8c-39.7 77.4-39.7 169.8 0 247.2l89.6-82.4z"
    />
    <path
      fill="#EA4335"
      d="M272 107.7c38.6-.6 75.7 14.3 103.9 41.3l77.7-77.7C405.6 24.1 344.5 0 272 0 164.1 0 74.2 61.7 30 149.3l89.6 70.8C141 155.5 201.1 107.7 272 107.7z"
    />
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 320 512">
    <path
      fill="currentColor"
      d="M279.14 288l14.22-92.66h-88.91V117.28c0-25.35 12.42-50.06 52.24-50.06H293V3.4S273.12 0 256.36 0C184.53 0 140.35 40.42 140.35 115.56v80.78H52.89V288h87.46v224h104.9V288z"
    />
  </svg>
);


// ... GoogleIcon and FacebookIcon code stays same ...

const Auth = ({ setIsLoggedIn }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    setTimeout(() => {
      if (isLogin) {
        console.log("Login with:", { email, password });
      } else {
        console.log("Signup with:", { name, email, password });
      }
      setIsLoggedIn(true);
      localStorage.setItem("isLoggedIn", "true");
      setLoading(false);
      navigate("/"); // <-- redirect back to home
    }, 1200);
  };

  const handleGoogleSignIn = () => {
    console.log("Google Sign In clicked");
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  const handleFacebookSignIn = () => {
    console.log("Facebook Sign In clicked");
    setIsLoggedIn(true);
    localStorage.setItem("isLoggedIn", "true");
    navigate("/");
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden font-sans">
      {/* Background */}
      <div className="absolute inset-0 bg-meds-background -z-10"></div>

      {/* Auth Card */}
      <div className="w-full max-w-md relative z-10">
        <div className="backdrop-blur-md bg-white/80 rounded-3xl shadow-2xl p-8 border border-gray-200">
          <h2 className="text-4xl font-extrabold text-gray-900 text-center mb-2 tracking-wide">
            MediTracker
          </h2>
          <p className="text-center text-gray-700 mb-8">
            {isLogin ? "Welcome Back 👋" : "Join Us Today 🚀"}
          </p>

          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Full Name"
                  className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition caret-black selection:bg-blue-200"
                  required
                />
              </div>
            )}

            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email Address"
                className="w-full pl-12 pr-4 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition caret-black selection:bg-blue-200"
                required
              />
            </div>

            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={20}
              />
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full pl-12 pr-12 py-3 bg-white text-gray-900 placeholder-gray-400 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition caret-black selection:bg-blue-200"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center bg-red-100 p-3 rounded-xl">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 rounded-xl font-bold shadow-lg hover:scale-105 transform transition duration-200 disabled:opacity-50"
            >
              {loading ? "Please wait..." : isLogin ? "Sign In" : "Sign Up"}
            </button>
          </form>

          {/* OR separator */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-gray-300" />
            <span className="mx-3 text-gray-500">OR</span>
            <hr className="flex-grow border-t border-gray-300" />
          </div>

          {/* Social Logins */}
          <div className="flex flex-col gap-3">
            <button
              onClick={handleGoogleSignIn}
              className="flex items-center justify-center w-full py-3 rounded-xl bg-white text-gray-800 font-semibold shadow-md hover:shadow-lg hover:scale-105 transform transition duration-200"
            >
              <GoogleIcon className="mr-3" /> Sign in with Google
            </button>

            <button
              onClick={handleFacebookSignIn}
              className="flex items-center justify-center w-full py-3 rounded-xl bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:scale-105 transform transition duration-200"
            >
              <FacebookIcon className="mr-2" /> Sign in with Facebook
            </button>
          </div>

          {/* Toggle */}
          <div className="mt-6 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)} // <-- FIXED toggle
              className="text-blue-600 hover:text-blue-800 font-medium transition"
            >
              {isLogin
                ? "Don’t have an account? Sign Up"
                : "Already have an account? Sign In"}
            </button>
          </div>
        </div>
      </div>

      {/* Background Animation */}
      <style>
        {`
          .bg-meds-background {
            background-image: linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url('/medicine.png');
            background-size: cover;
            background-position: center;
            background-repeat: no-repeat;
            background-attachment: fixed;
            animation: zoomInOut 10s ease-in-out infinite alternate;
          }
          @keyframes zoomInOut {
            0% { transform: scale(1); }
            50% { transform: scale(1.08); }
            100% { transform: scale(1); }
          }
        `}
      </style>
    </div>
  );
};

export default Auth;
