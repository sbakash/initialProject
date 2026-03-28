const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');
require('dotenv').config();

const { pool, initDB } = require('./db');

const app = express();
const PORT = process.env.PORT || 5000;
const JWT_SECRET = process.env.JWT_SECRET || 'change_this_secret';

app.use(cors());
app.use(express.json());

// Register
app.post('/api/register', async (req, res) => {
  const { first_name, last_name, email, phone_number, password } = req.body;

  if (!first_name || !last_name || !email || !password) {
    return res.status(400).json({ error: 'first_name, last_name, email and password are required' });
  }

  try {
    const [existing] = await pool.execute('SELECT userid FROM users WHERE email = ?', [email]);
    if (existing.length > 0) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    const hashed = await bcrypt.hash(password, 12);
    const userid = uuidv4();

    await pool.execute(
      'INSERT INTO users (userid, first_name, last_name, email, phone_number, password) VALUES (?, ?, ?, ?, ?, ?)',
      [userid, first_name, last_name, email, phone_number || null, hashed]
    );

    const token = jwt.sign({ userid, email }, JWT_SECRET, { expiresIn: '7d' });
    res.status(201).json({ message: 'User registered successfully', token, userid });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login
app.post('/api/login', async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  try {
    const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
    if (rows.length === 0) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const user = rows[0];
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ userid: user.userid, email: user.email }, JWT_SECRET, { expiresIn: '7d' });
    res.json({
      message: 'Login successful',
      token,
      user: {
        userid: user.userid,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
      },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Health check
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

initDB()
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Failed to initialize DB:', err);
    process.exit(1);
  });
