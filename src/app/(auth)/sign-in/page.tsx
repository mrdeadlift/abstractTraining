import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 px-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold">抽象化トレーニング</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">アカウントにログイン</p>
        </div>
        <SignIn
          appearance={{
            elements: {
              rootBox: "mx-auto",
              card: "bg-white dark:bg-gray-800 shadow-md rounded-lg",
            }
          }}
          redirectUrl="/dashboard"
        />
      </div>
    </div>
  );
} 