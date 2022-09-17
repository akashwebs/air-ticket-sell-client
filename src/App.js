import "./App.css";
import { Route, Routes } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Signup from "./Pages/Login/Signup";
import RequireAuth from "./Hooks/RequireAuth";
import Dashboard from "./Pages/Dashboard/Dashboard";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import AddSell from "./Pages/Dashboard/AddSell";
import AllSell from "./Pages/Dashboard/allSell";

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
          <Route index element={<AddSell></AddSell>}></Route>

          <Route path="all-sell" element={<AllSell></AllSell>}></Route>
        </Route>
        <Route path="/login" element={<Login></Login>}></Route>
        <Route path="/signup-accounting" element={<Signup></Signup>}></Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
