import { Router } from 'express';
import Workout from '../models/Workout.js';

export const workoutsRouter = Router();

workoutsRouter.get('/', async (_request, response) => {
  try {
    const workouts = await Workout.find({}).sort({ difficulty: 1, durationMinutes: 1 });
    response.json({ message: 'Workouts endpoint', workouts });
  } catch (error) {
    response.status(500).json({ message: 'Error fetching workouts', error });
  }
});

workoutsRouter.post('/', async (request, response) => {
  try {
    const workout = await Workout.create(request.body);
    response.status(201).json({ message: 'Workout created', workout });
  } catch (error) {
    response.status(400).json({ message: 'Error creating workout', error });
  }
});
