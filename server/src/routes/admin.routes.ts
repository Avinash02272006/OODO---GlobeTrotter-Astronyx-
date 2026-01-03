import { Router } from 'express';
import { getDashboardStats, getUsers, getPopularActivities } from '../controllers/admin.controller';
import { authMiddleware } from '../middleware/auth.middleware';
import { adminMiddleware } from '../middleware/admin.middleware';

const router = Router();

router.use(authMiddleware);
router.use(adminMiddleware);

router.get('/stats', getDashboardStats);
router.get('/users', getUsers);
router.get('/activities', getPopularActivities);

export default router;
