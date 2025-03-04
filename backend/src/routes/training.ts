import express from 'express';
import { getTrainingModules, getTrainingModuleById } from '../controllers/trainingModuleController';
import { getExerciseById, submitExercise } from '../controllers/exerciseController';
import { protect } from '../middleware/auth';

const router = express.Router();

// トレーニングモジュール関連のルート
router.get('/modules', getTrainingModules);
router.get('/modules/:id', getTrainingModuleById);

// エクササイズ関連のルート
router.get('/exercises/:id', getExerciseById);
router.post('/exercises/:exerciseId/submit', protect, submitExercise);

export default router; 