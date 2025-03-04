import React, { useEffect } from 'react';
import { Typography, Box, Paper, Divider, Chip } from '@mui/material';
import { ExerciseContent as ExerciseContentType } from '../../types/exercise';
import mermaid from 'mermaid';

interface ExerciseContentProps {
  content: ExerciseContentType;
}

const ExerciseContent: React.FC<ExerciseContentProps> = ({ content }) => {
  useEffect(() => {
    // Mermaidの初期化
    mermaid.initialize({
      startOnLoad: true,
      theme: 'neutral',
    });
    
    // ダイアグラムの描画
    mermaid.contentLoaded();
  }, [content]);

  const renderContent = () => {
    switch (content.type) {
      case 'system_modeling':
        return renderSystemModeling();
      case 'microservice_boundary':
        return renderMicroserviceBoundary();
      case 'requirement_abstraction':
        return renderRequirementAbstraction();
      case 'data_normalization':
        return renderDataNormalization();
      default:
        return (
          <Typography>
            このエクササイズタイプはサポートされていません。
          </Typography>
        );
    }
  };

  const renderSystemModeling = () => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          システムモデリング
        </Typography>
        <Typography paragraph>{content.description}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" gutterBottom>
          指示:
        </Typography>
        <Typography paragraph>{content.instructions}</Typography>
        
        {content.initialData && content.initialData.diagram && (
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              初期ダイアグラム:
            </Typography>
            <div className="mermaid">{content.initialData.diagram}</div>
          </Box>
        )}
        
        {content.hints && content.hints.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              ヒント:
            </Typography>
            <ul>
              {content.hints.map((hint, index) => (
                <li key={index}>
                  <Typography>{hint}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    );
  };

  const renderMicroserviceBoundary = () => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          マイクロサービス境界設計
        </Typography>
        <Typography paragraph>{content.description}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" gutterBottom>
          指示:
        </Typography>
        <Typography paragraph>{content.instructions}</Typography>
        
        {content.initialData && (
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              初期データ:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
              <pre style={{ overflow: 'auto', margin: 0 }}>
                {JSON.stringify(content.initialData, null, 2)}
              </pre>
            </Paper>
          </Box>
        )}
        
        {content.hints && content.hints.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              ヒント:
            </Typography>
            <ul>
              {content.hints.map((hint, index) => (
                <li key={index}>
                  <Typography>{hint}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    );
  };

  const renderRequirementAbstraction = () => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          要件抽象化
        </Typography>
        <Typography paragraph>{content.description}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" gutterBottom>
          指示:
        </Typography>
        <Typography paragraph>{content.instructions}</Typography>
        
        {content.initialData && (
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              要件リスト:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
              <ul style={{ margin: 0 }}>
                {content.initialData.requirements.map((req: string, index: number) => (
                  <li key={index}>
                    <Typography>{req}</Typography>
                  </li>
                ))}
              </ul>
            </Paper>
          </Box>
        )}
        
        {content.hints && content.hints.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              ヒント:
            </Typography>
            <ul>
              {content.hints.map((hint, index) => (
                <li key={index}>
                  <Typography>{hint}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    );
  };

  const renderDataNormalization = () => {
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          データモデル正規化
        </Typography>
        <Typography paragraph>{content.description}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1" gutterBottom>
          指示:
        </Typography>
        <Typography paragraph>{content.instructions}</Typography>
        
        {content.initialData && (
          <Box sx={{ my: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              初期データモデル:
            </Typography>
            <Paper sx={{ p: 2, bgcolor: '#f5f5f5' }}>
              <pre style={{ overflow: 'auto', margin: 0 }}>
                {JSON.stringify(content.initialData, null, 2)}
              </pre>
            </Paper>
          </Box>
        )}
        
        {content.hints && content.hints.length > 0 && (
          <Box sx={{ mt: 3 }}>
            <Typography variant="subtitle1" gutterBottom>
              ヒント:
            </Typography>
            <ul>
              {content.hints.map((hint, index) => (
                <li key={index}>
                  <Typography>{hint}</Typography>
                </li>
              ))}
            </ul>
          </Box>
        )}
      </Box>
    );
  };

  return (
    <Paper className="exercise-content">
      {renderContent()}
    </Paper>
  );
};

export default ExerciseContent; 