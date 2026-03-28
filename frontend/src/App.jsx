import { useState } from 'react';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import './App.css';

export default function App() {
  const [page, setPage] = useState('login');
  const [user, setUser] = useState(null);

  function handleLoginSuccess(userData) {
    setUser(userData);
    setPage('dashboard');
  }

  function handleLogout() {
    setUser(null);
    setPage('login');
  }

  return (
    <div className="app">
      {page === 'login' && (
        <Login
          onSuccess={handleLoginSuccess}
          onGoRegister={() => setPage('register')}
        />
      )}
      {page === 'register' && (
        <Register
          onSuccess={handleLoginSuccess}
          onGoLogin={() => setPage('login')}
        />
      )}
      {page === 'dashboard' && (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}
