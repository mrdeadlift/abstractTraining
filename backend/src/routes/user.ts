import express from 'express';
import { getUserProgress, getModuleProgress } from '../controllers/userProgressController';
import { protect } from '../middleware/auth';

const router = express.Router();

// すべてのルートで認証が必要
router.use(protect);

// ユーザー進捗関連のルート
router.get('/progress', getUserProgress);
router.get('/progress/modules/:moduleId', getModuleProgress);

export default router; 