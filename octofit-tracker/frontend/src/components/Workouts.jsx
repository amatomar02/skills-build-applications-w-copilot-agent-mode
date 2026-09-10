import { useCollection } from '../hooks/useCollection.js';
import DataTable from './DataTable.jsx';

const workoutsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts`
  : 'http://localhost:8000/api/workouts';

void workoutsEndpoint;

const columns = [
  { key: 'name', label: 'Workout' },
  { key: 'category', label: 'Category' },
  {
    key: 'durationMinutes',
    label: 'Duration',
    render: (workout) => (workout.durationMinutes ? `${workout.durationMinutes} min` : '—'),
  },
  { key: 'difficulty', label: 'Difficulty' },
  {
    key: 'recommendedFor',
    label: 'Recommended for',
    render: (workout) =>
      Array.isArray(workout.recommendedFor) && workout.recommendedFor.length > 0
        ? workout.recommendedFor.join(', ')
        : '—',
  },
];

const Workouts = () => {
  const { items, loading, error } = useCollection('workouts');

  return (
    <DataTable
      title="Workouts"
      resource="workouts"
      columns={columns}
      items={items}
      loading={loading}
      error={error}
    />
  );
};

export default Workouts;
