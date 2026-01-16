import React, { useState, useEffect } from 'react';
import Login from './components/Login';
import InjuryList from './components/InjuryList';
import AddInjury from './components/AddInjury';
import './App.css';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      setUser(JSON.parse(userData));
    }
    setLoading(false);
  }, []);

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return (
    <div className="App">
      {user && (
        <header className="App-header">
          <h1>Company Injury Reporting System</h1>
          <div className="user-info">
            <span>Welcome, {user.username} ({user.role})</span>
            <button onClick={handleLogout}>Logout</button>
          </div>
        </header>
      )}

      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <div className="main-content">
          <AddInjury />
          <InjuryList userRole={user.role} />
        </div>
      )}
    </div>
  );
}

export default App;