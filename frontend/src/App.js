
import React from 'react'
import './App.css';
import { Route, Routes } from 'react-router-dom';
import Navbar from './layouts/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import OurTeam from './pages/OurTeam';
import Services from './pages/Services';
import Login from './pages/Login';
import Footer from './layouts/Footer';
import Error404 from './pages/Error404';
import SchoolRegister from './pages/SchoolRegister';
import SchoolLogin from './pages/SchoolLogin';
import StateLogin from './pages/StateLogin';
import AnalyticalDashboard from './pages/AnalyticalDashboard';
import AdminLogin from './pages/AdminLogin';
import WelcomeAfterSchoolLogin from './pages/WelcomeAfterSchoolLogin';
import WelcomeAfterAdminLogin from './pages/WelcomeAfterAdminLogin';

export default function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route Route path='/' element={<Home />}></Route>
        <Route path='/aboutus' element={<About />}></Route>
        <Route path='/ourteam' element={<OurTeam />}></Route>
        <Route path='/services' element={<Services />}></Route>
        <Route path='/schoolregister' element={<SchoolRegister />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/schoollogin' element={<SchoolLogin />}></Route>
        <Route path='/statelogin' element={<StateLogin />}></Route>
        <Route path='/analyticaldashboard' element={<AnalyticalDashboard />}></Route>
        <Route path='/adminlogin' element={<AdminLogin />}></Route>
        <Route path='/welcomeafterschoollogin' element={<WelcomeAfterSchoolLogin />}></Route>
        <Route path='/welcomeafteradminlogin' element={<WelcomeAfterAdminLogin />}></Route>
        <Route path='*' element={<Error404 />}></Route>
      </Routes>
      <Footer /> 

    </>
  );
}

