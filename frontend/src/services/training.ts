import api from './api';

// モジュール関連
export const getModules = async () => {
  const response = await api.get('/training/modules');
  return response.data;
};

export const getModuleById = async (id: string) => {
  const response = await api.get(`/training/modules/${id}`);
  return response.data;
};

// エクササイズ関連
export const getExerciseById = async (id: string) => {
  const response = await api.get(`/training/exercises/${id}`);
  return response.data;
};

export const submitExercise = async (exerciseId: string, submission: any) => {
  const response = await api.post(`/training/exercises/${exerciseId}/submit`, { submission });
  return response.data;
};

// 進捗関連
export const getUserProgress = async () => {
  const response = await api.get('/user/progress');
  return response.data;
};

export const getModuleProgress = async (moduleId: string) => {
  const response = await api.get(`/user/progress/modules/${moduleId}`);
  return response.data;
}; 