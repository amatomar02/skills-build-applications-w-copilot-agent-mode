import { Router } from 'express';
import User from '../models/User.js';

export const usersRouter = Router();

usersRouter.get('/', async (_request, response) => {
  try {
    const users = await User.find({}).sort({ score: -1 });
    response.json({ message: 'Users endpoint', users });
  } catch (error) {
    response.status(500).json({ message: 'Error fetching users', error });
  }
});

usersRouter.post('/', async (request, response) => {
  try {
    const user = await User.create(request.body);
    response.status(201).json({ message: 'User created', user });
  } catch (error) {
    response.status(400).json({ message: 'Error creating user', error });
  }
});
