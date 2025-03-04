import express, { Express } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { notFound, errorHandler } from './middleware/errorHandler';
import connectDB from './config/db';

// ルーターのインポート
import authRoutes from './routes/auth';
import trainingRoutes from './routes/training';
import userRoutes from './routes/user';

// 環境変数の読み込み
dotenv.config();

// データベース接続
connectDB();

const app: Express = express();

// ミドルウェア
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ルート
app.use('/api/auth', authRoutes);
app.use('/api/training', trainingRoutes);
app.use('/api/user', userRoutes);

// 基本ルート
app.get('/', (req, res) => {
  res.send('抽象化トレーニングAPI');
});

// エラーハンドリングミドルウェア
app.use(notFound);
app.use(errorHandler);

export default app; 