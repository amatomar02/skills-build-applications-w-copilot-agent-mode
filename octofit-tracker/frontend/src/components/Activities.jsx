import { useCollection } from '../hooks/useCollection.js';
import DataTable from './DataTable.jsx';

const activitiesEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities`
  : 'http://localhost:8000/api/activities';

void activitiesEndpoint;

const columns = [
  { key: 'user', label: 'Athlete' },
  { key: 'type', label: 'Activity' },
  {
    key: 'durationMinutes',
    label: 'Duration',
    render: (activity) => (activity.durationMinutes ? `${activity.durationMinutes} min` : '—'),
  },
  {
    key: 'distanceKm',
    label: 'Distance',
    render: (activity) => (activity.distanceKm ? `${activity.distanceKm} km` : '—'),
  },
  { key: 'caloriesBurned', label: 'Calories' },
  {
    key: 'date',
    label: 'Date',
    render: (activity) =>
      activity.date ? new Date(activity.date).toLocaleDateString() : '—',
  },
];

const Activities = () => {
  const { items, loading, error } = useCollection('activities');

  return (
    <DataTable
      title="Activities"
      resource="activities"
      columns={columns}
      items={items}
      loading={loading}
      error={error}
    />
  );
};

export default Activities;
