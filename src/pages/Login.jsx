import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../lib/api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  // eslint-disable-next-line no-undef
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/");
    }
  }, []);

  const handleLogin = async (event) => {
    event.preventDefault();
    if (!email || !password) {
      setErrorMessage("Email and password are required.");
      return;
    }
    try {
      const response = await login({ email, password });
      if (response.message === "Login successful") {
        setErrorMessage("");

        localStorage.setItem("user", JSON.stringify(response.user));
        navigate("/");
      } else {
        setErrorMessage(response?.response?.data?.message || "Login failed.");
      }
    } catch (error) {
      console.error("Login error:", error.message);
      setErrorMessage(error.message || "Failed to log in. Please try again.");
    }
  };

  return (
    <div className="flex flex-col justify-center items-center px-6 py-8 mx-auto bg-gray-100 md:h-screen">
      <div className="p-6 space-y-6 w-full bg-white rounded-lg border shadow sm:max-w-md">
        <p className="text-xl font-bold tracking-tight leading-tight text-center text-gray-900 md:text-2xl">
          Sign in to your account
        </p>
        <form className="space-y-4" onSubmit={handleLogin}>
          <div>
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Your email
            </label>
            <input
              type="email"
              name="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              placeholder="name@company.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="••••••••"
              className="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {errorMessage && (
            <p className="text-sm text-center text-red-600">{errorMessage}</p>
          )}
          <button
            type="submit"
            className="w-full text-white bg-gray-700 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Sign in
          </button>
          <p className="text-sm font-light text-center text-gray-500">
            Don’t have an account yet?{" "}
            <Link
              to="/signup"
              className="font-medium text-gray-700 hover:underline"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
