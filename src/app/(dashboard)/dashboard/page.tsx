import Link from "next/link";

export default function DashboardPage() {
  // 仮のデータ
  const userData = {
    name: "ユーザー",
    completedExercises: 5,
    totalExercises: 20,
    points: 120,
    badges: 2
  };

  const recentModules = [
    { id: 1, title: "段階的なシステムモデリング", progress: 40, type: "modeling" },
    { id: 2, title: "マイクロサービス境界設計", progress: 20, type: "microservice" },
    { id: 3, title: "要件抽象化", progress: 0, type: "requirements" }
  ];

  return (
    <div className="space-y-8">
      {/* ウェルカムセクション */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">こんにちは、{userData.name}さん</h1>
        <p className="text-gray-600 dark:text-gray-400">
          今日も抽象化スキルを向上させましょう。現在の進捗状況は以下の通りです。
        </p>
      </div>

      {/* 統計カード */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { title: "完了した演習", value: `${userData.completedExercises}/${userData.totalExercises}`, icon: "📝" },
          { title: "獲得ポイント", value: userData.points, icon: "🏆" },
          { title: "獲得バッジ", value: userData.badges, icon: "🥇" },
          { title: "総合進捗", value: `${Math.round((userData.completedExercises / userData.totalExercises) * 100)}%`, icon: "📊" }
        ].map((stat, index) => (
          <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center">
            <div className="text-3xl mr-4">{stat.icon}</div>
            <div>
              <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400">{stat.title}</h3>
              <p className="text-2xl font-semibold">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      {/* 最近のモジュール */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">最近のモジュール</h2>
          <Link
            href="/dashboard/modules"
            className="text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 text-sm"
          >
            すべて表示
          </Link>
        </div>
        <div className="space-y-4">
          {recentModules.map((module) => (
            <div key={module.id} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">{module.title}</h3>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {module.progress}% 完了
                </span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="bg-blue-600 h-2.5 rounded-full"
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
              <div className="mt-3 flex justify-end">
                <Link
                  href={`/dashboard/modules/${module.id}`}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  続ける
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 推奨モジュール */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h2 className="text-xl font-semibold mb-4">おすすめのモジュール</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { title: "データモデル正規化", description: "複雑なデータを構造化する演習", icon: "🗃️", difficulty: "中級" },
            { title: "マイクロサービス通信パターン", description: "サービス間の効率的な通信方法", icon: "🔄", difficulty: "上級" },
            { title: "ドメイン駆動設計入門", description: "ビジネスドメインに基づく設計手法", icon: "🏢", difficulty: "中級" }
          ].map((module, index) => (
            <div key={index} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
              <div className="text-3xl mb-2">{module.icon}</div>
              <h3 className="font-medium mb-1">{module.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{module.description}</p>
              <div className="flex justify-between items-center">
                <span className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full">
                  {module.difficulty}
                </span>
                <Link
                  href={`/dashboard/modules/${index + 4}`}
                  className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  開始する
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 