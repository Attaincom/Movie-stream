import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/Signup';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AuthProvider from './context/AuthContext';
import SearchAndToggle from './component/SearchAndToggle';
import MovieGrid from './component/MovieGrid';
import Sidebar from './component/Sidebar';
import { DarkModeContext } from './context/DarkModeContext';
import Home from './component/Home';
import ForgotPassword from './pages/ForgotPassword';


function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/search-toggle" element={<SearchAndToggle />} />
          <Route path="/movie-grid" element={<MovieGrid />} />
          <Route path="/sidebar" element={<Sidebar />} />
          <Route path="/darkmodecontext" element={<DarkModeContext />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
           
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
