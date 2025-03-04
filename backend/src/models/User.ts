import mongoose, { Document, Schema } from 'mongoose';
import bcrypt from 'bcryptjs';

export interface IUser extends Document {
  email: string;
  password: string;
  name: string;
  points: number;
  badges: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>(
  {
    email: {
      type: String,
      required: [true, 'メールアドレスを入力してください'],
      unique: true,
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'メールアドレスの形式が正しくありません']
    },
    password: {
      type: String,
      required: [true, 'パスワードを入力してください'],
      minlength: [6, 'パスワードは6文字以上である必要があります']
    },
    name: {
      type: String,
      required: [true, '名前を入力してください'],
      trim: true
    },
    points: {
      type: Number,
      default: 0
    },
    badges: [{
      type: Schema.Types.ObjectId,
      ref: 'Badge'
    }]
  },
  {
    timestamps: true
  }
);

// パスワードハッシュ化
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error: any) {
    next(error);
  }
});

// パスワード検証メソッド
UserSchema.methods.comparePassword = async function(candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

export default mongoose.model<IUser>('User', UserSchema); 