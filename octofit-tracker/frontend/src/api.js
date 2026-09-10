const codespaceName = import.meta.env.VITE_CODESPACE_NAME;

// Fallback to localhost so an unset VITE_CODESPACE_NAME never yields https://undefined-8000...
export const API_BASE_URL = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export const buildEndpoint = (resource) => `${API_BASE_URL}/${resource}/`;

/**
 * Accepts array responses, paginated responses ({ results | items | data })
 * and the keyed shape returned by the OctoFit API ({ users: [...] }).
 */
export const normalizeCollection = (payload, resource) => {
  if (Array.isArray(payload)) {
    return payload;
  }

  if (!payload || typeof payload !== 'object') {
    return [];
  }

  const candidates = [payload[resource], payload.results, payload.items, payload.data];
  const match = candidates.find((value) => Array.isArray(value));

  return match ?? [];
};

export const fetchCollection = async (resource) => {
  const response = await fetch(buildEndpoint(resource));

  if (!response.ok) {
    throw new Error(`Request to /api/${resource}/ failed with status ${response.status}`);
  }

  return normalizeCollection(await response.json(), resource);
};
