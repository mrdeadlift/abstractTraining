import { Request, Response } from 'express';
import Exercise from '../models/Exercise';
import UserProgress from '../models/UserProgress';
import User from '../models/User';
import { evaluateSubmission } from '../services/evaluationService';
import { checkBadgeAchievements } from '../services/gamificationService';

// エクササイズの詳細を取得
export const getExerciseById = async (req: Request, res: Response) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    
    if (!exercise) {
      return res.status(404).json({ message: 'エクササイズが見つかりません' });
    }
    
    // ユーザーの進捗状況を取得（認証済みの場合）
    let progress = null;
    if (req.user) {
      progress = await UserProgress.findOne({
        userId: req.user._id,
        exerciseId: exercise._id
      });
      
      // 進捗レコードがなければ作成
      if (!progress) {
        progress = await UserProgress.create({
          userId: req.user._id,
          exerciseId: exercise._id,
          status: 'not_started'
        });
      }
    }
    
    res.json({
      ...exercise.toObject(),
      progress
    });
  } catch (error) {
    res.status(500).json({ message: 'エクササイズ詳細の取得に失敗しました' });
  }
};

// エクササイズの回答を提出
export const submitExercise = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: '認証されていません' });
    }
    
    const { exerciseId } = req.params;
    const { submission } = req.body;
    
    // エクササイズの存在確認
    const exercise = await Exercise.findById(exerciseId);
    if (!exercise) {
      return res.status(404).json({ message: 'エクササイズが見つかりません' });
    }
    
    // 回答を評価
    const { score, feedback } = await evaluateSubmission(exercise, submission);
    
    // 進捗状況を更新
    const progress = await UserProgress.findOneAndUpdate(
      { userId: req.user._id, exerciseId },
      {
        submission,
        score,
        status: 'completed',
        completedAt: new Date()
      },
      { new: true, upsert: true }
    );
    
    // ユーザーのポイントを更新
    const user = await User.findByIdAndUpdate(
      req.user._id,
      { $inc: { points: score } },
      { new: true }
    );
    
    // バッジ獲得チェック
    const newBadges = await checkBadgeAchievements(req.user._id);
    
    res.json({
      progress,
      score,
      feedback,
      totalPoints: user?.points,
      newBadges
    });
  } catch (error) {
    res.status(500).json({ message: '回答提出に失敗しました' });
  }
}; 