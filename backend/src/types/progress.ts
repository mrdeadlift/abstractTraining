export type ProgressStatus = 'not_started' | 'in_progress' | 'completed';

export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  totalExercises: number;
  completedExercises: number;
  progress: number;
  totalPoints: number;
}

export interface ExerciseProgress {
  exerciseId: string;
  exerciseTitle: string;
  status: ProgressStatus;
  score: number;
  completedAt?: Date;
} 