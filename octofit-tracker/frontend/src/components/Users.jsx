import { useCollection } from '../hooks/useCollection.js';
import DataTable from './DataTable.jsx';

const usersEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users`
  : 'http://localhost:8000/api/users';

void usersEndpoint;

const columns = [
  { key: 'name', label: 'Name' },
  { key: 'email', label: 'Email' },
  { key: 'age', label: 'Age' },
  { key: 'role', label: 'Role' },
  { key: 'team', label: 'Team' },
  { key: 'score', label: 'Score' },
  {
    key: 'weeklyGoal',
    label: 'Weekly goal',
    render: (user) => (user.weeklyGoal ? `${user.weeklyGoal} min` : '—'),
  },
];

const Users = () => {
  const { items, loading, error } = useCollection('users');

  return (
    <DataTable
      title="Users"
      resource="users"
      columns={columns}
      items={items}
      loading={loading}
      error={error}
    />
  );
};

export default Users;
