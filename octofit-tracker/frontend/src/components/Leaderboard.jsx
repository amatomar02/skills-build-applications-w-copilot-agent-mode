import { useCollection } from '../hooks/useCollection.js';
import DataTable from './DataTable.jsx';

const leaderboardEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard`
  : 'http://localhost:8000/api/leaderboard';

void leaderboardEndpoint;

const columns = [
  { key: 'rank', label: 'Rank' },
  { key: 'user', label: 'Athlete' },
  { key: 'team', label: 'Team' },
  { key: 'score', label: 'Score' },
  {
    key: 'streak',
    label: 'Streak',
    render: (entry) => (entry.streak ? `${entry.streak} days` : '—'),
  },
];

const Leaderboard = () => {
  const { items, loading, error } = useCollection('leaderboard');

  return (
    <DataTable
      title="Leaderboard"
      resource="leaderboard"
      columns={columns}
      items={items}
      loading={loading}
      error={error}
    />
  );
};

export default Leaderboard;
