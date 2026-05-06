import React, { useState, useContext } from "react";
import axios from "axios";
import { authDataContext } from "../../context/authContext";
import { useNavigate } from "react-router-dom";
import logo from "../assets/samasya_setu_icon_only.svg";


const Register = () => {
  const { serverUrl } = useContext(authDataContext);
  const navigate = useNavigate();
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [state, setState] = useState("");
  const [city, setCity] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const states = [
    "Andhra Pradesh",
    "Arunachal Pradesh",
    "Assam",
    "Bihar",
    "Chhattisgarh",
    "Goa",
    "Gujarat",
    "Haryana",
    "Himachal Pradesh",
    "Jharkhand",
    "Karnataka",
    "Kerala",
    "Madhya Pradesh",
    "Maharashtra",
    "Manipur",
    "Meghalaya",
    "Mizoram",
    "Nagaland",
    "Odisha",
    "Punjab",
    "Rajasthan",
    "Sikkim",
    "Tamil Nadu",
    "Telangana",
    "Tripura",
    "Uttar Pradesh",
    "Uttarakhand",
    "West Bengal",
    "Delhi",
    "Jammu & Kashmir",
    "Ladakh",
    "Chandigarh",
  ];
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const result = await axios.post(
        serverUrl + "/api/user/register",
        { username, email, password, state, city },
        { withCredentials: true }
      );
      console.log("Register success:", result.data);
      navigate("/login");
    } catch (err) {
      setError(err.response?.data?.message || "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-zinc-900 ">
      <div className="bg-slate-900 w-full flex items-center ">
        <img src={logo} alt="" className="w-20 h-15" />
        <div className="flex flex-col">
          <h1 className="text-xl font-bold text-white decoration-zinc-400 underline">
            Samasya Setu
          </h1>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center pt-10">
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-800 p-7 rounded-lg w-96 flex flex-col gap-4"
        >
          <p className="text-white text-sm font-bold text-center">
            <span className="text-green-600">Welcome</span> to{" "}
            <span className="text-orange-500">SamasyaSetu </span>{" "}
          </p>
          <h1 className="text-white text-2xl font-bold text-center">
            Register your account
          </h1>

          {error && <p className="text-red-400 text-sm text-center">{error}</p>}

          <input
            type="text"
            name="Username"
            placeholder="Username"
            onChange={(e) => setUserName(e.target.value)}
            value={username}
            className="p-2 rounded bg-zinc-700 text-white outline-none placeholder:text-white"
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className="p-2 rounded bg-zinc-700 text-white outline-none placeholder:text-white"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className="p-2 rounded bg-zinc-700 text-white outline-none placeholder:text-white "
            required
          />
          <select
            name="state"
            onChange={(e) => setState(e.target.value)}
            value={state}
            className="p-2 rounded bg-zinc-700 text-white outline-none w-full cursor-pointer"
            style={{ maxHeight: "45px" }}
            required
          >
            <option value="">-- Select State --</option>
            {states.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>

          <input
            type="text"
            name="city"
            placeholder="City"
            onChange={(e) => setCity(e.target.value)}
            value={city}
            className="p-2 rounded bg-zinc-700 text-white outline-none placeholder:text-white "
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
          >
            {loading ? "Registering..." : "Register"}
          </button>

          <p className="text-zinc-400 text-sm text-center">
            Already have an account ?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-blue-400 cursor-pointer"
            >
              Login
            </span>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;
