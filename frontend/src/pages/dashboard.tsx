import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  LinearProgress,
  Container,
  Alert,
  Divider,
  Avatar,
  Paper,
} from '@mui/material';
import Layout from '../components/common/Layout';
import { useAuth } from '../hooks/useAuth';
import { getUserProgress } from '../services/training';
import { ModuleProgress } from '../types/module';
import { Badge } from '../types/auth';

const Dashboard: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 認証されていない場合はログインページにリダイレクト
    if (!state.loading && !state.isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchProgress = async () => {
      try {
        setLoading(true);
        const progressData = await getUserProgress();
        setProgress(progressData);
      } catch (err: any) {
        setError(err.message || '進捗状況の取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    if (state.isAuthenticated) {
      fetchProgress();
    }
  }, [state.isAuthenticated, state.loading, router]);

  // 総合進捗率を計算
  const calculateOverallProgress = (): number => {
    if (progress.length === 0) return 0;
    
    const totalExercises = progress.reduce((sum, p) => sum + p.totalExercises, 0);
    const completedExercises = progress.reduce((sum, p) => sum + p.completedExercises, 0);
    
    return totalExercises > 0 ? (completedExercises / totalExercises) * 100 : 0;
  };

  // 総合ポイントを計算
  const calculateTotalPoints = (): number => {
    return progress.reduce((sum, p) => sum + p.totalPoints, 0);
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            ダッシュボード
          </Typography>
          <LinearProgress />
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Typography variant="h4" component="h1" gutterBottom>
          ダッシュボード
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {state.user && (
          <Grid container spacing={4}>
            {/* ユーザープロフィール */}
            <Grid item xs={12} md={4}>
              <Paper sx={{ p: 3, height: '100%' }}>
                <Box
                  sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    mb: 2,
                  }}
                >
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      bgcolor: 'primary.main',
                      fontSize: '2rem',
                      mb: 2,
                    }}
                  >
                    {state.user.name.charAt(0)}
                  </Avatar>
                  <Typography variant="h5" gutterBottom>
                    {state.user.name}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {state.user.email}
                  </Typography>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    ポイント: {state.user.points}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    獲得バッジ: {state.user.badges.length}
                  </Typography>
                  <Typography variant="body2">
                    総合進捗率: {calculateOverallProgress().toFixed(1)}%
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={calculateOverallProgress()}
                    sx={{ height: 8, borderRadius: 4, mt: 1 }}
                  />
                </Box>
              </Paper>
            </Grid>

            {/* 進捗サマリー */}
            <Grid item xs={12} md={8}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  モジュール進捗状況
                </Typography>
                {progress.length === 0 ? (
                  <Alert severity="info">
                    まだモジュールに取り組んでいません。モジュール一覧から始めましょう。
                  </Alert>
                ) : (
                  <Box>
                    {progress.map((moduleProgress) => (
                      <Box key={moduleProgress.moduleId} sx={{ mb: 3 }}>
                        <Box
                          sx={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            mb: 1,
                          }}
                        >
                          <Typography variant="subtitle1">
                            {moduleProgress.moduleName}
                          </Typography>
                          <Typography variant="body2">
                            {moduleProgress.completedExercises}/{moduleProgress.totalExercises} 完了
                          </Typography>
                        </Box>
                        <LinearProgress
                          variant="determinate"
                          value={moduleProgress.progress}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mt: 0.5 }}
                        >
                          獲得ポイント: {moduleProgress.totalPoints}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                )}
              </Paper>
            </Grid>

            {/* バッジ表示 */}
            <Grid item xs={12}>
              <Paper sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  獲得バッジ
                </Typography>
                {state.user.badges.length === 0 ? (
                  <Alert severity="info">
                    まだバッジを獲得していません。エクササイズに取り組んでバッジを集めましょう。
                  </Alert>
                ) : (
                  <Grid container spacing={2}>
                    {state.user.badges.map((badge: Badge) => (
                      <Grid item xs={6} sm={4} md={3} key={badge._id}>
                        <Card className="badge-card">
                          <CardContent
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              alignItems: 'center',
                              textAlign: 'center',
                            }}
                          >
                            <Avatar
                              src={badge.imageUrl || undefined}
                              sx={{
                                width: 60,
                                height: 60,
                                mb: 1,
                                bgcolor: 'secondary.main',
                              }}
                            >
                              {badge.name.charAt(0)}
                            </Avatar>
                            <Typography variant="subtitle1" gutterBottom>
                              {badge.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                              {badge.description}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Grid>
                    ))}
                  </Grid>
                )}
              </Paper>
            </Grid>
          </Grid>
        )}
      </Container>
    </Layout>
  );
};

export default Dashboard; 