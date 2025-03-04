import User from '../models/User';
import Badge from '../models/Badge';
import UserProgress from '../models/UserProgress';
import logger from '../utils/logger';

// バッジ獲得条件をチェックする関数
export const checkBadgeAchievements = async (userId: string): Promise<any[]> => {
  try {
    // ユーザー情報を取得
    const user = await User.findById(userId);
    if (!user) {
      return [];
    }

    // すべてのバッジを取得
    const allBadges = await Badge.find();
    
    // ユーザーが既に獲得しているバッジのIDリスト
    const userBadgeIds = user.badges.map(b => b.toString());
    
    // ユーザーの進捗状況を取得
    const userProgress = await UserProgress.find({ userId });
    
    // 新しく獲得したバッジを格納する配列
    const newBadges = [];
    
    // 各バッジの獲得条件をチェック
    for (const badge of allBadges) {
      // 既に獲得済みのバッジはスキップ
      if (userBadgeIds.includes(badge._id.toString())) {
        continue;
      }
      
      // バッジの獲得条件に基づいてチェック
      const achieved = await checkBadgeCriteria(badge, user, userProgress);
      
      if (achieved) {
        // バッジを獲得した場合、ユーザーのバッジリストに追加
        await User.findByIdAndUpdate(
          userId,
          { $push: { badges: badge._id } }
        );
        
        newBadges.push(badge);
      }
    }
    
    return newBadges;
  } catch (error) {
    logger.error(`バッジ獲得チェックエラー: ${error}`);
    return [];
  }
};

// バッジの獲得条件をチェックする関数
const checkBadgeCriteria = async (badge: any, user: any, userProgress: any[]): Promise<boolean> => {
  const criteria = badge.criteria;
  
  // ポイント獲得に基づくバッジ
  if (criteria.type === 'points' && criteria.points <= user.points) {
    return true;
  }
  
  // 完了したエクササイズ数に基づくバッジ
  if (criteria.type === 'exercises_completed') {
    const completedCount = userProgress.filter(p => p.status === 'completed').length;
    return completedCount >= criteria.count;
  }
  
  // 特定のモジュールの完了に基づくバッジ
  if (criteria.type === 'module_completed' && criteria.moduleId) {
    // モジュール内のすべてのエクササイズが完了しているかチェック
    const moduleProgress = userProgress.filter(p => 
      p.exerciseId.moduleId && 
      p.exerciseId.moduleId.toString() === criteria.moduleId &&
      p.status === 'completed'
    );
    
    // モジュール内のエクササイズ数と完了数を比較
    return moduleProgress.length >= criteria.exerciseCount;
  }
  
  // 連続ログインに基づくバッジ（この実装は仮定）
  if (criteria.type === 'consecutive_logins') {
    // 実際の実装では、ユーザーのログイン履歴を追跡する必要がある
    return false;
  }
  
  return false;
}; 