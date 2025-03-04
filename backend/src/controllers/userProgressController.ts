import { Request, Response } from 'express';
import UserProgress from '../models/UserProgress';
import TrainingModule from '../models/TrainingModule';
import Exercise from '../models/Exercise';

// ユーザーの全体進捗状況を取得
export const getUserProgress = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: '認証されていません' });
    }
    
    // すべてのモジュールを取得
    const modules = await TrainingModule.find().sort({ order: 1 });
    
    // モジュールごとの進捗状況を取得
    const moduleProgress = await Promise.all(
      modules.map(async (module) => {
        // モジュールに含まれるエクササイズを取得
        const exercises = await Exercise.find({ moduleId: module._id }).sort({ order: 1 });
        
        // エクササイズの進捗状況を取得
        const exerciseProgress = await UserProgress.find({
          userId: req.user?._id,
          exerciseId: { $in: exercises.map(ex => ex._id) }
        });
        
        // 進捗状況の集計
        const totalExercises = exercises.length;
        const completedExercises = exerciseProgress.filter(p => p.status === 'completed').length;
        const totalPoints = exerciseProgress.reduce((sum, p) => sum + p.score, 0);
        
        return {
          moduleId: module._id,
          moduleName: module.name,
          totalExercises,
          completedExercises,
          progress: totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0,
          totalPoints
        };
      })
    );
    
    res.json(moduleProgress);
  } catch (error) {
    res.status(500).json({ message: '進捗状況の取得に失敗しました' });
  }
};

// 特定のモジュールの進捗状況を取得
export const getModuleProgress = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: '認証されていません' });
    }
    
    const { moduleId } = req.params;
    
    // モジュールの存在確認
    const module = await TrainingModule.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'モジュールが見つかりません' });
    }
    
    // モジュールに含まれるエクササイズを取得
    const exercises = await Exercise.find({ moduleId }).sort({ order: 1 });
    
    // エクササイズの進捗状況を取得
    const exerciseProgress = await Promise.all(
      exercises.map(async (exercise) => {
        const progress = await UserProgress.findOne({
          userId: req.user?._id,
          exerciseId: exercise._id
        });
        
        return {
          exerciseId: exercise._id,
          exerciseTitle: exercise.title,
          status: progress?.status || 'not_started',
          score: progress?.score || 0,
          completedAt: progress?.completedAt
        };
      })
    );
    
    res.json({
      moduleId,
      moduleName: module.name,
      exercises: exerciseProgress
    });
  } catch (error) {
    res.status(500).json({ message: 'モジュール進捗状況の取得に失敗しました' });
  }
}; 