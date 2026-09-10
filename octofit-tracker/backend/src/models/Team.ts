import mongoose, { Schema, type Document } from 'mongoose';

export interface ITeam extends Document {
  name: string;
  sport: string;
  captain: string;
  membersCount: number;
  points: number;
}

const teamSchema = new Schema<ITeam>(
  {
    name: { type: String, required: true, unique: true },
    sport: { type: String, required: true },
    captain: { type: String, required: true },
    membersCount: { type: Number, min: 1, default: 1 },
    points: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const Team = mongoose.model<ITeam>('Team', teamSchema);

export default Team;
