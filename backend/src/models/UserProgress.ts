import mongoose, { Document, Schema } from 'mongoose';

export interface IUserProgress extends Document {
  userId: mongoose.Types.ObjectId;
  exerciseId: mongoose.Types.ObjectId;
  status: 'not_started' | 'in_progress' | 'completed';
  submission: any;
  score: number;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserProgressSchema = new Schema<IUserProgress>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'ユーザーIDが必要です']
    },
    exerciseId: {
      type: Schema.Types.ObjectId,
      ref: 'Exercise',
      required: [true, 'エクササイズIDが必要です']
    },
    status: {
      type: String,
      enum: ['not_started', 'in_progress', 'completed'],
      default: 'not_started'
    },
    submission: {
      type: Schema.Types.Mixed,
      default: null
    },
    score: {
      type: Number,
      default: 0,
      min: 0
    },
    completedAt: {
      type: Date,
      default: null
    }
  },
  {
    timestamps: true
  }
);

// ユーザーとエクササイズの組み合わせはユニークである必要がある
UserProgressSchema.index({ userId: 1, exerciseId: 1 }, { unique: true });

export default mongoose.model<IUserProgress>('UserProgress', UserProgressSchema); 