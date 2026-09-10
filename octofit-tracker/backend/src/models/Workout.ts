import mongoose, { Schema, type Document } from 'mongoose';

export interface IWorkout extends Document {
  name: string;
  category: 'Strength' | 'Cardio' | 'Mobility' | 'Recovery';
  durationMinutes: number;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  recommendedFor: string[];
}

const workoutSchema = new Schema<IWorkout>(
  {
    name: { type: String, required: true },
    category: {
      type: String,
      enum: ['Strength', 'Cardio', 'Mobility', 'Recovery'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 10 },
    difficulty: {
      type: String,
      enum: ['Beginner', 'Intermediate', 'Advanced'],
      required: true,
    },
    recommendedFor: [{ type: String }],
  },
  { timestamps: true },
);

const Workout = mongoose.model<IWorkout>('Workout', workoutSchema);

export default Workout;
