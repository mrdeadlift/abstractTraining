import app from './app';
import logger from './utils/logger';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  logger.info(`サーバーが起動しました: http://localhost:${PORT}`);
}); 