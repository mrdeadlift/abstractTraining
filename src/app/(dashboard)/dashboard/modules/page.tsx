import Link from "next/link";

export default function ModulesPage() {
  // 仮のモジュールデータ
  const modules = [
    {
      id: 1,
      title: "段階的なシステムモデリング",
      description: "具体的な実装から抽象レベルを段階的に上げていく演習",
      exercises: 5,
      difficulty: "初級",
      icon: "🏗️",
      progress: 40,
      type: "modeling"
    },
    {
      id: 2,
      title: "マイクロサービス境界設計",
      description: "モノリシックシステムをサービスに分割する演習",
      exercises: 4,
      difficulty: "中級",
      icon: "🧩",
      progress: 20,
      type: "microservice"
    },
    {
      id: 3,
      title: "要件抽象化",
      description: "詳細な仕様書から本質的要件を抽出する演習",
      exercises: 6,
      difficulty: "中級",
      icon: "📝",
      progress: 0,
      type: "requirements"
    },
    {
      id: 4,
      title: "データモデル正規化",
      description: "複雑なデータを構造化する演習",
      exercises: 5,
      difficulty: "中級",
      icon: "🗃️",
      progress: 0,
      type: "data_model"
    },
    {
      id: 5,
      title: "マイクロサービス通信パターン",
      description: "サービス間の効率的な通信方法を学ぶ",
      exercises: 4,
      difficulty: "上級",
      icon: "🔄",
      progress: 0,
      type: "microservice"
    },
    {
      id: 6,
      title: "ドメイン駆動設計入門",
      description: "ビジネスドメインに基づく設計手法を学ぶ",
      exercises: 7,
      difficulty: "中級",
      icon: "🏢",
      progress: 0,
      type: "modeling"
    }
  ];

  return (
    <div className="space-y-8">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <h1 className="text-2xl font-bold mb-2">トレーニングモジュール</h1>
        <p className="text-gray-600 dark:text-gray-400">
          抽象化スキルを向上させるための様々なトレーニングモジュールを提供しています。
          あなたのレベルや興味に合わせて選択してください。
        </p>
      </div>

      {/* フィルターとソートオプション */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-4 flex flex-wrap gap-2">
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">難易度:</span>
          <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 px-2 py-1">
            <option value="all">すべて</option>
            <option value="beginner">初級</option>
            <option value="intermediate">中級</option>
            <option value="advanced">上級</option>
          </select>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">タイプ:</span>
          <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 px-2 py-1">
            <option value="all">すべて</option>
            <option value="modeling">モデリング</option>
            <option value="microservice">マイクロサービス</option>
            <option value="requirements">要件分析</option>
            <option value="data_model">データモデル</option>
          </select>
        </div>
        <div className="flex items-center">
          <span className="text-sm font-medium mr-2">並び順:</span>
          <select className="text-sm border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 px-2 py-1">
            <option value="recommended">おすすめ順</option>
            <option value="difficulty_asc">難易度（易しい順）</option>
            <option value="difficulty_desc">難易度（難しい順）</option>
            <option value="progress">進捗順</option>
          </select>
        </div>
      </div>

      {/* モジュール一覧 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {modules.map((module) => (
          <div key={module.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="p-6">
              <div className="flex items-center mb-4">
                <div className="text-4xl mr-3">{module.icon}</div>
                <div>
                  <h3 className="font-semibold">{module.title}</h3>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded-full">
                    {module.difficulty}
                  </span>
                </div>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-4">
                {module.description}
              </p>
              <div className="flex justify-between text-sm text-gray-500 dark:text-gray-400 mb-3">
                <span>{module.exercises} 演習</span>
                <span>{module.progress}% 完了</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2 mb-4">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{ width: `${module.progress}%` }}
                ></div>
              </div>
              <Link
                href={`/dashboard/modules/${module.id}`}
                className="block w-full text-center py-2 px-4 bg-blue-600 hover:bg-blue-700 text-white rounded-md"
              >
                {module.progress > 0 ? "続ける" : "開始する"}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 