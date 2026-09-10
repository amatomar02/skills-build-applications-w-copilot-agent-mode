import { useCollection } from '../hooks/useCollection.js';
import DataTable from './DataTable.jsx';

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
