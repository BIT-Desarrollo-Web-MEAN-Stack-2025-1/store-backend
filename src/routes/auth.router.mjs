import express from 'express';

import { loginUser, registerUser, reNewToken } from '../controllers/auth.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();

// Define las rutas para la entidad auth
router.post( '/api/auth/register', registerUser );
router.post( '/api/auth/login', loginUser );
router.get( '/api/auth/re-new-token', authUser, reNewToken );


export default router;