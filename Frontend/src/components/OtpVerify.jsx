import { useNavigate, useSearchParams } from "react-router";
import { register, verifyOtp } from "../services/StreamService";
import { useState } from "react";

const OtpVerify = () => {
  const [otp, setOtp] = useState("");
  const [searchParam] = useSearchParams();
  const email = searchParam.get("email");
  const navigate = useNavigate();

  const handleOtpVerify = async (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("pendingUser"));
    const res = await verifyOtp(user.email, otp);

    if (res !== "OTP verified.") {
      alert("Wrong OTP");
      return;
    }
    const response = await register(user);
    if (response) {
      localStorage.removeItem("pendingUser");
      alert("Register Successfully!")
      navigate("/auth");
    }
  };

  return (
    <>
      <h2 className="text-white text-3xl font-bold mb-2 tracking-wide text-center">
        VERIFY EMAIL
      </h2>
      <p className="text-gray-400 mb-8 text-center">
        An OTP has been sent to your email.
      </p>
      <form onSubmit={handleOtpVerify} className="flex flex-col gap-5">
        <input
          type="text"
          placeholder="Enter 6-Digit OTP"
          maxLength={6}
          onChange={(e) => setOtp(e.target.value)}
          className="hover-theme border border-gray-700 rounded-md p-3.5 text-white w-full placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-center tracking-[0.5em]"
          required
        />
        <button
          type="submit"
          className="body-theme border border-indigo-500 bg-indigo-500 text-white rounded-md py-3 w-full text-base font-semibold transition-all duration-300 hover:bg-indigo-600 mt-5"
        >
          VERIFY & SIGN UP
        </button>
      </form>
    </>
  );
};

export default OtpVerify;
