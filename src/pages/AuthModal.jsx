import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function AuthModal({ isOpen, onClose, initialView }) {
    const navigate = useNavigate();
    const { setIsLoggedIn, setUserName, userName, goToCustomerAuthLogin } = useAuth();
  const [view, setView] = useState(initialView || "login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (isOpen) {
      setView(initialView || "login");
    }
  }, [isOpen, initialView]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          initial={{ scale: 0.9, y: 40 }}
          animate={{ scale: 1, y: 0 }}
          exit={{ scale: 0.9, y: 40 }}
          className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl"
        >
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-stone-500"
          >
            <X />
          </button>

          {/* LOGIN */}
          {view === "login" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Login</h2>

              <button
                onClick={goToCustomerAuthLogin}
                className="w-full bg-blue-600 text-white py-3 rounded-xl font-bold mb-4 hover:bg-blue-700 transition"
              >
                Login
              </button>

              <div className="relative mb-4">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-stone-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-stone-500">Or continue with email</span>
                </div>
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full mb-4 p-3 rounded-xl bg-stone-100 outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full mb-2 p-3 rounded-xl bg-stone-100 outline-none"
              />

              <button
                onClick={() => setView("forgot")}
                className="text-sm text-primary mb-4"
              >
                Forgot password?
              </button>

              <button
                onClick={() => {
                  const displayName = userName?.trim() ? userName : (email?.split("@")[0] || "User");
                  setUserName(displayName);
                  setIsLoggedIn(true);
                  onClose();
                }}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                Login
              </button>

              <p className="text-sm mt-4 text-center">
                Don't have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={goToCustomerAuthLogin}
                >
                  Sign up
                </span>
              </p>
            </>
          )}

          {/* SIGNUP */}
          {view === "signup" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Sign Up</h2>

              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="w-full mb-4 p-3 rounded-xl bg-stone-100 outline-none"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                className="w-full mb-4 p-3 rounded-xl bg-stone-100 outline-none"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                className="w-full mb-4 p-3 rounded-xl bg-stone-100 outline-none"
              />

              <button
                onClick={() => {
                  const displayName = name.trim() || email?.split("@")[0] || "User";
                  setUserName(displayName);
                  setIsLoggedIn(true);
                  onClose();
                  navigate("/");
                }}
                className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                Create Account
              </button>

              <p className="text-sm mt-4 text-center">
                Already have an account?{" "}
                <span
                  className="text-primary cursor-pointer"
                  onClick={() => setView("login")}
                >
                  Login
                </span>
              </p>
            </>
          )}

          {/* FORGOT PASSWORD */}
          {view === "forgot" && (
            <>
              <h2 className="text-2xl font-bold mb-6">Reset Password</h2>

              <input
                type="email"
                placeholder="Enter your email"
                className="w-full mb-4 p-3 rounded-xl bg-stone-100 outline-none"
              />

              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold">
                Send Reset Link
              </button>

              <p
                className="text-sm mt-4 text-center text-primary cursor-pointer"
                onClick={() => setView("login")}
              >
                Back to Login
              </p>
            </>
          )}
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}