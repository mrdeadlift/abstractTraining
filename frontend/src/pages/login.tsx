import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Alert,
  Container,
} from '@mui/material';
import Layout from '../components/common/Layout';
import { useAuth } from '../hooks/useAuth';
import { UserLogin } from '../types/auth';

const Login: React.FC = () => {
  const { state, login, clearErrors } = useAuth();
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserLogin>();

  useEffect(() => {
    // すでに認証されている場合はダッシュボードにリダイレクト
    if (state.isAuthenticated) {
      router.push('/dashboard');
    }

    // エラーがある場合は表示
    if (state.error) {
      setShowError(true);
      const timer = setTimeout(() => {
        setShowError(false);
        clearErrors();
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [state.isAuthenticated, state.error, router, clearErrors]);

  const onSubmit: SubmitHandler<UserLogin> = async (data) => {
    await login(data.email, data.password);
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            ログイン
          </Typography>

          {showError && state.error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {state.error}
            </Alert>
          )}

          <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              autoComplete="email"
              autoFocus
              {...register('email', {
                required: 'メールアドレスを入力してください',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: '有効なメールアドレスを入力してください',
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="password"
              label="パスワード"
              type="password"
              autoComplete="current-password"
              {...register('password', {
                required: 'パスワードを入力してください',
                minLength: {
                  value: 6,
                  message: 'パスワードは6文字以上である必要があります',
                },
              })}
              error={!!errors.password}
              helperText={errors.password?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={state.loading}
            >
              {state.loading ? 'ログイン中...' : 'ログイン'}
            </Button>
            <Box textAlign="center">
              <Link href="/register" passHref>
                <Typography
                  component="a"
                  variant="body2"
                  sx={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  アカウントをお持ちでない方は登録してください
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Login; 