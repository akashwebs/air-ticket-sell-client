import { signOut } from "firebase/auth";
import React from "react";
import auth from "../firebase.init";
import logo from "../asstes/logo.png";
import { Link } from "react-router-dom";


const Header = () => {
  return (
    <div class="navbar px-3 md:px-16 bg-slate-600 ">
      <div class="flex-1">
        <div class="drawer-content">
          <label
            for="dashboard-side-menu"
            class="btn btn-circle swap mr-5 lg:hidden swap-rotate drawer-button"
          >
            <input type="checkbox" />

            <svg
              class="swap-off fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
            </svg>

            <svg
              class="swap-on fill-current"
              xmlns="http://www.w3.org/2000/svg"
              width="32"
              height="32"
              viewBox="0 0 512 512"
            >
              <polygon points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
            </svg>
          </label>
        </div>

        <Link to={'/'} class="text-white normal-case text-2xl">Dashboard</Link>
      </div>
      <div class="flex-none">
        <div class="dropdown dropdown-end">
          <label tabindex="0" class="btn btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
              <img src={logo} />
            </div>
          </label>
          <ul
            tabindex="0"
            class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li className="font-bold">
              <button onClick={() => signOut(auth)}>Log Out</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
