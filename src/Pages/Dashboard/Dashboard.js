import getDaysInMonth from "date-fns/getDaysInMonth/index";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Header from "../Header";

const Dashboard = () => {
  const dashboardMenu = (
    <>
      <li>
        <Link to={"/overview"}>Overview</Link>
      </li>
      <li>
        <Link to={"/donor"}>Add Donor</Link>
      </li>
      <li>
        <Link to={"/addbanner"}>Add Banner</Link>
      </li>
      <li>
        <Link to={"/bannerlist"}>Banner Setting</Link>
      </li>
      <li>
        <Link to={"/donnerlist"}>All Donner</Link>
      </li>
      <li>
        <Link to={"/add-notice"}>Add Notice</Link>
      </li>
      <li>
        <Link to={"/approved-request"}>Donner Request</Link>
      </li>
    </>
  );

  return (
    <>
      <Header></Header>
      <div class="drawer drawer-mobile">
        <input id="dashboard-side-menu" type="checkbox" class="drawer-toggle" />
        <div className="drawer-content">
          <Outlet></Outlet>
          {/* <!-- Page content here --> */}
        </div>
        <div class="drawer-side">
          <label for="dashboard-side-menu" class="drawer-overlay"></label>
          <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {dashboardMenu}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
