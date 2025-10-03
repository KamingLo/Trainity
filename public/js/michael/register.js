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

            if (!username || username.length < 3 || !/^[a-zA-Z0-9_]+$/.test(username)) {
                showMessage(errorMsg, 'Username minimal 3 karakter dan hanya boleh huruf/angka.');
                return;
            }

            // Validasi email
            const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailPattern.test(email)) {
                showMessage(errorMsg,'Format email tidak valid.');
                return;
            }

            // Validasi password
            const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
            if (!passwordPattern.test(password)) {
                showMessage(errorMsg,'Password minimal 8 karakter, harus ada huruf besar, huruf kecil, angka, dan simbol.');
                return;
            }

            if (password !== confirmPassword) {
                showMessage(errorMsg, 'Password tidak cocok.');
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const userExists = users.some(user => user.username === username || user.email === email);

            if (userExists) {
                showMessage(errormsg,'Username atau email sudah digunakan.');
            } else {
                users.push({ username, email, password });
                
                localStorage.setItem('users', JSON.stringify(users));
                
                showMessage(successMsg,'Registrasi berhasil! Anda akan diarahkan ke halaman login.');
                
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