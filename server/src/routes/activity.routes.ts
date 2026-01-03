import { Router } from 'express';
import { getGlobalActivities, seedActivities } from '../controllers/activity.controller';

const router = Router();

router.get('/', getGlobalActivities);
router.post('/seed', seedActivities);

export default router;
