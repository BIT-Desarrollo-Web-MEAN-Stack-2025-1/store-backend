import express from 'express';

import { createUser } from '../controllers/user.controller.mjs';
import { loginUser } from '../controllers/auth.controller.mjs';

const router = express.Router();

// Define las rutas para la entidad auth
router.post( '/api/register', createUser );
router.post( '/api/login', loginUser );


export default router;