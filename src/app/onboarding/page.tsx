import Link from "next/link";

export default function OnboardingPage() {
  // 認証はミドルウェアで処理するため、ここでは簡略化
  const user = { firstName: "ユーザー" }; // 仮のユーザー情報

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 dark:bg-gray-900">
      <main className="flex-1 flex items-center justify-center p-6">
        <div className="w-full max-w-2xl bg-white dark:bg-gray-800 rounded-lg shadow-md p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold">ようこそ、{user.firstName}さん！</h1>
            <p className="text-gray-600 dark:text-gray-400 mt-2">
              抽象化トレーニングへようこそ。始める前に、あなたについて少し教えてください。
            </p>
          </div>

          <form className="space-y-6">
            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                開発経験
              </label>
              <select
                id="experience"
                name="experience"
                className="w-full px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                <option value="">選択してください</option>
                <option value="beginner">初級（1年未満）</option>
                <option value="intermediate">中級（1-3年）</option>
                <option value="advanced">上級（3-5年）</option>
                <option value="expert">エキスパート（5年以上）</option>
              </select>
            </div>

            <div>
              <label htmlFor="interests" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                興味のある分野（複数選択可）
              </label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {[
                  { id: "system_modeling", label: "システムモデリング" },
                  { id: "microservices", label: "マイクロサービス設計" },
                  { id: "requirements", label: "要件分析" },
                  { id: "data_modeling", label: "データモデリング" }
                ].map((interest) => (
                  <div key={interest.id} className="flex items-center">
                    <input
                      id={interest.id}
                      name="interests"
                      type="checkbox"
                      value={interest.id}
                      className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                    />
                    <label htmlFor={interest.id} className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                      {interest.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <Link
                href="/dashboard"
                className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                始める
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
} 