import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, getUserProfile } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();

// ユーザー登録
router.post(
  '/register',
  [
    body('name').notEmpty().withMessage('名前は必須です'),
    body('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
    body('password').isLength({ min: 6 }).withMessage('パスワードは6文字以上である必要があります')
  ],
  registerUser
);

// ユーザーログイン
router.post(
  '/login',
  [
    body('email').isEmail().withMessage('有効なメールアドレスを入力してください'),
    body('password').exists().withMessage('パスワードを入力してください')
  ],
  loginUser
);

// ユーザープロフィール取得
router.get('/profile', protect, getUserProfile);

export default router; 