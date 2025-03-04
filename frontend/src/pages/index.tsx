import React from 'react';
import { useRouter } from 'next/router';
import {
  Typography,
  Button,
  Container,
  Box,
  Grid,
  Card,
  CardContent,
  CardActions,
  Paper,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import StorageIcon from '@mui/icons-material/Storage';
import PsychologyIcon from '@mui/icons-material/Psychology';
import Layout from '../components/common/Layout';
import { useAuth } from '../hooks/useAuth';

const Home: React.FC = () => {
  const { state } = useAuth();
  const router = useRouter();

  return (
    <Layout>
      {/* ヒーローセクション */}
      <Paper
        sx={{
          position: 'relative',
          backgroundColor: 'primary.main',
          color: '#fff',
          mb: 4,
          py: 6,
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography
                component="h1"
                variant="h2"
                color="inherit"
                gutterBottom
              >
                抽象化トレーニング
              </Typography>
              <Typography variant="h5" color="inherit" paragraph>
                プログラマーとシステム開発者のための抽象化能力向上プラットフォーム。
                実践的なエクササイズを通じて、より良いシステム設計スキルを身につけましょう。
              </Typography>
              <Box sx={{ mt: 4 }}>
                {state.isAuthenticated ? (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => router.push('/modules')}
                  >
                    トレーニングを始める
                  </Button>
                ) : (
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    onClick={() => router.push('/register')}
                  >
                    無料で登録する
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                }}
              >
                <img
                  src="/images/hero-image.svg"
                  alt="抽象化トレーニング"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Paper>

      {/* 特徴セクション */}
      <Container sx={{ py: 8 }} maxWidth="lg">
        <Typography
          component="h2"
          variant="h3"
          align="center"
          color="text.primary"
          gutterBottom
        >
          抽象化スキルを磨く
        </Typography>
        <Typography
          variant="h5"
          align="center"
          color="text.secondary"
          paragraph
        >
          抽象化は優れたソフトウェア設計の基礎です。
          私たちのプラットフォームでは、実践的なエクササイズを通じて抽象化スキルを向上させることができます。
        </Typography>

        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <SchoolIcon color="primary" sx={{ fontSize: 60 }} />
                </Box>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  段階的な学習
                </Typography>
                <Typography>
                  初心者から上級者まで、レベルに合わせたトレーニングモジュールで着実にスキルアップできます。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <ArchitectureIcon color="primary" sx={{ fontSize: 60 }} />
                </Box>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  システムモデリング
                </Typography>
                <Typography>
                  複雑なシステムを適切な抽象度でモデル化するスキルを身につけ、全体像を把握する力を養います。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <StorageIcon color="primary" sx={{ fontSize: 60 }} />
                </Box>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  データモデリング
                </Typography>
                <Typography>
                  データの正規化と抽象化を通じて、効率的で拡張性の高いデータモデルを設計する能力を磨きます。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    mb: 2,
                  }}
                >
                  <PsychologyIcon color="primary" sx={{ fontSize: 60 }} />
                </Box>
                <Typography gutterBottom variant="h5" component="h3" align="center">
                  要件抽象化
                </Typography>
                <Typography>
                  具体的な要件から本質的な要素を抽出し、汎用的な解決策を導き出す思考法を学びます。
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        <Box sx={{ mt: 6, textAlign: 'center' }}>
          <Button
            variant="outlined"
            size="large"
            onClick={() => router.push('/modules')}
          >
            トレーニングモジュールを見る
          </Button>
        </Box>
      </Container>

      {/* CTAセクション */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          pt: 8,
          pb: 6,
        }}
      >
        <Container maxWidth="sm">
          <Typography
            component="h2"
            variant="h4"
            align="center"
            color="text.primary"
            gutterBottom
          >
            今すぐ始めましょう
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            抽象化スキルを磨いて、より良いソフトウェア設計者になりましょう。
            無料で登録して、トレーニングを始めることができます。
          </Typography>
          <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
            {state.isAuthenticated ? (
              <Button
                variant="contained"
                color="primary"
                size="large"
                onClick={() => router.push('/dashboard')}
              >
                ダッシュボードへ
              </Button>
            ) : (
              <>
                <Button
                  variant="contained"
                  color="primary"
                  sx={{ mx: 1 }}
                  onClick={() => router.push('/register')}
                >
                  登録する
                </Button>
                <Button
                  variant="outlined"
                  color="primary"
                  sx={{ mx: 1 }}
                  onClick={() => router.push('/login')}
                >
                  ログイン
                </Button>
              </>
            )}
          </Box>
        </Container>
      </Box>
    </Layout>
  );
};

export default Home; 