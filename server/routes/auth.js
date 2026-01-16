const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../config/database');

const router = express.Router();

// Login
router.post('/login', async (req, res) => {
  console.log('\n========== LOGIN ATTEMPT ==========');
  console.log('Time:', new Date().toISOString());
  
  try {
    const { username, password } = req.body;
    
    console.log('1. Request body received:');
    console.log('   Username:', username);
    console.log('   Password:', password ? `${password.substring(0, 3)}***` : 'EMPTY');
    console.log('   Password length:', password ? password.length : 0);
    
    console.log('\n2. Querying database...');
    const [users] = await db.query(
      'SELECT * FROM users WHERE username = ?',
      [username]
    );
    
    console.log('3. Database query result:');
    console.log('   Users found:', users.length);
    
    if (users.length === 0) {
      console.log('❌ FAILURE: No user found with username:', username);
      console.log('===================================\n');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    const user = users[0];
    console.log('4. User found in database:');
    console.log('   ID:', user.id);
    console.log('   Username:', user.username);
    console.log('   Role:', user.role);
    console.log('   Password hash:', user.password);
    console.log('   Hash starts with:', user.password.substring(0, 10));
    
    console.log('\n5. Comparing passwords...');
    console.log('   Input password:', password);
    console.log('   Stored hash:', user.password);
    
    const validPassword = await bcrypt.compare(password, user.password);
    
    console.log('6. Password comparison result:', validPassword);
    
    if (!validPassword) {
      console.log('❌ FAILURE: Password does not match');
      console.log('   Tried password:', password);
      console.log('   Against hash:', user.password);
      console.log('===================================\n');
      return res.status(401).json({ error: 'Invalid credentials' });
    }
    
    console.log('\n7. Password valid! Generating token...');
    console.log('   JWT_SECRET exists:', !!process.env.JWT_SECRET);
    console.log('   JWT_SECRET length:', process.env.JWT_SECRET ? process.env.JWT_SECRET.length : 0);
    
    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: '24h' }
    );
    
    console.log('8. Token generated successfully');
    console.log('   Token preview:', token.substring(0, 20) + '...');
    
    console.log('\n✅ SUCCESS: Login completed for user:', username);
    console.log('===================================\n');
    
    res.json({
      token,
      user: {
        id: user.id,
        username: user.username,
        role: user.role
      }
    });
  } catch (error) {
    console.error('\n❌ ERROR: Exception occurred during login');
    console.error('Error name:', error.name);
    console.error('Error message:', error.message);
    console.error('Full error:', error);
    console.log('===================================\n');
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
