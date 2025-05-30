import express from 'express';
import { createUser } from '../controllers/user.controller.mjs';

const router = express.Router();

// Define las rutas para la entidad auth
router.post( '/api/register', createUser );


export default router;