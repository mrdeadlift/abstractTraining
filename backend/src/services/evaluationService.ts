import { IExercise } from '../models/Exercise';
import logger from '../utils/logger';

// 回答評価の結果インターフェース
interface EvaluationResult {
  score: number;
  feedback: string[];
}

// 回答を評価する関数
export const evaluateSubmission = async (exercise: IExercise, submission: any): Promise<EvaluationResult> => {
  try {
    // エクササイズのタイプに基づいて評価ロジックを分岐
    // 実際のアプリケーションでは、より複雑な評価ロジックを実装する
    
    // 例: 段階的なシステムモデリングの評価
    if (exercise.content.type === 'system_modeling') {
      return evaluateSystemModeling(exercise, submission);
    }
    
    // 例: マイクロサービス境界設計の評価
    if (exercise.content.type === 'microservice_boundary') {
      return evaluateMicroserviceBoundary(exercise, submission);
    }
    
    // 例: 要件抽象化の評価
    if (exercise.content.type === 'requirement_abstraction') {
      return evaluateRequirementAbstraction(exercise, submission);
    }
    
    // 例: データモデル正規化の評価
    if (exercise.content.type === 'data_normalization') {
      return evaluateDataNormalization(exercise, submission);
    }
    
    // デフォルトの評価（単純な正解比較）
    return {
      score: Math.floor(Math.random() * (exercise.points + 1)), // 仮の実装
      feedback: ['回答を受け付けました。詳細なフィードバックは準備中です。']
    };
  } catch (error) {
    logger.error(`評価エラー: ${error}`);
    return {
      score: 0,
      feedback: ['評価中にエラーが発生しました。後でもう一度お試しください。']
    };
  }
};

// 段階的なシステムモデリングの評価
const evaluateSystemModeling = (exercise: IExercise, submission: any): EvaluationResult => {
  // 仮の実装
  const score = Math.floor(Math.random() * (exercise.points + 1));
  return {
    score,
    feedback: [
      'モデリングの抽象度が適切です。',
      'コンポーネント間の関係性が明確に表現されています。',
      'さらに改善するには、境界をより明確にすることを検討してください。'
    ]
  };
};

// マイクロサービス境界設計の評価
const evaluateMicroserviceBoundary = (exercise: IExercise, submission: any): EvaluationResult => {
  // 仮の実装
  const score = Math.floor(Math.random() * (exercise.points + 1));
  return {
    score,
    feedback: [
      'サービス境界の設定が適切です。',
      'ドメイン駆動設計の原則に基づいた分割が行われています。',
      'データの一貫性と独立性のバランスをさらに検討してください。'
    ]
  };
};

// 要件抽象化の評価
const evaluateRequirementAbstraction = (exercise: IExercise, submission: any): EvaluationResult => {
  // 仮の実装
  const score = Math.floor(Math.random() * (exercise.points + 1));
  return {
    score,
    feedback: [
      '本質的な要件が適切に抽出されています。',
      '実装の詳細と要件の分離が明確です。',
      'さらに抽象度を高めるために、共通パターンの識別を検討してください。'
    ]
  };
};

// データモデル正規化の評価
const evaluateDataNormalization = (exercise: IExercise, submission: any): EvaluationResult => {
  // 仮の実装
  const score = Math.floor(Math.random() * (exercise.points + 1));
  return {
    score,
    feedback: [
      'データモデルの正規化レベルが適切です。',
      'エンティティ間の関係が明確に定義されています。',
      'パフォーマンスとデータ整合性のバランスをさらに検討してください。'
    ]
  };
}; 