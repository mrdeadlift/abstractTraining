import mongoose, { Document, Schema } from 'mongoose';

export interface IExercise extends Document {
  moduleId: mongoose.Types.ObjectId;
  title: string;
  description: string;
  content: any;
  points: number;
  difficulty: number;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ExerciseSchema = new Schema<IExercise>(
  {
    moduleId: {
      type: Schema.Types.ObjectId,
      ref: 'TrainingModule',
      required: [true, 'モジュールIDが必要です']
    },
    title: {
      type: String,
      required: [true, 'エクササイズのタイトルを入力してください'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'エクササイズの説明を入力してください']
    },
    content: {
      type: Schema.Types.Mixed,
      required: [true, 'エクササイズのコンテンツを入力してください']
    },
    points: {
      type: Number,
      required: [true, 'ポイント値を設定してください'],
      min: 0
    },
    difficulty: {
      type: Number,
      required: [true, '難易度を設定してください'],
      min: 1,
      max: 5
    },
    order: {
      type: Number,
      required: [true, '表示順序を設定してください']
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model<IExercise>('Exercise', ExerciseSchema); 