import express from 'express';
import pool from '../db.js';
import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/authorization.js';
import { jwtTokens } from '../utils/jwt-helpers.js';

let refreshTokens = [];

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    console.log(req.cookies);
    const users = await pool.query('SELECT * FROM users');
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/userID', authenticateToken, async (req, res) => {
  try {
    console.log(req.cookies);
    const {user_id} = req.body;
    
    const users = await pool.query('SELECT (user_id,user_name,id_rol) FROM users WHERE user_id = $1;',);

    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (user_name,user_email,user_password,id_rol) VALUES ($1,$2,$3,$4) RETURNING *'
      , [req.body.name, req.body.email, hashedPassword, req.body.idrol]);
    res.json(jwtTokens(newUser.rows[0]));
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const users = await pool.query('DELETE FROM users');
    res.status(204).json(users.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }  
})

export default router;