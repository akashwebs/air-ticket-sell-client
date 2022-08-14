import logo from "./logo.svg";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import RequireAuth from "./Hooks/RequireAuth";
import Header from "./Pages/Header";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Overview from "./Pages/Dashboard/Overview";
import AddDonor from "./Pages/Dashboard/AddDonor";
import AddBanner from "./Pages/Dashboard/AddBanner";
import BannerList from "./Pages/Dashboard/BannerList";
import DonnerList from "./Pages/Dashboard/DonnerList";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route path="overview" element={<Overview></Overview>}></Route>
          <Route path="donor" element={<AddDonor></AddDonor>}></Route>
          <Route path="addbanner" element={<AddBanner></AddBanner>}></Route>
          <Route path="bannerlist" element={<BannerList></BannerList>}></Route>
          <Route path="donnerlist" element={<DonnerList></DonnerList>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup" element={<Signup></Signup>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
