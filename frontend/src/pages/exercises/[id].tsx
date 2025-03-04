import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  Box,
  Paper,
  Button,
  Divider,
  Chip,
  LinearProgress,
  Container,
  Alert,
  TextField,
  Card,
  CardContent,
} from '@mui/material';
import Layout from '../../components/common/Layout';
import { useAuth } from '../../hooks/useAuth';
import { getExerciseById, submitExercise } from '../../services/training';
import { Exercise, SubmissionResult } from '../../types/exercise';
import ExerciseContent from '../../components/exercises/ExerciseContent';
import FeedbackDisplay from '../../components/exercises/FeedbackDisplay';

const ExercisePage: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [submission, setSubmission] = useState<string>('');
  const [result, setResult] = useState<SubmissionResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchExercise = async () => {
      if (!id) return;

      try {
        setLoading(true);
        const exerciseData = await getExerciseById(id as string);
        setExercise(exerciseData);
        
        // 既存の回答があれば設定
        if (exerciseData.progress && exerciseData.progress.submission) {
          setSubmission(JSON.stringify(exerciseData.progress.submission, null, 2));
        }
      } catch (err: any) {
        setError(err.message || 'エクササイズの取得に失敗しました');
      } finally {
        setLoading(false);
      }
    };

    fetchExercise();
  }, [id]);

  const handleSubmit = async () => {
    if (!exercise || !state.isAuthenticated) return;

    try {
      setSubmitting(true);
      let submissionData;
      
      try {
        submissionData = JSON.parse(submission);
      } catch (err) {
        setError('無効なJSON形式です。正しいJSONを入力してください。');
        setSubmitting(false);
        return;
      }
      
      const result = await submitExercise(exercise._id, submissionData);
      setResult(result);
    } catch (err: any) {
      setError(err.message || '回答の提出に失敗しました');
    } finally {
      setSubmitting(false);
    }
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
            エクササイズ
          </Typography>
          <LinearProgress />
        </Container>
      </Layout>
    );
  }

  if (error || !exercise) {
    return (
      <Layout>
        <Container>
          <Typography variant="h4" component="h1" gutterBottom>
            エクササイズ
          </Typography>
          <Alert severity="error">{error || 'エクササイズが見つかりません'}</Alert>
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
            {exercise.title}
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
            <Chip
              label={`${exercise.points}ポイント`}
              color="primary"
              variant="outlined"
            />
            <Chip
              label={`難易度: ${renderDifficulty(exercise.difficulty)}`}
            />
          </Box>
          <Typography variant="body1" paragraph>
            {exercise.description}
          </Typography>
          <Divider sx={{ my: 3 }} />
        </Box>

        <ExerciseContent content={exercise.content} />

        {!result && (
          <Paper sx={{ p: 3, mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              回答を提出
            </Typography>
            {!state.isAuthenticated ? (
              <Alert severity="warning" sx={{ mb: 2 }}>
                回答を提出するには<Button onClick={() => router.push('/login')}>ログイン</Button>してください。
              </Alert>
            ) : (
              <>
                {error && (
                  <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                  </Alert>
                )}
                <TextField
                  fullWidth
                  multiline
                  rows={10}
                  variant="outlined"
                  value={submission}
                  onChange={(e) => setSubmission(e.target.value)}
                  placeholder="JSONフォーマットで回答を入力してください"
                  sx={{ mb: 2, fontFamily: 'monospace' }}
                />
                <Button
                  variant="contained"
                  onClick={handleSubmit}
                  disabled={submitting}
                >
                  {submitting ? '提出中...' : '回答を提出'}
                </Button>
              </>
            )}
          </Paper>
        )}

        {result && (
          <Box sx={{ mt: 4 }}>
            <Typography variant="h5" gutterBottom>
              評価結果
            </Typography>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" color="primary" gutterBottom>
                  スコア: {result.score} / {exercise.points}
                </Typography>
                <Typography variant="body2" gutterBottom>
                  合計ポイント: {result.totalPoints}
                </Typography>
                {result.newBadges && result.newBadges.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      新しいバッジを獲得しました！
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 2 }}>
                      {result.newBadges.map((badge) => (
                        <Chip
                          key={badge._id}
                          label={badge.name}
                          color="secondary"
                          sx={{ fontWeight: 'bold' }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
              </CardContent>
            </Card>

            <FeedbackDisplay feedback={result.feedback} />

            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              <Button
                variant="outlined"
                onClick={() => {
                  setResult(null);
                  setSubmission(JSON.stringify(result.progress.submission, null, 2));
                }}
              >
                回答を編集
              </Button>
              <Button
                variant="outlined"
                onClick={() => router.push(`/modules/${exercise.moduleId}`)}
              >
                モジュールに戻る
              </Button>
            </Box>
          </Box>
        )}
      </Container>
    </Layout>
  );
};

export default ExercisePage; 