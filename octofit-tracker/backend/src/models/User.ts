import mongoose, { Schema, type Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  age: number;
  role: 'Athlete' | 'Coach' | 'Administrator';
  team: string;
  score: number;
  weeklyGoal: number;
}

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    age: { type: Number, min: 10, max: 100 },
    role: {
      type: String,
      enum: ['Athlete', 'Coach', 'Administrator'],
      required: true,
    },
    team: { type: String, required: true },
    score: { type: Number, default: 0 },
    weeklyGoal: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>('User', userSchema);

export default User;
