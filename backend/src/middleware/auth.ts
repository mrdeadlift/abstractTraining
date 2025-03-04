import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User, { IUser } from '../models/User';

// JWTペイロードの型定義
interface JwtPayload {
  id: string;
}

// Requestオブジェクトを拡張してuserプロパティを追加
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  // ヘッダーからトークンを取得
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // トークン部分を取得
      token = req.headers.authorization.split(' ')[1];

      // トークンを検証
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'defaultsecret') as JwtPayload;

      // ユーザー情報を取得してリクエストに追加（パスワードは除外）
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      res.status(401).json({ message: '認証に失敗しました' });
    }
  }

  if (!token) {
    res.status(401).json({ message: '認証トークンがありません' });
  }
};

// 管理者権限チェック（将来的に必要になる場合）
export const admin = (req: Request, res: Response, next: NextFunction) => {
  if (req.user && req.user.email === process.env.ADMIN_EMAIL) {
    next();
  } else {
    res.status(403).json({ message: '管理者権限が必要です' });
  }
}; 