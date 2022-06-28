import logo from './logo.svg';
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Signup from './Pages/Login/Signup';
import RequireAuth from './Hooks/RequireAuth';
import Header from './Pages/Header';

function App() {
  return (
    <div className="">
      
      <Routes>
        <Route path='/' element={
          <RequireAuth><Home></Home></RequireAuth>
          }></Route>
        <Route path='/login' element={
          <Login></Login>
        }></Route>
        <Route path='/signup' element={
          <Signup></Signup>
        }></Route>
      </Routes>
    </div>
  );
}

export default App;
