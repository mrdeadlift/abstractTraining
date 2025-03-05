import { Request, Response, NextFunction } from 'express';
import AppError from '../utils/appError';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  let error = { ...err };
  error.message = err.message;
  
  // エラーのログ出力（開発環境では詳細に、本番環境では簡潔に）
  console.error('ERROR 💥', err);
  
  // MongoDBの重複キーエラーを処理
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `重複エラー: ${field} "${value}" は既に使用されています。`;
    error = new AppError(message, 400);
  }
  
  // キャスト（型変換）エラーの処理
  if (err.name === 'CastError') {
    const message = `無効な ${err.path}: ${err.value}`;
    error = new AppError(message, 400);
  }
  
  // バリデーションエラーの処理
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((val: any) => val.message);
    const message = `入力データが無効です。${errors.join('. ')}`;
    error = new AppError(message, 400);
  }
  
  // JWTエラーの処理
  if (err.name === 'JsonWebTokenError') {
    error = new AppError('無効なトークンです。再度ログインしてください。', 401);
  }
  
  // JWTの有効期限切れエラーの処理
  if (err.name === 'TokenExpiredError') {
    error = new AppError('トークンの有効期限が切れています。再度ログインしてください。', 401);
  }
  
  // 開発環境と本番環境でのエラーレスポンスの分岐
  if (process.env.NODE_ENV === 'development') {
    res.status(error.statusCode || 500).json({
      status: error.status || 'error',
      error,
      message: error.message,
      stack: error.stack
    });
  } else {
    // 運用エラー（予期されたエラー）の場合はそのままメッセージを送信
    if (error.isOperational) {
      res.status(error.statusCode || 500).json({
        status: error.status || 'error',
        message: error.message
      });
    } else {
      // プログラミングエラーや未知のエラーの場合は詳細を隠す
      console.error('ERROR 💥', error);
      res.status(500).json({
        status: 'error',
        message: '何か問題が発生しました。後でもう一度お試しください。'
      });
    }
  }
};

export default errorHandler; 