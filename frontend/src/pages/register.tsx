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
import { UserRegistration } from '../types/auth';

const Register: React.FC = () => {
  const { state, register: registerUser, clearErrors } = useAuth();
  const router = useRouter();
  const [showError, setShowError] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<UserRegistration & { confirmPassword: string }>();

  const password = watch('password');

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

  const onSubmit: SubmitHandler<UserRegistration & { confirmPassword: string }> = async (data) => {
    const { name, email, password } = data;
    await registerUser(name, email, password);
  };

  return (
    <Layout>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ p: 4, mt: 4 }}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            アカウント登録
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
              id="name"
              label="名前"
              autoComplete="name"
              autoFocus
              {...register('name', {
                required: '名前を入力してください',
                minLength: {
                  value: 2,
                  message: '名前は2文字以上である必要があります',
                },
              })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="メールアドレス"
              autoComplete="email"
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
              autoComplete="new-password"
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
            <TextField
              margin="normal"
              required
              fullWidth
              id="confirmPassword"
              label="パスワード（確認）"
              type="password"
              autoComplete="new-password"
              {...register('confirmPassword', {
                required: 'パスワードを再入力してください',
                validate: (value) =>
                  value === password || 'パスワードが一致しません',
              })}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword?.message}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={state.loading}
            >
              {state.loading ? '登録中...' : '登録'}
            </Button>
            <Box textAlign="center">
              <Link href="/login" passHref>
                <Typography
                  component="a"
                  variant="body2"
                  sx={{ cursor: 'pointer', textDecoration: 'none' }}
                >
                  すでにアカウントをお持ちの方はログインしてください
                </Typography>
              </Link>
            </Box>
          </Box>
        </Paper>
      </Container>
    </Layout>
  );
};

export default Register; 