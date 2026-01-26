// src/utils/auth.js
// Authentication utilities and token management

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
  const headers = { 
    ...(isJson ? { 'Content-Type': 'application/json' } : {}),
    'Accept': 'application/json'
  };
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }
  return headers;
}

export function logout(redirect = true) {
  localStorage.removeItem('authToken');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  localStorage.removeItem('rememberEmail');
  if (redirect) {
    window.location.href = '/signin';
  }
}

export async function fetchWithAuth(url, options = {}) {
  try {
    const headers = { 
      ...(options.headers || {}), 
      ...getAuthHeaders(options.headers?.['Content-Type'] !== 'multipart/form-data')
    };
    
    const config = {
      ...options,
      headers
    };

    const response = await fetch(url, config);

    // Handle unauthorized responses
    if (response.status === 401) {
      logout(true);
      return response;
    }

    return response;
  } catch (error) {
    console.error('Fetch error:', error);
    throw error;
  }
}