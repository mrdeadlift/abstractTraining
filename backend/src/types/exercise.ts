export interface ExerciseContent {
  type: 'system_modeling' | 'microservice_boundary' | 'requirement_abstraction' | 'data_normalization';
  description: string;
  instructions: string;
  initialData?: any;
  expectedOutput?: any;
  hints?: string[];
}

export interface ExerciseSubmission {
  content: any;
  notes?: string;
} 