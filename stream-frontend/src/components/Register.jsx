import { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router";
import { sendOtp } from "../api/auth.api";

const Register = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();

  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (!newUser.email.trim()) return;
    setIsLoading(true);
    try {
      localStorage.setItem("pendingUser", JSON.stringify(newUser));
      await sendOtp(newUser.email);
      navigate(
        `/auth/verify-otp?email=${encodeURIComponent(newUser.email.trim())}`,
      );
    } catch (error) {
      if (
        error.response.status === 404 ||
        error.response.data === "User Exists with the email"
      ) {
        alert(error.response.data);
        return;
      }
      console.error("Failed to send OTP:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <h2 className="text-white text-3xl font-bold mb-2 tracking-wide text-center">
        SIGN UP
      </h2>
      <p className="text-gray-400 mb-8 text-center">Create your new account!</p>

      <form onSubmit={handleSignupSubmit} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Username"
          name="name"
          value={newUser.name}
          onChange={onChangeHandler}
          className="hover-theme border border-gray-700 rounded-md p-3.5 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <input
          type="email"
          placeholder="Email"
          name="email"
          value={newUser.email}
          onChange={onChangeHandler}
          className="hover-theme border border-gray-700 rounded-md p-3.5 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <div className="relative w-full">
          <input
            type={showPassword ? "password" : "text"}
            placeholder="Password"
            name="password"
            value={newUser.password}
            onChange={onChangeHandler}
            className="hover-theme border border-gray-700 rounded-md p-3.5 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-600 rounded-sm cursor-pointer flex items-center justify-center text-white text-xs"
          >
            •••
          </span>
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="body-theme border border-gray-500 text-gray-400 rounded-md py-3 w-full text-base font-semibold transition-all duration-300 hover:border-white hover:text-white mt-5 flex items-center justify-center disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              {/* Simple Tailwind spinner */}
              <span className="animate-spin inline-block w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-3"></span>
              SENDING OTP...
            </>
          ) : (
            "SEND OTP"
          )}
        </button>
      </form>

      <>
        <div className="flex justify-center gap-6 my-8 text-gray-500 text-2xl">
          <a href="#" className="hover:text-white transition-colors">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white transition-colors">
            <FaGoogle />
          </a>
        </div>

        <p className="text-gray-400 text-center">
          Already have an account?
          <span
            onClick={() => navigate("/auth")}
            className="text-grade cursor-pointer font-bold hover:underline ml-1"
          >
            Sign In
          </span>
        </p>
      </>
    </>
  );
};

export default Register;
