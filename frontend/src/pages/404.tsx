import React from 'react';
import { useRouter } from 'next/router';
import { Box, Button, Container, Typography } from '@mui/material';
import Layout from '../components/common/Layout';

const NotFound: React.FC = () => {
  const router = useRouter();

  return (
    <Layout>
      <Container>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '60vh',
            textAlign: 'center',
          }}
        >
          <Typography variant="h1" component="h1" gutterBottom>
            404
          </Typography>
          <Typography variant="h4" component="h2" gutterBottom>
            ページが見つかりません
          </Typography>
          <Typography variant="body1" sx={{ mb: 4 }}>
            お探しのページは存在しないか、移動した可能性があります。
          </Typography>
          <Button
            variant="contained"
            color="primary"
            onClick={() => router.push('/')}
          >
            ホームに戻る
          </Button>
        </Box>
      </Container>
    </Layout>
  );
};

export default NotFound; 