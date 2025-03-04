import mongoose, { Document, Schema } from 'mongoose';

export interface ITrainingModule extends Document {
  name: string;
  description: string;
  difficulty: number;
  order: number;
  exercises: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const TrainingModuleSchema = new Schema<ITrainingModule>(
  {
    name: {
      type: String,
      required: [true, 'モジュール名を入力してください'],
      trim: true
    },
    description: {
      type: String,
      required: [true, 'モジュールの説明を入力してください']
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
    },
    exercises: [{
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }]
  },
  {
    timestamps: true
  }
);

export default mongoose.model<ITrainingModule>('TrainingModule', TrainingModuleSchema); 