document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.form-box form');

    if (loginForm) {
        const usernameInput = loginForm.querySelector('#username');
        const passwordInput = loginForm.querySelector('#password-input');
        const togglePassword = loginForm.querySelector('#togglePassword');

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (!username || !password) {
                showCustomAlert('Username dan password harus diisi.');
                return;
            }
            
            if (username == "admin@trainity.com" && password === "admin123") {
                sessionStorage.setItem('loggedInUser',JSON.stringify({
                    "username": "Admin Trainity",
                    "email": "admin@trainity.com",
                    "password": "admin123"
                })
            );
                sessionStorage.setItem("Authenticated", "True");
                showCustomAlert('Login berhasil! Mengarahkan ke dashboard...', true);

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(u => u.username === username);

            if (user && user.password === password) {
                
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                sessionStorage.setItem("Authenticated", "True");
                showCustomAlert('Login berhasil! Mengarahkan ke dashboard...', true);

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } else {
                    showCustomAlert('Username atau password salah.');
            }
        });

        if (togglePassword) {
            togglePassword.addEventListener('click', function() {
                const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
                passwordInput.setAttribute('type', type);
                this.classList.toggle('bx-show');
                this.classList.toggle('bx-hide');
            });
        }
    }
});

function showCustomAlert(message, isSuccess = false) {
    const alertContainer = document.getElementById('custom-alert-container');
    if (!alertContainer) return;

    const alert = document.createElement('div');
    alert.className = `custom-alert ${isSuccess ? 'success' : 'error'}`;
    alert.textContent = message;

    alertContainer.appendChild(alert);

    setTimeout(() => {
        alert.remove();
    }, 3000);
}
   

