import express from 'express';
import { createUser } from '../controllers/user.controller.mjs';

const router = express.Router();

// Define las rutas para la entidad user
router.post( '/api/users', createUser );


export default router;