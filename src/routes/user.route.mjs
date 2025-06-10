import express from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user.controller.mjs';
import { authUser } from '../middlewares/auth-user.middleware.mjs';

const router = express.Router();

// Define las rutas para la entidad user
router.post( '/api/users', authUser, createUser );
router.get( '/api/users', authUser, getAllUsers );

// Parametrizar las rutas
router.get( '/api/users/:id', authUser, getUserById );
router.patch( '/api/users/:id', authUser, updateUserById );
router.delete( '/api/users/:id', authUser, deleteUserById );


export default router;