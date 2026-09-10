import mongoose, { Schema, type Document } from 'mongoose';

export interface ILeaderboardEntry extends Document {
  user: string;
  team: string;
  score: number;
  rank: number;
  streak: number;
}

const leaderboardEntrySchema = new Schema<ILeaderboardEntry>(
  {
    user: { type: String, required: true },
    team: { type: String, required: true },
    score: { type: Number, required: true, default: 0 },
    rank: { type: Number, required: true, min: 1 },
    streak: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const LeaderboardEntry = mongoose.model<ILeaderboardEntry>('LeaderboardEntry', leaderboardEntrySchema);

export default LeaderboardEntry;
