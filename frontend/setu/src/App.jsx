import React from 'react';
import { useLocation } from 'react-router-dom';
import { Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import MyIssue from './pages/MyIssue';
import MyProblem from './pages/MyProblem';
import AdminDashboard from './pages/AdminDasboard';
import Details from './pages/Details';
import UserDasboard from './pages/UserDasboard';
import About from './pages/About';

const App = () => {
  const location = useLocation();
  const hideNav = location.pathname === '/login' || 
                  location.pathname === '/register';

  return (
    <div>
      {!hideNav && <Nav />} 
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path='/issue' element={<MyIssue/>} />
        <Route path='/myIssue' element={<MyProblem/>} />
        <Route path='/admin' element={<AdminDashboard/>} />
        <Route path='/details/:issueid' element={<Details/>} />
        <Route path='/profile' element={<UserDasboard/>} />
        <Route path='/about' element={<About/>} />



      </Routes>
    </div>
  );
};
export default App;