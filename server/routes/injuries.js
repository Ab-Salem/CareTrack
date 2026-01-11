const express = require('express');
const db = require('../config/database');
const { authenticateToken, authorizeAdmin } = require('../middleware/auth');

const router = express.Router();

// Get all injuries
router.get('/', authenticateToken, async (req, res) => {
  try {
    const [injuries] = await db.query(
      'SELECT i.*, u.username FROM injuries i LEFT JOIN users u ON i.user_id = u.id ORDER BY i.created_at DESC'
    );
    res.json(injuries);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create injury
router.post('/', authenticateToken, async (req, res) => {
  try {
    const { title, description, severity } = req.body;
    
    if (!title || !severity) {
      return res.status(400).json({ error: 'Title and severity are required' });
    }

    const [result] = await db.query(
      'INSERT INTO injuries (title, description, severity, user_id) VALUES (?, ?, ?, ?)',
      [title, description, severity, req.user.id]
    );

    res.status(201).json({
      id: result.insertId,
      title,
      description,
      severity,
      user_id: req.user.id
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Delete injury (admin only)
router.delete('/:id', authenticateToken, authorizeAdmin, async (req, res) => {
  try {
    const [result] = await db.query('DELETE FROM injuries WHERE id = ?', [req.params.id]);
    
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Injury not found' });
    }

    res.json({ message: 'Injury deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;