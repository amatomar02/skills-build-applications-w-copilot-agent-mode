import { Router } from 'express';
import Team from '../models/Team.js';

export const teamsRouter = Router();

teamsRouter.get('/', async (_request, response) => {
  try {
    const teams = await Team.find({}).sort({ points: -1 });
    response.json({ message: 'Teams endpoint', teams });
  } catch (error) {
    response.status(500).json({ message: 'Error fetching teams', error });
  }
});

teamsRouter.post('/', async (request, response) => {
  try {
    const team = await Team.create(request.body);
    response.status(201).json({ message: 'Team created', team });
  } catch (error) {
    response.status(400).json({ message: 'Error creating team', error });
  }
});
