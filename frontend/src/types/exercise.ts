export interface Exercise {
  _id: string;
  moduleId: string;
  title: string;
  description: string;
  content: ExerciseContent;
  points: number;
  difficulty: number;
  order: number;
  progress?: UserProgress;
}

export interface ExerciseContent {
  type: 'system_modeling' | 'microservice_boundary' | 'requirement_abstraction' | 'data_normalization';
  description: string;
  instructions: string;
  initialData?: any;
  expectedOutput?: any;
  hints?: string[];
}

export interface UserProgress {
  _id: string;
  userId: string;
  exerciseId: string;
  status: 'not_started' | 'in_progress' | 'completed';
  submission?: any;
  score: number;
  completedAt?: string;
}

export interface SubmissionResult {
  progress: UserProgress;
  score: number;
  feedback: string[];
  totalPoints: number;
  newBadges: Badge[];
} 