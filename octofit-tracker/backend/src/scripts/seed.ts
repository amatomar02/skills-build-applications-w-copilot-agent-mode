import mongoose from 'mongoose';
import User from '../models/User.js';
import Team from '../models/Team.js';
import Activity from '../models/Activity.js';
import LeaderboardEntry from '../models/LeaderboardEntry.js';
import Workout from '../models/Workout.js';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');

    await Promise.all([
      User.deleteMany({}),
      Team.deleteMany({}),
      Activity.deleteMany({}),
      LeaderboardEntry.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const users = await User.insertMany([
      {
        name: 'Alice Johnson',
        email: 'alice.johnson@octofit.com',
        age: 16,
        role: 'Athlete',
        team: 'Trail Blazers',
        score: 980,
        weeklyGoal: 180,
      },
      {
        name: 'Marcus Lee',
        email: 'marcus.lee@octofit.com',
        age: 17,
        role: 'Athlete',
        team: 'Velocity Squad',
        score: 940,
        weeklyGoal: 200,
      },
      {
        name: 'Priya Singh',
        email: 'priya.singh@octofit.com',
        age: 15,
        role: 'Athlete',
        team: 'Trail Blazers',
        score: 915,
        weeklyGoal: 165,
      },
      {
        name: 'Jessica Cat',
        email: 'jessica.cat@octofit.com',
        age: 30,
        role: 'Coach',
        team: 'Trail Blazers',
        score: 0,
        weeklyGoal: 60,
      },
    ]);

    const teams = await Team.insertMany([
      {
        name: 'Trail Blazers',
        sport: 'Cross Country',
        captain: 'Alice Johnson',
        membersCount: 12,
        points: 1480,
      },
      {
        name: 'Velocity Squad',
        sport: 'Basketball',
        captain: 'Marcus Lee',
        membersCount: 9,
        points: 1365,
      },
    ]);

    await Activity.insertMany([
      {
        user: users[0].name,
        type: 'Running',
        durationMinutes: 35,
        distanceKm: 5.2,
        caloriesBurned: 420,
        date: new Date('2026-09-01T08:00:00Z'),
      },
      {
        user: users[1].name,
        type: 'Strength',
        durationMinutes: 45,
        caloriesBurned: 390,
        date: new Date('2026-09-02T18:00:00Z'),
      },
      {
        user: users[2].name,
        type: 'Cycling',
        durationMinutes: 50,
        distanceKm: 18.7,
        caloriesBurned: 510,
        date: new Date('2026-09-03T07:30:00Z'),
      },
    ]);

    await LeaderboardEntry.insertMany([
      {
        user: users[0].name,
        team: teams[0].name,
        score: 980,
        rank: 1,
        streak: 9,
      },
      {
        user: users[1].name,
        team: teams[1].name,
        score: 940,
        rank: 2,
        streak: 7,
      },
      {
        user: users[2].name,
        team: teams[0].name,
        score: 915,
        rank: 3,
        streak: 6,
      },
    ]);

    await Workout.insertMany([
      {
        name: 'Cardio Blast',
        category: 'Cardio',
        durationMinutes: 30,
        difficulty: 'Intermediate',
        recommendedFor: ['Athletes', 'Endurance'],
      },
      {
        name: 'Power Circuit',
        category: 'Strength',
        durationMinutes: 40,
        difficulty: 'Advanced',
        recommendedFor: ['Athletes', 'Strength'],
      },
      {
        name: 'Mobility Reset',
        category: 'Mobility',
        durationMinutes: 20,
        difficulty: 'Beginner',
        recommendedFor: ['All'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
