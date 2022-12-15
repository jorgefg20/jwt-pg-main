import express from 'express';
import pool from '../db.js';
//import bcrypt from 'bcrypt';
import {authenticateToken} from '../middleware/authorization.js';
import { jwtTokens } from '../utils/jwt-helpers.js';

const router = express.Router();

/* GET users listing. */
router.get('/', async (req, res) => {
  try {
    console.log(req.cookies);
    const users = await pool.query('SELECT * FROM role');
    res.json({roles : users.rows});
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});


router.get('/rol', async (req, res) => {
    try {
      console.log(req.cookies);
      const users = await pool.query('SELECT * FROM role');
      res.json({role : users.rows});
    } catch (error) {
      res.status(500).json({error: error.message});
    }
  });

router.post('/', async (req, res) => {
  try {
   // const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      'INSERT INTO role (name_rol) VALUES ($1) RETURNING *'
      , [req.body.name]);
    res.json(jwtTokens(newUser.rows[0]));
  } catch (error) {
    res.status(500).json({error: error.message});
  }
});




router.delete('/', async (req,res)=>{
  try {
    const users = await pool.query('DELETE FROM role');
    res.status(204).json(users.rows);
  } catch (error) {
    res.status(500).json({error: error.message});
  }
})


export default router;