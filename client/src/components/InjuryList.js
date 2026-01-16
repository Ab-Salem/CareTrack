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
        <div style={{ textAlign: 'center', padding: '40px', color: '#7f8c8d' }}>
          Loading injury reports...
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
      <h2>Injury Reports ({injuries.length})</h2>
      
      {injuries.length === 0 ? (
        <div style={{ 
          textAlign: 'center', 
          padding: '60px 20px',
          color: '#95a5a6'
        }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>📊</div>
          <p style={{ fontSize: '18px', marginBottom: '8px' }}>No injury reports yet</p>
          <p style={{ fontSize: '14px' }}>Submit your first report to get started</p>
        </div>
      ) : (
        <div className="injuries">
          {injuries.map(injury => (
            <div key={injury.id} className="injury-card">
              <h3>{injury.title}</h3>
              <span className={getSeverityClass(injury.severity)}>
                Severity: {injury.severity}/5
              </span>
              <p style={{ color: '#555', lineHeight: '1.6', margin: '12px 0' }}>
                {injury.description || 'No description provided'}
              </p>
              <div className="meta">
                <span>👤 {injury.username}</span>
                <span>📅 {new Date(injury.created_at).toLocaleDateString()}</span>
              </div>
              {userRole === 'admin' && (
                <button className="delete-btn" onClick={() => handleDelete(injury.id)}>
                  🗑️ Delete Report
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