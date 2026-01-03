import { Router } from 'express';
import { createTrip, getTrips, getTripById, addStop, addActivity } from '../controllers/trip.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.use(authMiddleware);

router.post('/', createTrip);
router.get('/', getTrips);
router.get('/:id', getTripById);
router.post('/:id/stops', addStop);
router.post('/stops/:stopId/activities', addActivity);

export default router;
