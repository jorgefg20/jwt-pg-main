import express from 'express';
import pool from '../db.js';
//import bcrypt from 'bcrypt';
import { authenticateToken } from '../middleware/authorization.js';
import { jwtTokens } from '../utils/jwt-helpers.js';

let refreshTokens = [];

const router = express.Router();

/* GET regiters listing. */
router.get('/', authenticateToken, async (req, res) => {
  try {
    console.log(req.cookies);
    const users = await pool.query('SELECT * FROM registry');
    res.json({ users: users.rows });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.post('/regist', async (req, res) => {
  try {
    const { codigo, zona, distrito, nro_folder, nro_tramite, cite, gestion, cod_catastral, nombre_apellido, tipo_tramite, nro_rta, fecha_rta, archivo_registro } = req.body;
    const newRegister = await pool.query(
      'INSERT INTO registry (id_registry,zona,distrito,nro_folder,nro_tramite,cite,gestion,codigo_catastral,nombre_apellido,tipo_tramite,nro_rta_rm,fecha_rta_rm,archivo_registro) VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) RETURNING *'
      , [codigo, zona, distrito, nro_folder, nro_tramite, cite, gestion, cod_catastral, nombre_apellido, tipo_tramite, nro_rta, fecha_rta, archivo_registro]);
    res.json(jwtTokens(newRegister.rows[0]));

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete('/', async (req, res) => {
  try {
    const users = await pool.query('DELETE FROM registry');
    res.status(204).json(users.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

export default router;