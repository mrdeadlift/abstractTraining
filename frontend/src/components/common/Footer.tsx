import React from 'react';
import { Box, Container, Typography, Link as MuiLink } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: 'auto',
        backgroundColor: (theme) =>
          theme.palette.mode === 'light'
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="sm">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} 抽象化トレーニング
        </Typography>
        <Typography variant="body2" color="text.secondary" align="center">
          プログラマーとシステム開発者のための抽象化能力向上プラットフォーム
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer; 