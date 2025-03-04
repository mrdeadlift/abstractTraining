import React from 'react';
import { Typography, Box, Paper } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';

interface FeedbackDisplayProps {
  feedback: string[];
}

const FeedbackDisplay: React.FC<FeedbackDisplayProps> = ({ feedback }) => {
  // フィードバックの種類を判定する関数
  const getFeedbackType = (feedback: string): 'positive' | 'negative' | 'neutral' => {
    const positivePatterns = [
      '適切です',
      '明確です',
      '良い',
      '素晴らしい',
      '正確',
      '成功',
    ];
    
    const negativePatterns = [
      '改善',
      '検討',
      '注意',
      '問題',
      '失敗',
      '不足',
    ];
    
    if (positivePatterns.some(pattern => feedback.includes(pattern))) {
      return 'positive';
    }
    
    if (negativePatterns.some(pattern => feedback.includes(pattern))) {
      return 'negative';
    }
    
    return 'neutral';
  };
  
  // フィードバックタイプに応じたアイコンを返す
  const getFeedbackIcon = (type: 'positive' | 'negative' | 'neutral') => {
    switch (type) {
      case 'positive':
        return <CheckCircleOutlineIcon color="success" />;
      case 'negative':
        return <ErrorOutlineIcon color="error" />;
      case 'neutral':
        return <InfoOutlinedIcon color="info" />;
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography variant="h6" gutterBottom>
        フィードバック
      </Typography>
      
      {feedback.length === 0 ? (
        <Typography>フィードバックはありません。</Typography>
      ) : (
        feedback.map((item, index) => {
          const type = getFeedbackType(item);
          return (
            <Box
              key={index}
              className={`feedback-item ${type}`}
              sx={{
                display: 'flex',
                alignItems: 'flex-start',
                gap: 1,
                mb: 1,
              }}
            >
              {getFeedbackIcon(type)}
              <Typography>{item}</Typography>
            </Box>
          );
        })
      )}
    </Paper>
  );
};

export default FeedbackDisplay; 