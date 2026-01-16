import React, { useState } from 'react';
import { createInjury } from '../services/api';

function AddInjury() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [severity, setSeverity] = useState(1);
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      await createInjury({ title, description, severity: parseInt(severity) });
      setMessage('Injury reported successfully!');
      setTitle('');
      setDescription('');
      setSeverity(1);
      window.location.reload(); // Refresh to show new injury
    } catch (err) {
      setMessage('Error creating injury: ' + (err.response?.data?.error || err.message));
    }
  };

  return (
    <div className="add-injury">
      <h2>Report New Injury</h2>
      {message && <div className={message.includes('Error') ? 'error' : 'success'}>{message}</div>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Injury Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows="3"
        />
        <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
          <option value="1">Severity: 1 (Minor)</option>
          <option value="2">Severity: 2 (Low)</option>
          <option value="3">Severity: 3 (Moderate)</option>
          <option value="4">Severity: 4 (High)</option>
          <option value="5">Severity: 5 (Critical)</option>
        </select>
        <button type="submit">Submit Report</button>
      </form>
    </div>
  );
}

export default AddInjury;