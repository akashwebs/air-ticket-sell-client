import React from "react";
import { Link, Outlet } from "react-router-dom";
import Footer from "../../Shared/Footer";
import Header from "../Header";

const Dashboard = () => {
  const dashboardMenu = (
    <>
      <li>
        <Link to={"/"}>Add Sell</Link>
      </li>
      <li>
        <Link to={"/all-sell"}>All Sell</Link>
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
        <div className="drawer-content px-3 md:px-0">
          <Outlet></Outlet>
          {/* <!-- Page content here --> */}
        </div>
        <div className="drawer-side ">
          <label for="dashboard-side-menu" className="drawer-overlay"></label>
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
