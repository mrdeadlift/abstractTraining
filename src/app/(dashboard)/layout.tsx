import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* サイドバー */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold">抽象化トレーニング</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link
                href="/dashboard"
                className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                ダッシュボード
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/modules"
                className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                トレーニングモジュール
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/progress"
                className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                進捗状況
              </Link>
            </li>
            <li>
              <Link
                href="/dashboard/achievements"
                className="block px-4 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
              >
                実績
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* メインコンテンツ */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* ヘッダー */}
        <header className="bg-white dark:bg-gray-800 shadow-sm">
          <div className="px-6 py-4 flex justify-between items-center">
            <h2 className="text-lg font-semibold">ダッシュボード</h2>
            <UserButton afterSignOutUrl="/" />
          </div>
        </header>

        {/* コンテンツエリア */}
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );
} 