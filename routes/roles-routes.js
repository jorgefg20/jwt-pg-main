import express from 'express';
import pool from '../db.js';
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


router.post('/useridrole', async (req, res) => {
  try {
    const {id_rol} = req.body;
    
    const useridrole = await pool.query('SELECT * FROM role WHERE id_rol  = $1', [id_rol]);
    // validate if exist an error in the query
    if (useridrole.rows.length === 0) return res.status(401).json({ error: "el id del rol no esta bien " });
    res.json(useridrole.rows[0].name_rol);

  } catch (error) {
    res.status(401).json({ error: error.message });
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