import React from 'react';
import { Route, Routes, NavLink } from 'react-router-dom';
import UsersPage from './pages/UsersPage';
import UserDetailsPage from './pages/UserDetailsPage';


export default function App() {
  return (
    <div className="container">
      <header className="row" style={{ justifyContent: 'space-between', marginBottom: 16 }}>
        <h1>User Management</h1>
        <nav className="row" style={{ gap: 12 }}>
          <NavLink to="/">Home</NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/" element={<UsersPage />} />
        <Route path="/users/:id" element={<UserDetailsPage />} />
      </Routes>
    </div>
  );
}
