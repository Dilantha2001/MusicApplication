import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "./authApiSlice";
import { FaMusic, FaUser, FaLock } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { loginSchema } from "../../utils/schema";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const selectedTheme = useSelector((state) => state.theme);
  const themeColor = selectedTheme === "pop" ? "rock" : selectedTheme; // Default to rock for cinematic green feel if pop
  const [validationErrors, setValidationErrors] = useState({});
  const [login, { isLoading, isError, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = loginSchema.validate(formData, {
      abortEarly: false,
      allowUnknown: false,
      stripUnknown: false,
    });

    if (error) {
      const errors = {};
      error.details.forEach(
        (detail) => (errors[detail.path[0]] = detail.message),
      );
      setValidationErrors(errors);
      return;
    }

    try {
      const { error } = await login(formData);
      if (error) {
        console.error(error);
      } else {
        if (location?.state?.from === "/signup") {
          navigate("/");
        } else {
          navigate(-1);
        }
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-10">
      <Helmet prioritizeSeoTags>
        <title>{`Log in - Neon Music`}</title>
        <link rel="canonical" href={`https://neon-music.vercel.app/login`} />
        <meta
          name="description"
          content="Log in to Neon Music to enjoy exclusive content and features. Our secure login process ensures that your personal information is protected."
        />
      </Helmet>

      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-80 h-80 bg-rock/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="glass-card p-8 md:p-10 rounded-[40px] shadow-2xl">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rock/20 border border-rock/30 mb-6"
            >
              <FaMusic className="text-3xl text-rock animate-float" />
            </motion.div>
            <h1 className="text-4xl font-black text-white font-outfit tracking-tighter mb-2">
              Welcome Back
            </h1>
            <p className="text-white/40 font-medium">
              Enter your credentials to access your audio logs.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 ml-1">
                Username
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaUser className="text-white/20 group-focus-within:text-rock transition-colors" />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-rock/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
              <AnimatePresence>
                {validationErrors.username && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="block text-xs text-rock ml-1"
                  >
                    {validationErrors.username}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 ml-1">
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-white/20 group-focus-within:text-rock transition-colors" />
                </div>
                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-rock/50 focus:bg-white/10 transition-all"
                  required
                />
              </div>
              <AnimatePresence>
                {validationErrors.password && (
                  <motion.span
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="block text-xs text-rock ml-1"
                  >
                    {validationErrors.password}
                  </motion.span>
                )}
              </AnimatePresence>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`
                relative w-full py-4 rounded-2xl font-black font-outfit uppercase tracking-widest text-xs
                bg-rock text-white shadow-xl shadow-rock/20 overflow-hidden
                ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-rock/40"}
                transition-all duration-300
              `}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin m-auto text-xl" />
              ) : (
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Initiate Session
                </span>
              )}
              {/* Button Glow Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            </motion.button>

            {isError && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="p-4 rounded-xl bg-rock/10 border border-rock/20 text-rock text-xs text-center"
              >
                {error?.data?.message || error?.data?.error?.details[0].message || "Authentication failed"}
              </motion.div>
            )}
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-white/30 text-xs font-medium uppercase tracking-wider">
              New to the system?{" "}
              <Link
                to="/signup"
                className="text-rock hover:text-rock-50 hover:underline underline-offset-4 transition-colors ml-1 font-bold"
              >
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default LoginPage;
