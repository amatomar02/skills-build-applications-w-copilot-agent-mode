import { Router } from 'express';
import Activity from '../models/Activity.js';

export const activitiesRouter = Router();

activitiesRouter.get('/', async (_request, response) => {
  try {
    const activities = await Activity.find({}).sort({ date: -1 });
    response.json({ message: 'Activities endpoint', activities });
  } catch (error) {
    response.status(500).json({ message: 'Error fetching activities', error });
  }
});

activitiesRouter.post('/', async (request, response) => {
  try {
    const activity = await Activity.create(request.body);
    response.status(201).json({ message: 'Activity created', activity });
  } catch (error) {
    response.status(400).json({ message: 'Error creating activity', error });
  }
});
