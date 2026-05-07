import React, { useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../../context/authContext";
import { userDataContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/samasya_setu_icon_only.svg";

const Login = () => {
  const { serverUrl } = useContext(authDataContext);
  const { getCurrentUser } = useContext(userDataContext);
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(
        serverUrl + "/api/user/login", // ← /api/user → /api/auth
        { email, password },
        { withCredentials: true }
      );
      await getCurrentUser(); // ← await lagao
      navigate("/");
    } catch (error) {
      setError(error.response?.data?.message || "Error logging in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900">
      <div className="bg-slate-900 w-full flex items-center">
        <img src={logo} alt="" className="w-20 h-15" />
        <h1 className="text-xl font-bold text-white decoration-zinc-400 underline">
          Samasya Setu
        </h1>
      </div>
      <div className="flex flex-col justify-center items-center pt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 p-7 rounded-lg w-96 flex flex-col gap-4"
        >
          <p className="text-white text-sm font-bold text-center">
            <span className="text-green-600">Welcome</span> to{" "}
            <span className="text-orange-500">SamasyaSetu</span>
          </p>
          <h1 className="text-white text-2xl font-bold text-center">
            Login your account
          </h1>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <input
            type="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 rounded bg-zinc-700 text-white outline-none placeholder:text-white"
            required
          />
          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-2 rounded bg-zinc-700 text-white outline-none placeholder:text-white"
            required
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>

          <p className="text-zinc-400 text-sm text-center">
            Account nahi hai?{" "}
            <span
              onClick={() => navigate("/register")}
              className="text-blue-400 cursor-pointer"
            >
              Register
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;