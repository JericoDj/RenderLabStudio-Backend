import { Router } from 'express';
import * as MessageController from '../controllers/MessageController';

const router = Router();

router.post('/', MessageController.createMessage);
router.get('/', MessageController.getAllMessages);
router.get('/:id', MessageController.getMessage);
router.put('/:id', MessageController.updateMessage);
router.delete('/:id', MessageController.deleteMessage);

export default router;
