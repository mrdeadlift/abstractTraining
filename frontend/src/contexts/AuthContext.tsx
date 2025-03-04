import React, { createContext, useReducer, useEffect } from 'react';
import { AuthState, UserProfile } from '../types/auth';
import { getProfile } from '../services/auth';
import { jwtDecode } from 'jwt-decode';

// 初期状態
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null,
};

// アクションタイプ
type AuthAction =
  | { type: 'LOGIN_SUCCESS'; payload: { user: UserProfile; token: string } }
  | { type: 'REGISTER_SUCCESS'; payload: { user: UserProfile; token: string } }
  | { type: 'USER_LOADED'; payload: UserProfile }
  | { type: 'AUTH_ERROR' }
  | { type: 'LOGIN_FAIL'; payload: string }
  | { type: 'REGISTER_FAIL'; payload: string }
  | { type: 'LOGOUT' }
  | { type: 'CLEAR_ERRORS' };

// リデューサー
const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'USER_LOADED':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload,
        loading: false,
      };
    case 'LOGIN_SUCCESS':
    case 'REGISTER_SUCCESS':
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        loading: false,
      };
    case 'AUTH_ERROR':
    case 'LOGIN_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGOUT':
      localStorage.removeItem('token');
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        loading: false,
        error: action.type === 'LOGOUT' ? null : action.payload as string,
      };
    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: null,
      };
    default:
      return state;
  }
};

// コンテキスト作成
interface AuthContextProps {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  clearErrors: () => void;
}

export const AuthContext = createContext<AuthContextProps>({
  state: initialState,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  clearErrors: () => {},
});

// プロバイダーコンポーネント
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // トークンがある場合、ユーザー情報を読み込む
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem('token');

      if (!token) {
        dispatch({ type: 'AUTH_ERROR' });
        return;
      }

      try {
        // トークンの有効期限をチェック
        const decoded = jwtDecode(token);
        const currentTime = Date.now() / 1000;
        
        if (decoded.exp < currentTime) {
          dispatch({ type: 'AUTH_ERROR' });
          return;
        }

        const userData = await getProfile();
        dispatch({ type: 'USER_LOADED', payload: userData });
      } catch (err) {
        dispatch({ type: 'AUTH_ERROR' });
      }
    };

    loadUser();
  }, []);

  // ログイン
  const login = async (email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || 'ログインに失敗しました');
      }

      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user: data, token: data.token },
      });
    } catch (err: any) {
      dispatch({
        type: 'LOGIN_FAIL',
        payload: err.message,
      });
    }
  };

  // 登録
  const register = async (name: string, email: string, password: string) => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || '登録に失敗しました');
      }

      dispatch({
        type: 'REGISTER_SUCCESS',
        payload: { user: data, token: data.token },
      });
    } catch (err: any) {
      dispatch({
        type: 'REGISTER_FAIL',
        payload: err.message,
      });
    }
  };

  // ログアウト
  const logout = () => {
    dispatch({ type: 'LOGOUT' });
  };

  // エラークリア
  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' });
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        clearErrors,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}; 