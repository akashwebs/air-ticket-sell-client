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
import AddNotice from "./Pages/Dashboard/AddNotice";
import ApprovedRequest from "./Pages/Dashboard/ApprovedRequest";
import AddFamilyMember from "./Pages/Dashboard/AddFamilyMember";
import AllFamilyMember from "./Pages/Dashboard/AllFamilyMember";
import AddPost from "./Pages/Dashboard/AddPost";
import AllPost from "./Pages/Dashboard/AllPost";
import FamilyUpdateModal from "./Pages/Dashboard/FamilyUpdateModal";

function App() {
  return (
    <div className="px-2 md:px-0">
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Dashboard></Dashboard>
            </RequireAuth>
          }
        >
          <Route index element={<Overview></Overview>}></Route>
          <Route path="donor" element={<AddDonor></AddDonor>}></Route>
          <Route path="addbanner" element={<AddBanner></AddBanner>}></Route>
          <Route path="bannerlist" element={<BannerList></BannerList>}></Route>
          <Route path="donnerlist" element={<DonnerList></DonnerList>}></Route>
          <Route path="add-notice" element={<AddNotice></AddNotice>}></Route>
          <Route
            path="add-family-member"
            element={<AddFamilyMember></AddFamilyMember>}
          ></Route>

          <Route path="add-post" element={<AddPost></AddPost>}></Route>
          <Route path="all-post" element={<AllPost></AllPost>}></Route>
          <Route
            path="all-family-member"
            element={<AllFamilyMember></AllFamilyMember>}
          ></Route>
          <Route
            path="approved-request"
            element={<ApprovedRequest></ApprovedRequest>}
          ></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route
          path="/signupBondhonRegistration"
          element={<Signup></Signup>}
        ></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
