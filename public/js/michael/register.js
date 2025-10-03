document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.form-box form');
    
    if (registerForm) {
        const usernameInput = registerForm.querySelector('#username');
        const emailInput = registerForm.querySelector('#email');
        const passwordInput = registerForm.querySelector('#password-input');
        const togglePassword = registerForm.querySelector('#togglePassword');

        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (!username || !email || !password) {
                showCustomAlert('Mohon lengkapi semua kolom pendaftaran.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const userExists = users.some(user => user.username === username || user.email === email);

            if (userExists) {
                showCustomAlert('Username atau email sudah terdaftar.');
            } else {
                users.push({ username, email, password });
                
                localStorage.setItem('users', JSON.stringify(users));
                
                showCustomAlert('Registrasi berhasil! Anda akan diarahkan ke halaman login.', true);
                
                setTimeout(() => {
                    window.location.href = 'login.html';
                }, 2000);
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