import { Router } from 'express';
import { isAuthenticated, requireAuth } from '../middlewares/middleware';
import {
  getSecret,
  getUserById,
  logout,
  requestPasswordReset,
  resetPassword,
  signin,
} from './auth.controllers';

const router = Router();

router.post('/login', signin); // Register user
router.post('/logout', logout); // Register user
router.get('/get-user-by-id', getUserById); // Get user by id
router.get('/validate', isAuthenticated); // Validate user
router.post('/request-password-reset', requestPasswordReset); // Send password reset mail to user if user found
router.post('/reset-password', resetPassword); // Send password reset mail to user if user found
router.get('/secret', requireAuth(['admin', 'manager', 'client']), getSecret); // Authorize user with middlewares before any requests

export default router;
