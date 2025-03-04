import { Request, Response } from 'express';
import TrainingModule from '../models/TrainingModule';
import Exercise from '../models/Exercise';
import UserProgress from '../models/UserProgress';

// すべてのトレーニングモジュールを取得
export const getTrainingModules = async (req: Request, res: Response) => {
  try {
    const modules = await TrainingModule.find({}).sort({ order: 1 });
    res.json(modules);
  } catch (error) {
    res.status(500).json({ message: 'モジュール取得に失敗しました' });
  }
};

// 特定のトレーニングモジュールの詳細を取得
export const getTrainingModuleById = async (req: Request, res: Response) => {
  try {
    const module = await TrainingModule.findById(req.params.id);
    
    if (!module) {
      return res.status(404).json({ message: 'モジュールが見つかりません' });
    }
    
    // モジュールに含まれるエクササイズを取得
    const exercises = await Exercise.find({ moduleId: module._id }).sort({ order: 1 });
    
    // ユーザーの進捗状況を取得（認証済みの場合）
    let progress = [];
    if (req.user) {
      progress = await UserProgress.find({
        userId: req.user._id,
        exerciseId: { $in: exercises.map(ex => ex._id) }
      });
    }
    
    res.json({
      ...module.toObject(),
      exercises,
      progress
    });
  } catch (error) {
    res.status(500).json({ message: 'モジュール詳細の取得に失敗しました' });
  }
}; 