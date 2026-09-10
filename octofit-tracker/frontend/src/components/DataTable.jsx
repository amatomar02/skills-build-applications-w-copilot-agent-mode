import { buildEndpoint } from '../api.js';

const DataTable = ({ title, resource, columns, items, loading, error }) => {
  if (loading) {
    return (
      <div className="d-flex align-items-center gap-2 py-4">
        <div className="spinner-border text-primary" role="status" aria-hidden="true"></div>
        <span>Loading {title.toLowerCase()}…</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        <p className="mb-1 fw-semibold">Could not load {title.toLowerCase()}.</p>
        <p className="mb-0 small">{error}</p>
        <p className="mb-0 small">Endpoint: {buildEndpoint(resource)}</p>
      </div>
    );
  }

  return (
    <section>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h1 className="h3 mb-0">{title}</h1>
        <span className="badge text-bg-secondary">{items.length} records</span>
      </div>

      {items.length === 0 ? (
        <div className="alert alert-info mb-0">No {title.toLowerCase()} available yet.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                {columns.map((column) => (
                  <th key={column.key} scope="col">
                    {column.label}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {items.map((item, index) => (
                <tr key={item._id ?? item.id ?? index}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render ? column.render(item) : (item[column.key] ?? '—')}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </section>
  );
};

export default DataTable;
