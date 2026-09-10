import { useCollection } from '../hooks/useCollection.js';
import DataTable from './DataTable.jsx';

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams`
  : 'http://localhost:8000/api/teams';

void teamsEndpoint;

const columns = [
  { key: 'name', label: 'Team' },
  { key: 'sport', label: 'Sport' },
  { key: 'captain', label: 'Captain' },
  { key: 'membersCount', label: 'Members' },
  { key: 'points', label: 'Points' },
];

const Teams = () => {
  const { items, loading, error } = useCollection('teams');

  return (
    <DataTable
      title="Teams"
      resource="teams"
      columns={columns}
      items={items}
      loading={loading}
      error={error}
    />
  );
};

export default Teams;
