import { Router } from 'express';
import * as SessionController from '../controllers/SessionController';

const router = Router();

router.post('/', SessionController.createSession);
router.get('/', SessionController.getAllSessions);
router.get('/:id', SessionController.getSession);
router.put('/:id', SessionController.updateSession);
router.delete('/:id', SessionController.deleteSession);

// Preferences sub-resources
router.get('/:id/preferences', SessionController.getPreferences);
router.put('/:id/preferences', SessionController.updatePreferences);
router.delete('/:id/preferences', SessionController.deletePreferences);

export default router;
