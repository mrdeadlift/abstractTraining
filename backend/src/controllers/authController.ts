import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// JWTトークン生成関数
const generateToken = (id: string): string => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'defaultsecret', {
    expiresIn: '30d'
  });
};

// ユーザー登録
export const registerUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // メールアドレスの重複チェック
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'このメールアドレスは既に登録されています' });
    }

    // ユーザー作成
    const user = await User.create({
      name,
      email,
      password
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        points: user.points,
        badges: user.badges,
        token: generateToken(user._id)
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'ユーザー登録に失敗しました' });
  }
};

// ユーザーログイン
export const loginUser = async (req: Request, res: Response) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    // ユーザー検索
    const user = await User.findOne({ email });
    
    // パスワード検証
    if (user && (await user.comparePassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        points: user.points,
        badges: user.badges,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'メールアドレスまたはパスワードが正しくありません' });
    }
  } catch (error) {
    res.status(500).json({ message: 'ログインに失敗しました' });
  }
};

// ユーザープロフィール取得
export const getUserProfile = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: '認証されていません' });
    }

    const user = await User.findById(req.user._id).select('-password').populate('badges');
    
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'ユーザーが見つかりません' });
    }
  } catch (error) {
    res.status(500).json({ message: 'プロフィール取得に失敗しました' });
  }
}; 