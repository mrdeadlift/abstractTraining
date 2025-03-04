import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  Button,
  Chip,
  Box,
  LinearProgress,
  Container,
  Alert,
} from '@mui/material';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../hooks/useAuth';
import { getModules, getUserProgress } from '../../services/training';
import { TrainingModule, ModuleProgress } from '../../types/module';

const ModulesPage: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();
  const [modules, setModules] = useState<TrainingModule[]>([]);
  const [progress, setProgress] = useState<ModuleProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const modulesData = await getModules();
        setModules(modulesData);

        if (state.isAuthenticated) {
          const progressData = await getUserProgress();
          setProgress(progressData);
        }
      } catch (err: any) {
        setError(err.message || 'モジュールの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [state.isAuthenticated]);

  // モジュールの進捗状況を取得
  const getModuleProgress = (moduleId: string) => {
    return progress.find((p) => p.moduleId === moduleId);
  };

  // 難易度を星で表示
  const renderDifficulty = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            トレーニングモジュール
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
          トレーニングモジュール
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3}>
          {modules.map((module) => {
            const moduleProgress = getModuleProgress(module._id);
            return (
              <Grid item xs={12} sm={6} md={4} key={module._id}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="div" gutterBottom>
                      {module.name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {module.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        mb: 1,
                      }}
                    >
                      <Chip
                        label={`難易度: ${renderDifficulty(module.difficulty)}`}
                        size="small"
                      />
                    </Box>
                    {moduleProgress && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" gutterBottom>
                          進捗状況: {moduleProgress.completedExercises}/
                          {moduleProgress.totalExercises} 完了
                        </Typography>
                        <LinearProgress
                          variant="determinate"
                          value={moduleProgress.progress}
                          sx={{ height: 8, borderRadius: 4 }}
                        />
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => router.push(`/modules/${module._id}`)}
                    >
                      詳細を見る
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Layout>
  );
};

export default ModulesPage; 