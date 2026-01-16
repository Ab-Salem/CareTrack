import React, { useState, useEffect } from 'react';
import { getInjuries, deleteInjury } from '../services/api';

function InjuryList({ userRole }) {
  const [injuries, setInjuries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchInjuries();
  }, []);

  const fetchInjuries = async () => {
    try {
      const response = await getInjuries();
      setInjuries(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load injury reports');
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this injury report?')) {
      return;
    }

    try {
      await deleteInjury(id);
      setInjuries(injuries.filter(injury => injury.id !== id));
    } catch (err) {
      alert('Error: ' + (err.response?.data?.error || err.message));
    }
  };

  const getSeverityClass = (severity) => {
    return `severity severity-${severity}`;
  };

  if (loading) {
    return (
      <div className="injury-list">
        <div style={{ textAlign: 'center', padding: '40px', color: '#718096' }}>
          Loading reports...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="injury-list">
        <div className="error">{error}</div>
      </div>
    );
  }

  return (
    <div className="injury-list">
      <h2>
        Injury Reports
        <span className="injury-count">{injuries.length}</span>
      </h2>
      
      {injuries.length === 0 ? (
        <div className="empty-state">
          <div className="empty-state-icon">📋</div>
          <h3>No injury reports</h3>
          <p>Submit your first report to get started</p>
        </div>
      ) : (
        <div className="injuries">
          {injuries.map(injury => (
            <div key={injury.id} className="injury-card">
              <h3>{injury.title}</h3>
              <span className={getSeverityClass(injury.severity)}>
                Level {injury.severity}
              </span>
              <p>{injury.description || 'No additional details provided'}</p>
              <div className="meta">
                <span>Reported by: {injury.username}</span>
                <span>{new Date(injury.created_at).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'short',
                  day: 'numeric'
                })}</span>
              </div>
              {userRole === 'admin' && (
                <button className="delete-btn" onClick={() => handleDelete(injury.id)}>
                  Delete Report
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default InjuryList;