import getDaysInMonth from "date-fns/getDaysInMonth/index";
import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer";
import Header from "../Header";

const Dashboard = () => {
  const dashboardMenu = (
    <>
      <li>
        <Link to={"/"}>Overview</Link>
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
      <li>
        <Link to={"/add-family-member"}>Add Family Member</Link>
      </li>
      <li>
        <Link to={"/all-family-member"}>All Family Member</Link>
      </li>
    </>
  );

  return (
    <>
      <Header></Header>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-side-menu"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
          {/* <!-- Page content here --> */}
        </div>
        <div className="drawer-side">
          <label
            htmlFor="dashboard-side-menu"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
            {dashboardMenu}
          </ul>
        </div>
      </div>
      <Footer></Footer>
    </>
  );
};

export default Dashboard;
