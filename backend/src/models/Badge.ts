import mongoose, { Document, Schema } from 'mongoose';

export interface IBadge extends Document {
  name: string;
  description: string;
  imageUrl: string;
  criteria: any;
  createdAt: Date;
  updatedAt: Date;
}

const BadgeSchema = new Schema<IBadge>(
  {
    name: {
      type: String,
      required: [true, 'バッジ名を入力してください'],
      trim: true,
      unique: true
    },
    description: {
      type: String,
      required: [true, 'バッジの説明を入力してください']
    },
    imageUrl: {
      type: String,
      required: [true, 'バッジ画像のURLを入力してください']
    },
    criteria: {
      type: Schema.Types.Mixed,
      required: [true, '獲得条件を設定してください']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IBadge>('Badge', BadgeSchema); 