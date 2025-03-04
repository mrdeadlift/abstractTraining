import { Exercise } from './exercise';

export interface TrainingModule {
  _id: string;
  name: string;
  description: string;
  difficulty: number;
  order: number;
  exercises?: Exercise[];
  progress?: ModuleProgress[];
}

export interface ModuleProgress {
  moduleId: string;
  moduleName: string;
  totalExercises: number;
  completedExercises: number;
  progress: number;
  totalPoints: number;
} 