document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.form-box form');
    
    if (registerForm) {
        const usernameInput = registerForm.querySelector('#username');
        const emailInput = registerForm.querySelector('#email');
        const passwordInput = registerForm.querySelector('#password-input');
        const confirmPasswordInput = registerForm.querySelector('#confirm-password-input'); 
        const togglePassword = registerForm.querySelector('#togglePassword');
        
        const errorMsg = registerForm.querySelector('#errorMsg');
        const successMsg = registerForm.querySelector('#successMsg');

        const showMessage = (element, message) => {
            if (!element) return;
            errorMsg.style.display = 'none';
            successMsg.style.display = 'none';
            element.textContent = message;
            element.style.display = 'block';
            setTimeout(() => {
                element.style.display = 'none';
            }, 3000);
        };

        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            const confirmPassword = confirmPasswordInput.value.trim();

            if (!username || !email || !password) {
                showCustomAlert('Mohon lengkapi semua kolom pendaftaran.');
                return;
            }

            if (password !== confirmPassword) {
                showCustomAlert('Password tidak cocok.');
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
            const toggleBothPasswords = () => {
                const isPassword = passwordInput.getAttribute('type') === 'password';
                const newType = isPassword ? 'text' : 'password';

                passwordInput.setAttribute('type', newType);
                confirmPasswordInput.setAttribute('type', newType);

                togglePassword.classList.toggle('bx-hide', isPassword);
                togglePassword.classList.toggle('bx-show', !isPassword);
            };

            togglePassword.addEventListener('click', toggleBothPasswords);
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