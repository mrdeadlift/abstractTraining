import { Request, Response, NextFunction } from 'express';
import logger from '../utils/logger';

interface AppError extends Error {
  statusCode?: number;
  kind?: string;
}

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const error = new Error(`リソースが見つかりません - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export const errorHandler = (err: AppError, req: Request, res: Response, next: NextFunction) => {
  // MongoDBのエラーハンドリング
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'バリデーションエラー',
      details: err.message
    });
  }

  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    return res.status(400).json({
      message: '無効なIDフォーマットです'
    });
  }

  if (err.code === 11000) {
    return res.status(400).json({
      message: '一意性制約違反: 既に存在するデータです'
    });
  }

  // ログ出力
  logger.error(`${err.name}: ${err.message}`);
  if (process.env.NODE_ENV === 'development') {
    logger.error(err.stack);
  }

  // レスポンス
  const statusCode = err.statusCode || res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack
  });
}; 