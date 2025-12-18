const API_BASE = '/api/v1/auth';

function saveAuth(token, name) {
    if (token) {
        localStorage.setItem('replate_token', token);
    }
    if (name) {
        localStorage.setItem('replate_user_name', name);
    }
}

function getToken() {
    return localStorage.getItem('replate_token');
}

function redirectAfterLogin() {
    // If user came from a protected page, you could store that in future.
    // For now, send donors to Donor page, others to Dashboard.
    window.location.href = '/Dashboard.html';
}

// Handle Register
const registerForm = document.getElementById('register-form');
if (registerForm) {
    registerForm.addEventListener('submit', (e) => {
        e.preventDefault();

        const name = document.getElementById('reg-name').value;
        const email = document.getElementById('reg-email').value;
        const password = document.getElementById('reg-password').value;
        const role = document.getElementById('reg-role').value;
        const errorEl = document.getElementById('register-error');

        errorEl.style.display = 'none';
        errorEl.textContent = '';

        if (!navigator.geolocation) {
            errorEl.style.display = 'block';
            errorEl.textContent = 'Geolocation is not supported in this browser.';
            return;
        }

        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const payload = {
                    name,
                    email,
                    password,
                    role,
                    location: {
                        type: 'Point',
                        coordinates: [position.coords.longitude, position.coords.latitude],
                    },
                };

                try {
                    const res = await axios.post(`${API_BASE}/register`, payload);
                    saveAuth(res.data.token, res.data.user?.name);
                    window.location.href = '/Dashboard.html';
                } catch (err) {
                    console.error(err);
                    errorEl.style.display = 'block';
                    errorEl.textContent =
                        err?.response?.data?.msg || 'Registration failed. Please try again.';
                }
            },
            (err) => {
                console.error(err);
                errorEl.style.display = 'block';
                errorEl.textContent =
                    'We need your location to register you. Please allow location and try again.';
            }
        );
    });
}

// Handle Login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const email = document.getElementById('login-email').value;
        const password = document.getElementById('login-password').value;
        const errorEl = document.getElementById('login-error');

        errorEl.style.display = 'none';
        errorEl.textContent = '';

        try {
            const res = await axios.post(`${API_BASE}/login`, { email, password });
            saveAuth(res.data.token, res.data.user?.name);
            redirectAfterLogin();
        } catch (err) {
            console.error(err);
            errorEl.style.display = 'block';
            errorEl.textContent =
                err?.response?.data?.msg || 'Login failed. Please check your credentials.';
        }
    });
}

// Small helper so other scripts can use the token
window.RePlateAuth = {
    getToken,
};


