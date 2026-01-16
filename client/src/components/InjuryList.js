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
      setError('Failed to load injuries');
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
      alert('Error deleting injury: ' + (err.response?.data?.error || err.message));
    }
  };

  if (loading) return <div>Loading injuries...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="injury-list">
      <h2>Injury Reports</h2>
      {injuries.length === 0 ? (
        <p>No injuries reported yet.</p>
      ) : (
        <div className="injuries">
          {injuries.map(injury => (
            <div key={injury.id} className="injury-card">
              <h3>{injury.title}</h3>
              <p className="severity">Severity: {injury.severity}/5</p>
              <p>{injury.description}</p>
              <div className="meta">
                <span>Reported by: {injury.username}</span>
                <span>{new Date(injury.created_at).toLocaleDateString()}</span>
              </div>
              {userRole === 'admin' && (
                <button className="delete-btn" onClick={() => handleDelete(injury.id)}>
                  Delete
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