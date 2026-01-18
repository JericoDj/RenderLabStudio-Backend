import { Router } from 'express';
import * as PlanController from '../controllers/PlanController';

const router = Router();

router.post('/', PlanController.createPlan);
router.get('/', PlanController.getAllPlans);
router.get('/:id', PlanController.getPlan);
router.put('/:id', PlanController.updatePlan);
router.delete('/:id', PlanController.deletePlan);

export default router;
