import { Router } from 'express';
import * as UserController from '../controllers/UserController';
import authMiddleware from '../middleware/authMiddleware';

const router = Router();

// Auth
router.post('/register', UserController.createUser);
router.post('/login', UserController.loginUser);
router.post('/google-login', UserController.googleLogin);
router.post('/forgot-password', UserController.forgotPassword);
router.post('/reset-password', UserController.resetPassword);
router.post('/send-otp', UserController.sendOtp);
router.post('/update-password', authMiddleware, UserController.updatePassword);

// User CRUD
router.get('/', UserController.getAllUsers);
router.get('/me', authMiddleware, UserController.getCurrentUser);
router.get('/:id', UserController.getUserById);
router.post('/', UserController.createUser);
router.put('/:id', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

export default router;
