import mongoose, { Schema, type Document } from 'mongoose';

export interface IActivity extends Document {
  user: string;
  type: 'Running' | 'Cycling' | 'Strength' | 'Swimming' | 'Yoga';
  durationMinutes: number;
  distanceKm?: number;
  caloriesBurned: number;
  date: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    user: { type: String, required: true },
    type: {
      type: String,
      enum: ['Running', 'Cycling', 'Strength', 'Swimming', 'Yoga'],
      required: true,
    },
    durationMinutes: { type: Number, required: true, min: 1 },
    distanceKm: { type: Number, min: 0 },
    caloriesBurned: { type: Number, required: true, min: 0 },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
