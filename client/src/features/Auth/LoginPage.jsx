import { useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useLoginUserMutation } from "./authApiSlice";
import { FaMusic } from "react-icons/fa";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { loginSchema } from "../../utils/schema";
import { Helmet } from "react-helmet-async";

const LoginPage = () => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const selectedTheme = useSelector((state) => state.theme);
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
    <section className=" text-gray-100 h-full">
      <Helmet prioritizeSeoTags>
        <title>{`Log in - Neon Music`}</title>
        <link rel="canonical" href={`https://neon-music.vercel.app/login`} />
        <meta
          name="description"
          content="Log in to Neon Music to enjoy exclusive content and features. Our secure login process ensures that your personal information is protected."
        />
        <meta property="og:title" content="Log in - Neon Music" />
        <meta
          property="og:url"
          content={`https://neon-music-server.vercel.app/login`}
        />
        <meta
          property="og:description"
          content={`Log in to Neon Music to enjoy exclusive content and features. Our secure login process ensures that your personal information is protected.`}
        />
        <meta name="twitter:title" content="Log in - Neon Music" />
        <meta
          name="twitter:description"
          content="Log in to Neon Music to enjoy exclusive content and features. Our secure login process ensures that your personal information is protected."
        />
      </Helmet>
      <div className="flex flex-col justify-center h-full max-w-[768px] m-auto">
        <div className="mb-8">
          <span
            className={`text-xs flex gap-1 items-center mb-2 tracking-widest drop-shadow-md font-bold contrast-100`}
          >
            <span className="filter-none">
              <FaMusic className={`text-${selectedTheme} `} />
            </span>
            <span className="saturate-200">Neon Music</span>
          </span>
          <h1 className="text-4xl md:text-6xl font-bold">Log in</h1>
        </div>
        <div className="flex flex-col w-full gap-2 p-1">
          <div className="w-full">
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block mb-1">Username</label>
                <input
                  type="text"
                  name="username"
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  className="w-full bg-gray-200 rounded-md focus:outline-none focus:outline-gray-600 focus:-outline-offset-1 p-2  text-primary"
                  required
                />
                {validationErrors.username && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.username}
                  </span>
                )}
              </div>
              <div className="mb-4">
                <label className="block mb-1">Password</label>
                <input
                  type="password"
                  name="password"
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  className="w-full bg-gray-200 rounded-md focus:outline-none focus:outline-gray-600 focus:-outline-offset-1 p-2  text-primary"
                  required
                />
                {validationErrors.password && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {validationErrors.password}
                  </span>
                )}
              </div>
              <div className="mb-6">
                <button
                  type="submit"
                  className={`bg-${selectedTheme} ${
                    !isLoading
                      ? `hover:bg-${selectedTheme}-50 active:translate-y-[1px]`
                      : `bg-opacity-50 cursor-not-allowed`
                  } w-full text-white text-center font-bold py-2 px-4 rounded`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <AiOutlineLoading3Quarters className="animate-spin m-auto text-2xl text-gray-400" />
                  ) : (
                    `Log in`
                  )}
                </button>
                {isError && (
                  <span className="block text-sm mt-2 saturate-100 text-red-500">
                    {error?.data?.message ||
                      error?.data?.error?.details[0].message}
                  </span>
                )}
              </div>
              <div className="text-center">
                <span>New to Neon Music?</span>{" "}
                <Link
                  to={{
                    pathname: `/signup`,
                    state: { from: location.pathname },
                  }}
                  className={`text-${selectedTheme}-50`}
                >
                  Sign up now!
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginPage;
