import cors from 'cors';
import express from 'express';
import { connectDatabase } from './config/database.js';
import { usersRouter } from './routes/users.js';
import { teamsRouter } from './routes/teams.js';
import { activitiesRouter } from './routes/activities.js';
import { leaderboardRouter } from './routes/leaderboard.js';
import { workoutsRouter } from './routes/workouts.js';

const app = express();
const port = Number(process.env.PORT || 8000);
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

const frontendPort = 5173;
const allowedOrigins = codespaceName
  ? [`https://${codespaceName}-${frontendPort}.app.github.dev`]
  : [`http://localhost:${frontendPort}`, `http://127.0.0.1:${frontendPort}`];

app.use(cors({ origin: allowedOrigins }));
app.use(express.json());

app.get('/api', (_request, response) => {
  response.json({
    message: 'OctoFit Tracker API',
    baseUrl,
    allowedOrigins,
    endpoints: [
      '/api/users',
      '/api/teams',
      '/api/activities',
      '/api/leaderboard',
      '/api/workouts',
      '/api/health',
    ],
  });
});

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok' });
});

app.use('/api/users', usersRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => {
      console.log(`OctoFit API listening on port ${port}`);
      console.log(`Base URL: ${baseUrl}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

startServer();

export default app;