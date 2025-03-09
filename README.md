# 抽象化トレーニング Web アプリケーション

プログラマーやシステム開発者向けの抽象化能力を体系的に向上させるためのトレーニングプラットフォームです。

## 主要機能

- **ユーザー登録・認証システム**: Clerk を使用した安全な認証
- **トレーニングモジュール**:
  - 段階的なシステムモデリング: 具体的な実装から抽象レベルを段階的に上げていく演習
  - マイクロサービス境界設計: モノリシックシステムをサービスに分割する演習
  - 要件抽象化: 詳細な仕様書から本質的要件を抽出する演習
  - データモデル正規化: 複雑なデータを構造化する演習
- **進捗追跡とフィードバックシステム**: 学習の進捗を視覚的に確認
- **ゲーミフィケーション要素**: バッジ、ポイントなどのモチベーション向上機能

## 技術スタック

- **フロントエンド**: Next.js + TypeScript, Tailwind CSS, shadcn/ui
- **バックエンド**: Node.js + TypeScript, Prisma
- **認証**: Clerk
- **データベース**: MongoDB
- **図表作成ツール**: mermaid.js

## 開発環境のセットアップ

1. リポジトリをクローン

   ```
   git clone https://github.com/yourusername/abstract-training.git
   cd abstract-training
   ```

2. 依存関係のインストール

   ```
   npm install
   ```

3. 環境変数の設定
   `.env`ファイルを作成し、以下の変数を設定:

   ```
   DATABASE_URL="mongodb+srv://username:password@cluster.mongodb.net/abstract-training?retryWrites=true&w=majority"
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_publishable_key
   CLERK_SECRET_KEY=your_secret_key
   ```

4. 開発サーバーの起動

   ```
   npm run dev
   ```

5. ブラウザで `http://localhost:3000` にアクセス

## プロジェクト構造

```
abstract-training/
├── prisma/              # Prismaスキーマと設定
├── public/              # 静的ファイル
├── src/
│   ├── app/             # Next.js App Router
│   │   ├── (auth)/      # 認証関連ページ
│   │   ├── (dashboard)/ # ダッシュボード関連ページ
│   │   ├── api/         # APIエンドポイント
│   │   └── onboarding/  # オンボーディングページ
│   ├── components/      # UIコンポーネント
│   │   ├── ui/          # 基本UIコンポーネント
│   │   └── shared/      # 共有コンポーネント
│   ├── hooks/           # カスタムフック
│   └── lib/             # ユーティリティ関数
└── middleware.ts        # Next.js ミドルウェア
```

## ライセンス

MIT
