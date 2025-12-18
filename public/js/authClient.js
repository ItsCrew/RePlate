// Simple client-side auth helper for RePlate

const AUTH_TOKEN_KEY = 'replate_token';
const AUTH_USER_KEY = 'replate_user';

function saveAuth(token, user) {
  if (token) {
    localStorage.setItem(AUTH_TOKEN_KEY, token);
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  if (user) {
    localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  }
}

function loadAuth() {
  const token = localStorage.getItem(AUTH_TOKEN_KEY);
  const userRaw = localStorage.getItem(AUTH_USER_KEY);
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  }
  let user = null;
  try {
    user = userRaw ? JSON.parse(userRaw) : null;
  } catch {
    user = null;
  }
  return { token, user };
}

function clearAuth() {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
  delete axios.defaults.headers.common['Authorization'];
}

function requireAuth(redirectTo = 'Login.html') {
  const { token } = loadAuth();
  if (!token) {
    window.location.href = redirectTo;
  }
}


