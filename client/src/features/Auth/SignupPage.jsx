import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useRegisterUserMutation } from "./authApiSlice";
import { FaMusic, FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import { AiOutlineEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { signUpSchema } from "../../utils/schema";
import { Helmet } from "react-helmet-async";
import { motion, AnimatePresence } from "framer-motion";

const SignupPage = () => {
  const selectedTheme = useSelector((state) => state.theme);
  const themeColor = selectedTheme === "pop" ? "rock" : selectedTheme;
  const navigate = useNavigate();
  const location = useLocation();
  const [signUp, { isLoading, isError, error }] = useRegisterUserMutation();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [validationErrors, setValidationErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const { error } = signUpSchema.validate(formData, {
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
      const { error } = await signUp(formData);
      if (error) {
        console.error(error);
      } else {
        navigate("/");
      }
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="relative min-h-[90vh] flex items-center justify-center overflow-hidden py-10">
      <Helmet prioritizeSeoTags>
        <title>{`Sign up - Neon Music`}</title>
        <link rel="canonical" href={`https://neon-music.vercel.app/signup`} />
        <meta
          name="description"
          content={`Sign up to enjoy exclusive content and features on Neon Music. Our secure sign-up process ensures that your personal information is protected.`}
        />
      </Helmet>

      {/* Cinematic Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -right-20 w-80 h-80 bg-rock/20 rounded-full blur-[120px] animate-pulse-slow" />
        <div className="absolute bottom-1/4 -left-20 w-96 h-96 bg-neon-cyan/10 rounded-full blur-[100px]" />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 w-full max-w-lg px-6"
      >
        <div className="glass-card p-8 md:p-10 rounded-[40px] shadow-2xl">
          {/* Logo & Header */}
          <div className="text-center mb-10">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ delay: 0.2, type: "spring" }}
              className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-rock/20 border border-rock/30 mb-6"
            >
              <FaMusic className="text-3xl text-rock animate-float" />
            </motion.div>
            <h1 className="text-4xl font-black text-white font-outfit tracking-tighter mb-2">
              Join the Future
            </h1>
            <p className="text-white/40 font-medium">
              Create your account to sync your audio experience across the network.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Username */}
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
                    placeholder="UserID"
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-rock/50 focus:bg-white/10 transition-all text-sm"
                    required
                  />
                </div>
                {validationErrors.username && (
                  <span className="block text-[10px] text-rock ml-1">{validationErrors.username}</span>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 ml-1">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <FaEnvelope className="text-white/20 group-focus-within:text-rock transition-colors" />
                  </div>
                  <input
                    type="email"
                    placeholder="email@network.com"
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-3.5 pl-11 pr-4 text-white placeholder-white/20 focus:outline-none focus:border-rock/50 focus:bg-white/10 transition-all text-sm"
                    required
                  />
                </div>
                {validationErrors.email && (
                  <span className="block text-[10px] text-rock ml-1">{validationErrors.email}</span>
                )}
              </div>
            </div>

            {/* Password */}
            <div className="space-y-2">
              <label className="text-[10px] uppercase tracking-[0.2em] font-bold text-white/50 ml-1">
                Access Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaLock className="text-white/20 group-focus-within:text-rock transition-colors" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full bg-white/5 border border-white/10 rounded-2xl py-4 pl-11 pr-12 text-white placeholder-white/20 focus:outline-none focus:border-rock/50 focus:bg-white/10 transition-all"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/20 hover:text-white transition-colors"
                >
                  {showPassword ? <AiOutlineEye size={20} /> : <AiOutlineEyeInvisible size={20} />}
                </button>
              </div>
              {validationErrors.password && (
                <span className="block text-[10px] text-rock ml-1">{validationErrors.password}</span>
              )}
            </div>

            {/* Terms (Implicit) */}
            <p className="text-[10px] text-center text-white/20 font-medium px-4">
              By initiating registration, you agree to our Protocol of Conduct and Privacy Safeguards.
            </p>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={isLoading}
              className={`
                relative w-full py-4 rounded-2xl font-black font-outfit uppercase tracking-widest text-xs
                bg-rock text-white shadow-xl shadow-rock/20 overflow-hidden mt-4
                ${isLoading ? "opacity-70 cursor-not-allowed" : "hover:shadow-rock/40"}
                transition-all duration-300
              `}
            >
              {isLoading ? (
                <AiOutlineLoading3Quarters className="animate-spin m-auto text-xl" />
              ) : (
                "Initialize Registration"
              )}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full hover:animate-[shimmer_2s_infinite] pointer-events-none" />
            </motion.button>

            {isError && (
              <div className="p-4 rounded-xl bg-rock/10 border border-rock/20 text-rock text-center text-xs">
                {error?.data?.message || error?.data?.error?.details[0].message || "Registration failed"}
              </div>
            )}
          </form>

          {/* Footer Link */}
          <div className="mt-8 text-center">
            <p className="text-white/30 text-xs font-medium uppercase tracking-wider">
              Existing user in logs?{" "}
              <Link
                to="/login"
                className="text-rock hover:text-rock-50 hover:underline underline-offset-4 transition-colors ml-1 font-bold"
              >
                Access Session
              </Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SignupPage;
