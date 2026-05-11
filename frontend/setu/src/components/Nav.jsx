import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/samasya_setu_icon_only.svg";
import { MdOutlineMenu } from "react-icons/md";
import { authDataContext } from "../../context/authContext";
import { userDataContext } from "../../context/userContext";
import axios from "axios";

const Nav = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { serverUrl } = useContext(authDataContext);
  const { userData, setUserData } = useContext(userDataContext);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      await axios.post(
        serverUrl + "/api/user/logout",
        {},
        { withCredentials: true }
      );
      setUserData(null);
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error.response?.data || error.message);
    }
  };

  return (
    <div className="bg-[#0f6e56] shadow-sm w-full relative">
      <div className="flex justify-between items-center px-4 py-1">
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => navigate("/")}
        >
          <img src={logo} alt="logo" className="w-20 h-14" />
          <h1 className="text-xl font-bold text-white bg-[#0f6e56]">
            SamasyaSetu
          </h1>
        </div>
        <div>
          <MdOutlineMenu
            className="text-2xl cursor-pointer text-white"
            onClick={() => setShowMenu(!showMenu)}
          />
        </div>
      </div>

      {showMenu && (
        <ul className="w-50 flex flex-col gap-3 absolute top-16 right-8 bg-emerald-900 p-5 rounded-lg z-50">
          
          {/* Profile — sabko dikhao */}
          <li>
            <Link
              to="/profile"
              className="text-white hover:text-orange-400"
              onClick={() => {
                navigate("/profile");
                setShowMenu(false);
              }}
            >
              Profile
            </Link>
          </li>

          {/* Report + — sirf user ko dikhao, admin ko nahi */}
          {userData && userData.role !== "admin" && (
            <li className="border-t border-slate-500 pt-3">
              <Link
                to="/issue"
                className="text-white hover:text-orange-400"
                onClick={() => {
                  navigate("/issue");
                  setShowMenu(false);
                }}
              >
                Report +
              </Link>
            </li>
          )}

          {/* My Issue — sirf user ko dikhao, admin ko nahi */}
          {userData && userData.role !== "admin" && (
            <li className="border-t border-slate-500 pt-3">
              <Link
                to="/myissue"
                className="text-white hover:text-orange-400"
                onClick={() => {
                  navigate("/myIssue");
                  setShowMenu(false);
                }}
              >
                My Issue
              </Link>
            </li>
          )}

          {/* About — sabko dikhao */}
          <li className="border-t border-slate-500 pt-3">
            <Link
              to="/about"
              className="text-white hover:text-orange-400"
              onClick={() => {
                navigate("/about");
                setShowMenu(false);
              }}
            >
              About
            </Link>
          </li>

          {/* Admin Panel — sirf admin ko dikhao */}
          {userData?.role === "admin" && (
            <li className="border-t border-slate-500 pt-3">
              <Link
                to="/admin"
                className="text-white hover:text-orange-400"
                onClick={() => setShowMenu(false)}
              >
                Admin Panel
              </Link>
            </li>
          )}

          {/* Login — sirf tab dikhao jab logged out ho */}
          {!userData && (
            <li className="border-t border-slate-500 pt-3">
              <button
                onClick={() => {
                  navigate("/login");
                  setShowMenu(false);
                }}
                className="text-red-400 hover:text-red-300 w-full text-left"
              >
                Login
              </button>
            </li>
          )}

          {/* Logout — sirf tab dikhao jab logged in ho */}
          {userData && (
            <li className="border-t border-slate-500 pt-3">
              <button
                onClick={logout}
                className="text-red-400 hover:text-red-300 w-full text-left"
              >
                Logout
              </button>
            </li>
          )}

        </ul>
      )}
    </div>
  );
};

export default Nav;