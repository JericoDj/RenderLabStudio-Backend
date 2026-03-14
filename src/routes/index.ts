import { Router } from 'express';
import userRoutes from './userRoutes';
import planRoutes from './planRoutes';
import paymentRoutes from './paymentRoutes';
import sessionRoutes from './sessionRoutes';
import messageRoutes from './messageRoutes';
import albumRoutes from './albumRoutes';
import mediaRoutes from './mediaRoutes';
import aiRoutes from './aiRoutes';
import polarRoutes from './polarRoutes';

const router = Router();

router.use('/users', userRoutes);
router.use('/plans', planRoutes);
router.use('/payments', paymentRoutes);
router.use('/sessions', sessionRoutes);
router.use('/messages', messageRoutes);
router.use('/albums', albumRoutes);
router.use('/media', mediaRoutes);
router.use('/ai', aiRoutes);
router.use('/polar', polarRoutes);

export default router;
