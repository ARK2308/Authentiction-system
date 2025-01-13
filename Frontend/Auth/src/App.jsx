import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login'; // Ensure this points to your Login component
import Home from './components/Home';
import AdminLogin from './components/AdminLogin';
import { ToastContainer } from 'react-toastify';
import Dashboard from './components/Dashboard';
import Register from './components/Register';
import PollPage from './components/PollPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/register" element={<Register />} />
        <Route path="pollpage" element={<PollPage />} />
      </Routes>

      <ToastContainer />
    </div>
  );
};

export default App;
