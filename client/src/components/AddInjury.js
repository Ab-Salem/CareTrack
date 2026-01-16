import React, { useState } from 'react';
import { createInjury } from '../services/api';

function AddInjury() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState(1);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    setLoading(true);

    try {
      await createInjury({ title, description, severity: parseInt(severity) });
      setMessage('✓ Injury report submitted successfully!');
      setTitle('');
      setDescription('');
      setSeverity(1);
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setMessage('✗ Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (level) => {
    const colors = {
      1: '#27ae60',
      2: '#2ecc71',
      3: '#f39c12',
      4: '#e67e22',
      5: '#e74c3c'
    };
    return colors[level] || '#95a5a6';
  };

  return (
    <div className="add-injury">
      <h2>Report New Injury</h2>
      
      {message && (
        <div className={message.includes('Error') || message.includes('✗') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Injury Title *"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />

        <textarea
          placeholder="Detailed Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          disabled={loading}
        />

        <div style={{ marginBottom: '16px' }}>
          <label style={{ 
            display: 'block', 
            marginBottom: '8px', 
            color: '#2c3e50',
            fontWeight: '600',
            fontSize: '14px'
          }}>
            Severity Level: {severity}
          </label>
          <input
            type="range"
            min="1"
            max="5"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            disabled={loading}
            style={{
              width: '100%',
              accentColor: getSeverityColor(parseInt(severity)),
              marginBottom: '8px'
            }}
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#7f8c8d'
          }}>
            <span>Minor</span>
            <span>Critical</span>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>
    </div>
  );
}

export default AddInjury;