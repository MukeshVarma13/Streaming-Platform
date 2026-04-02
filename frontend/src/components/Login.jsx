import { useState } from "react";
import { FaFacebookF, FaGoogle, FaTwitter } from "react-icons/fa";
import { useNavigate } from "react-router";
import { login } from "../services/StreamService";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const loginToken = await login(user);
      localStorage.setItem("token", "Bearer " + loginToken.token);
      window.location.href = "/";
    } catch (err) {
      alert(err.message);
    }
  };

  const onChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((user) => ({ ...user, [name]: value }));
  };

  return (
    <>
      <h2 className="text-white text-3xl font-bold mb-2 tracking-wide text-center">
        LOGIN
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        Please enter your login and password!
      </p>
      <form onSubmit={handleLoginSubmit} className="flex flex-col gap-5">
        <input
          type="email"
          placeholder="Email"
          value={user.email}
          name="email"
          onChange={onChangeHandler}
          className="hover-theme border border-gray-700 rounded-md p-3.5 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          required
        />
        <div className="relative w-full">
          <input
            type={`${showPassword ? "password" : "text"}`}
            placeholder="Password"
            value={user.password}
            onChange={onChangeHandler}
            name="password"
            className="hover-theme border border-gray-700 rounded-md p-3.5 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
          <span
            onClick={() => {
              setShowPassword(!showPassword);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-gray-600 rounded-sm cursor-pointer flex items-center justify-center text-white text-xs"
          >
            •••
          </span>
        </div>
        <a
          href="#"
          className="text-grade text-sm self-end hover:underline -mt-2"
        >
          Forgot password?
        </a>
        <button
          type="submit"
          className="body-theme border border-gray-500 text-gray-400 rounded-md py-3 w-full text-base font-semibold transition-all duration-300 hover:border-white hover:text-white mt-5"
        >
          SIGN IN
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
          Don't have an account
          <span
            onClick={() => {
              navigate("sign-up");
            }}
            className="text-grade cursor-pointer font-bold hover:underline ml-1"
          >
            Sign Up
          </span>
        </p>
      </>
    </>
  );
};

export default Login;
