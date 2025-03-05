class AppError extends Error {
  statusCode: number;
  status: string;
  isOperational: boolean;
  code?: number; // MongoDBの重複キーエラー用のプロパティを追加

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    
    // TypeScriptの型チェックを回避するために型アサーションを使用
    (Error as any).captureStackTrace(this, this.constructor);
  }
}

export default AppError; 