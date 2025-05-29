import express from 'express';
import { createUser, deleteUserById, getAllUsers, getUserById, updateUserById } from '../controllers/user.controller.mjs';

const router = express.Router();

// Define las rutas para la entidad user
router.post( '/api/users', createUser );
router.get( '/api/users', getAllUsers );

// Parametrizar las rutas
router.get( '/api/users/:id', getUserById );
router.patch( '/api/users/:id', updateUserById );
router.delete( '/api/users/:id', deleteUserById );


export default router;