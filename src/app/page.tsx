import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* ヘッダー */}
      <header className="w-full py-4 px-6 bg-white dark:bg-gray-900 border-b">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <h1 className="text-2xl font-bold">抽象化トレーニング</h1>
          <div className="flex gap-4">
            <Link 
              href="/sign-in" 
              className="px-4 py-2 rounded-md text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              ログイン
            </Link>
            <Link 
              href="/sign-up" 
              className="px-4 py-2 rounded-md bg-blue-600 text-white hover:bg-blue-700"
            >
              登録
            </Link>
          </div>
        </div>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1">
        {/* ヒーローセクション */}
        <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800">
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1 space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold leading-tight">
                抽象化能力を体系的に向上させる<br />トレーニングプラットフォーム
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">
                プログラマーやシステム開発者のための実践的な抽象化スキルトレーニング
              </p>
              <div className="flex gap-4 pt-4">
                <Link 
                  href="/sign-up" 
                  className="px-6 py-3 rounded-md bg-blue-600 text-white hover:bg-blue-700 font-medium"
                >
                  無料で始める
                </Link>
                <Link 
                  href="#features" 
                  className="px-6 py-3 rounded-md border border-gray-300 dark:border-gray-600 hover:bg-gray-100 dark:hover:bg-gray-800 font-medium"
                >
                  詳細を見る
                </Link>
              </div>
            </div>
            <div className="flex-1">
              <div className="relative w-full h-80 md:h-96 bg-gray-200 dark:bg-gray-700 rounded-lg overflow-hidden">
                <div className="absolute inset-0 flex items-center justify-center text-gray-500 dark:text-gray-400">
                  抽象化トレーニングのイメージ図
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 特徴セクション */}
        <section id="features" className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">トレーニングモジュール</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "段階的なシステムモデリング",
                  description: "具体的な実装から抽象レベルを段階的に上げていく演習",
                  icon: "🏗️"
                },
                {
                  title: "マイクロサービス境界設計",
                  description: "モノリシックシステムをサービスに分割する演習",
                  icon: "🧩"
                },
                {
                  title: "要件抽象化",
                  description: "詳細な仕様書から本質的要件を抽出する演習",
                  icon: "📝"
                },
                {
                  title: "データモデル正規化",
                  description: "複雑なデータを構造化する演習",
                  icon: "🗃️"
                }
              ].map((feature, index) => (
                <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
                  <div className="text-4xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* フッター */}
      <footer className="w-full py-6 px-6 bg-gray-100 dark:bg-gray-900 border-t">
        <div className="max-w-7xl mx-auto text-center text-gray-600 dark:text-gray-400">
          <p>© 2024 抽象化トレーニング. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
