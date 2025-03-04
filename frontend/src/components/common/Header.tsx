import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Avatar } from '@mui/material';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '../../hooks/useAuth';

const Header: React.FC = () => {
  const { state, logout } = useAuth();
  const router = useRouter();
  const { isAuthenticated, user } = state;

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Link href="/" passHref>
          <Typography
            variant="h6"
            component="a"
            sx={{
              flexGrow: 1,
              textDecoration: 'none',
              color: 'inherit',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            抽象化トレーニング
          </Typography>
        </Link>

        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {isAuthenticated ? (
            <>
              <Link href="/modules" passHref>
                <Button color="inherit" component="a">
                  モジュール
                </Button>
              </Link>
              <Link href="/dashboard" passHref>
                <Button color="inherit" component="a">
                  ダッシュボード
                </Button>
              </Link>
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {user?.points}ポイント
                </Typography>
                <Avatar
                  sx={{ width: 32, height: 32, bgcolor: 'secondary.main' }}
                >
                  {user?.name.charAt(0)}
                </Avatar>
                <Button color="inherit" onClick={handleLogout} sx={{ ml: 2 }}>
                  ログアウト
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Link href="/login" passHref>
                <Button color="inherit" component="a">
                  ログイン
                </Button>
              </Link>
              <Link href="/register" passHref>
                <Button color="inherit" component="a">
                  登録
                </Button>
              </Link>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header; 