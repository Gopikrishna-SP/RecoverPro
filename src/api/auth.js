export function getToken() {
  // support both keys for compatibility across repos
  const t1 = localStorage.getItem('authToken');
  const t2 = localStorage.getItem('token');
  const token = t1 || t2;
  if (!token || token === 'undefined' || token === 'null') return null;
  return token;
}

export function setToken(token) {
  if (token) {
    localStorage.setItem('authToken', token);
    localStorage.setItem('token', token);
  } else {
    localStorage.removeItem('authToken');
    localStorage.removeItem('token');
  }
}

export function getAuthHeaders(isJson = true) {
  const token = getToken();
  const headers = { ...(isJson ? { 'Content-Type': 'application/json' } : {}) };
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}

export function logout(redirect = true) {
  localStorage.removeItem('authToken');
  localStorage.removeItem('user');
  if (redirect) window.location.href = '/signin';
}

export async function fetchWithAuth(url, options = {}) {
  const headers = { ...(options.headers || {}), ...getAuthHeaders() };
  const res = await fetch(url, { ...options, headers });
  return res;
}
