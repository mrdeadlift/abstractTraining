import Link from "next/link";
import { notFound } from "next/navigation";

// 仮のモジュールデータ
const modulesData = [
  {
    id: 1,
    title: "段階的なシステムモデリング",
    description: "具体的な実装から抽象レベルを段階的に上げていく演習。このモジュールでは、具体的なコードやシステム実装から始めて、徐々に抽象化レベルを上げていく方法を学びます。抽象化は再利用性、保守性、拡張性を高めるために重要なスキルです。",
    exercises: [
      {
        id: 101,
        title: "コードの共通パターン抽出",
        description: "重複コードから共通パターンを特定し、抽象化する",
        status: "completed",
        points: 10
      },
      {
        id: 102,
        title: "インターフェース設計",
        description: "具体的な実装からインターフェースを抽出する",
        status: "completed",
        points: 15
      },
      {
        id: 103,
        title: "抽象クラス設計",
        description: "関連する複数のクラスから抽象クラスを設計する",
        status: "in_progress",
        points: 20
      },
      {
        id: 104,
        title: "デザインパターン適用",
        description: "適切なデザインパターンを選択して適用する",
        status: "not_started",
        points: 25
      },
      {
        id: 105,
        title: "アーキテクチャモデリング",
        description: "システム全体の抽象的なアーキテクチャを設計する",
        status: "not_started",
        points: 30
      }
    ],
    difficulty: "初級",
    icon: "🏗️",
    progress: 40,
    type: "modeling"
  }
];

export default function ModuleDetailPage({ params }: { params: { id: string } }) {
  const moduleId = parseInt(params.id);
  const moduleData = modulesData.find(m => m.id === moduleId);

  if (!moduleData) {
    notFound();
  }

  // 進捗状況の計算
  const completedExercises = moduleData.exercises.filter(ex => ex.status === "completed").length;
  const totalExercises = moduleData.exercises.length;
  const progressPercentage = Math.round((completedExercises / totalExercises) * 100);

  // 獲得ポイントの計算
  const earnedPoints = moduleData.exercises
    .filter(ex => ex.status === "completed")
    .reduce((sum, ex) => sum + ex.points, 0);
  
  // 次の演習を特定
  const nextExercise = moduleData.exercises.find(ex => ex.status === "in_progress") || 
                       moduleData.exercises.find(ex => ex.status === "not_started");

  return (
    <div className="space-y-8">
      {/* モジュールヘッダー */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex items-center mb-4">
          <Link 
            href="/dashboard/modules" 
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mr-2"
          >
            ← モジュール一覧
          </Link>
        </div>
        <div className="flex items-start">
          <div className="text-5xl mr-6">{moduleData.icon}</div>
          <div>
            <h1 className="text-2xl font-bold mb-2">{moduleData.title}</h1>
            <div className="flex items-center mb-2">
              <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full mr-2">
                {moduleData.difficulty}
              </span>
              <span className="text-sm text-gray-600 dark:text-gray-400">
                {totalExercises} 演習
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400">
              {moduleData.description}
            </p>
          </div>
        </div>
      </div>

      {/* 進捗状況 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">進捗状況</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">完了</h3>
            <p className="text-2xl font-semibold">{completedExercises}/{totalExercises}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">獲得ポイント</h3>
            <p className="text-2xl font-semibold">{earnedPoints}</p>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">全体進捗</h3>
            <p className="text-2xl font-semibold">{progressPercentage}%</p>
          </div>
        </div>
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mb-2">
          <div
            className="bg-blue-600 h-2.5 rounded-full"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>

      {/* 演習一覧 */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">演習一覧</h2>
        <div className="space-y-4">
          {moduleData.exercises.map((exercise, index) => (
            <div 
              key={exercise.id} 
              className={`border rounded-lg p-4 ${
                exercise.status === 'completed' 
                  ? 'border-green-200 dark:border-green-900 bg-green-50 dark:bg-green-900/20' 
                  : exercise.status === 'in_progress'
                    ? 'border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-900/20'
                    : 'border-gray-200 dark:border-gray-700'
              }`}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 mr-3 text-sm font-medium">
                    {index + 1}
                  </div>
                  <div>
                    <h3 className="font-medium">{exercise.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{exercise.description}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className="text-sm mr-4">{exercise.points} ポイント</span>
                  {exercise.status === 'completed' ? (
                    <span className="text-green-600 dark:text-green-400">✓ 完了</span>
                  ) : exercise.status === 'in_progress' ? (
                    <Link
                      href={`/dashboard/modules/${moduleData.id}/exercises/${exercise.id}`}
                      className="px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
                    >
                      続ける
                    </Link>
                  ) : (
                    <Link
                      href={`/dashboard/modules/${moduleData.id}/exercises/${exercise.id}`}
                      className="px-3 py-1 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-800 dark:text-gray-200 text-sm rounded-md"
                    >
                      開始する
                    </Link>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 次のステップ */}
      {nextExercise && (
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-900 rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-semibold mb-2">次のステップ</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-4">
            {nextExercise.status === 'in_progress' 
              ? '進行中の演習を続けましょう。' 
              : '次の演習を始めましょう。'}
          </p>
          <Link
            href={`/dashboard/modules/${moduleData.id}/exercises/${nextExercise.id}`}
            className="inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
          >
            {nextExercise.status === 'in_progress' ? '続ける' : '開始する'} - {nextExercise.title}
          </Link>
        </div>
      )}
    </div>
  );
} 