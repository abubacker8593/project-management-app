import React from "react";
import { FaUser, FaMoon } from "react-icons/fa";
import { User, Moon, LogOut } from "lucide-react";
import { useDispatch } from "react-redux";
import themeReducer, { toggleTheme } from "../redux/features/themeslice";
import { logout } from "../redux/features/authslice";
import { useNavigate } from "react-router-dom";
function NavBar() {
  let dispatch = useDispatch();
  let navigate = useNavigate()

  return (
    <div className="flex justify-between items-center px-[6%] py-[3%] bg-white-200 dark:bg-black dark:text-white text-black">
      <h1 className="text-2xl font-medium dark:text-white text-cyan-950">
        {" "}
        DashBoard
      </h1>

      <div className="flex gap-5 mr-[8%] cursor-pointer">
        <div className="cursor-pointer  relative group ">
          <User />
          <div className="hidden group-hover:block  absolute right-0 top-full">
            <button className="cursor-pointer bg-gray-400 px-2 py-1 rounded-sm mt-1 hover:text-white" onClick={()=>{navigate("/Profile")}}>
              Profile
            </button>
            <button
              className="cursor-pointer bg-gray-400 px-2 py-1 rounded-sm mt-1 hover:text-white"
              onClick={() => {
                dispatch(logout());

              }}
            >
              Logout
            </button>
          </div>
        </div>

        <button
          onClick={() => {
            dispatch(toggleTheme());
          }}
          className="cursor-pointer"
        >
          <Moon />
        </button>
      </div>
    </div>
  );
}

export default NavBar;
