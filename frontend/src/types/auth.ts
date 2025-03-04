export interface UserLogin {
  email: string;
  password: string;
}

export interface UserRegistration {
  name: string;
  email: string;
  password: string;
}

export interface UserProfile {
  _id: string;
  name: string;
  email: string;
  points: number;
  badges: Badge[];
}

export interface Badge {
  _id: string;
  name: string;
  description: string;
  imageUrl: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: UserProfile | null;
  loading: boolean;
  error: string | null;
} 