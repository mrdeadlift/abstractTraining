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
  Divider,
} from '@mui/material';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../hooks/useAuth';
import { getModuleById } from '../../services/training';
import { TrainingModule } from '../../types/module';
import { Exercise } from '../../types/exercise';

const ModuleDetailPage: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [module, setModule] = useState<TrainingModule | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchModule = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const moduleData = await getModuleById(id as string);
        setModule(moduleData);
      } catch (err: any) {
        setError(err.message || 'モジュールの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchModule();
  }, [id]);

  // 難易度を星で表示
  const renderDifficulty = (difficulty: number) => {
    return '★'.repeat(difficulty) + '☆'.repeat(5 - difficulty);
  };

  // 進捗状況に基づいて色を返す
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'in_progress':
        return 'info';
      default:
        return 'default';
    }
  };

  // 進捗状況のテキストを返す
  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '完了';
      case 'in_progress':
        return '進行中';
      default:
        return '未開始';
    }
  };

  if (loading) {
    return (
      <Layout>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            モジュール詳細
          </Typography>
          <LinearProgress />
        </Container>
      </Layout>
    );
  }

  if (error || !module) {
    return (
      <Layout>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            モジュール詳細
          </Typography>
          <Alert severity="error">{error || 'モジュールが見つかりません'}</Alert>
          <Button
            variant="outlined"
            sx={{ mt: 2 }}
            onClick={() => router.push('/modules')}
          >
            モジュール一覧に戻る
          </Button>
        </Container>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            {module.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            難易度: {renderDifficulty(module.difficulty)}
          </Typography>
          <Typography variant="body1" paragraph>
            {module.description}
          </Typography>
          <Divider sx={{ my: 3 }} />
        </Box>

        <Typography variant="h5" component="h2" gutterBottom>
          エクササイズ一覧
        </Typography>

        <Grid container spacing={3}>
          {module.exercises && module.exercises.length > 0 ? (
            module.exercises.map((exercise: Exercise) => (
              <Grid item xs={12} sm={6} key={exercise._id}>
                <Card>
                  <CardContent>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        mb: 1,
                      }}
                    >
                      <Typography variant="h6" component="div">
                        {exercise.title}
                      </Typography>
                      {exercise.progress && (
                        <Chip
                          label={getStatusText(exercise.progress.status)}
                          color={getStatusColor(exercise.progress.status) as any}
                          size="small"
                        />
                      )}
                    </Box>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2 }}
                    >
                      {exercise.description}
                    </Typography>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                      }}
                    >
                      <Chip
                        label={`${exercise.points}ポイント`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                      <Chip
                        label={`難易度: ${renderDifficulty(exercise.difficulty)}`}
                        size="small"
                      />
                    </Box>
                    {exercise.progress && exercise.progress.status === 'completed' && (
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="body2" color="success.main">
                          スコア: {exercise.progress.score} / {exercise.points}
                        </Typography>
                      </Box>
                    )}
                  </CardContent>
                  <CardActions>
                    <Button
                      size="small"
                      onClick={() => router.push(`/exercises/${exercise._id}`)}
                    >
                      {exercise.progress && exercise.progress.status === 'completed'
                        ? '結果を見る'
                        : '挑戦する'}
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Alert severity="info">
                このモジュールにはまだエクササイズがありません。
              </Alert>
            </Grid>
          )}
        </Grid>

        <Box sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            onClick={() => router.push('/modules')}
          >
            モジュール一覧に戻る
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default ModuleDetailPage; 