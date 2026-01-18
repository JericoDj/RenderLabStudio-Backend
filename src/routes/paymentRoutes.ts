import { Router } from 'express';
import * as PaymentController from '../controllers/PaymentController';

const router = Router();

router.post('/', PaymentController.createPayment);
router.get('/', PaymentController.getAllPayments);
router.get('/:id', PaymentController.getPayment);
router.put('/:id', PaymentController.updatePayment);
router.delete('/:id', PaymentController.deletePayment);

export default router;
