import { Router } from 'express';
import { getPosts, createPost, likePost } from '../controllers/community.controller';
import { authMiddleware } from '../middleware/auth.middleware';

const router = Router();

router.get('/', getPosts);
router.post('/', authMiddleware, createPost);
router.post('/:id/like', authMiddleware, likePost);

export default router;
