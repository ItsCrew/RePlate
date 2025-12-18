const loginForm = document.getElementById('loginForm');
const loginMessage = document.getElementById('loginMessage');

loadAuth();

loginForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  loginMessage.textContent = '';
  loginMessage.className = 'auth-message';

  const email = document.getElementById('loginEmail').value.trim();
  const password = document.getElementById('loginPassword').value;

  try {
    const res = await axios.post('/api/v1/auth/login', { email, password });
    const { token, user } = res.data;
    saveAuth(token, user);

    loginMessage.textContent = 'Logged in successfully! Redirecting...';
    loginMessage.classList.add('auth-message--success');

    // Redirect donors to listing page, others to dashboard
    setTimeout(() => {
      window.location.href = 'Dashboard.html';
    }, 800);
  } catch (err) {
    const msg =
      err.response?.data?.msg || 'Login failed. Please check your details.';
    loginMessage.textContent = msg;
    loginMessage.classList.add('auth-message--error');
  }
});


