import { Router } from 'express';
import LeaderboardEntry from '../models/LeaderboardEntry.js';

export const leaderboardRouter = Router();

leaderboardRouter.get('/', async (_request, response) => {
  try {
    const leaderboard = await LeaderboardEntry.find({}).sort({ score: -1, rank: 1 });
    response.json({ message: 'Leaderboard endpoint', leaderboard });
  } catch (error) {
    response.status(500).json({ message: 'Error fetching leaderboard', error });
  }
});
