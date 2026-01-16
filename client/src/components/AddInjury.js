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
      setMessage('Injury report submitted successfully');
      setTitle('');
      setDescription('');
      setSeverity(1);
      
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (err) {
      setMessage('Error: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  const getSeverityColor = (level) => {
    const colors = {
      1: '#22543d',
      2: '#2c5282',
      3: '#7c2d12',
      4: '#742a2a',
      5: '#702459'
    };
    return colors[level] || '#718096';
  };

  return (
    <div className="add-injury">
      <h2>Report New Injury</h2>
      
      {message && (
        <div className={message.includes('Error') ? 'error' : 'success'}>
          {message}
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <label htmlFor="title">Injury Title</label>
        <input
          id="title"
          type="text"
          placeholder="Brief description of injury"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />

        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          placeholder="Detailed description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="4"
          disabled={loading}
        />

        <label htmlFor="severity" style={{ marginBottom: '12px' }}>
          Severity Level: <span style={{ color: getSeverityColor(parseInt(severity)), fontWeight: '700' }}>{severity}</span>
        </label>
        
        <div style={{ marginBottom: '20px' }}>
          <input
            id="severity"
            type="range"
            min="1"
            max="5"
            step="1"
            value={severity}
            onChange={(e) => setSeverity(e.target.value)}
            disabled={loading}
            style={{
              width: '100%',
              height: '6px',
              borderRadius: '3px',
              outline: 'none',
              background: `linear-gradient(to right, 
                #c6f6d5 0%, 
                #bee3f8 25%, 
                #feebc8 50%, 
                #fed7d7 75%, 
                #fbb6ce 100%)`,
              WebkitAppearance: 'none',
              appearance: 'none',
              cursor: 'pointer',
              marginBottom: '12px'
            }}
            className="severity-slider"
          />
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: '12px',
            color: '#718096',
            fontWeight: '500'
          }}>
            <span>1 - Minor</span>
            <span>2 - Low</span>
            <span>3 - Moderate</span>
            <span>4 - High</span>
            <span>5 - Critical</span>
          </div>
        </div>

        <button type="submit" disabled={loading}>
          {loading ? 'Submitting...' : 'Submit Report'}
        </button>
      </form>

      <style>{`
        .severity-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${getSeverityColor(parseInt(severity))};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .severity-slider::-moz-range-thumb {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: ${getSeverityColor(parseInt(severity))};
          cursor: pointer;
          border: 3px solid white;
          box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
        }

        .severity-slider::-webkit-slider-thumb:hover {
          transform: scale(1.1);
        }

        .severity-slider::-moz-range-thumb:hover {
          transform: scale(1.1);
        }

        .severity-slider:disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .severity-slider:disabled::-webkit-slider-thumb {
          cursor: not-allowed;
        }

        .severity-slider:disabled::-moz-range-thumb {
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}

export default AddInjury;