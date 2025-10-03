document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.form-box form');

    if (loginForm) {
        const emailInput = loginForm.querySelector('#email');  
        const passwordInput = loginForm.querySelector('#password-input');
        const togglePassword = loginForm.querySelector('#togglePassword');

        const errorMsg = loginForm.querySelector('#errorMsg');
        const successMsg = loginForm.querySelector('#successMsg');

        const showMessage = (element, message) => {
            errorMsg.style.display = 'none';
            successMsg.style.display = 'none';

            element.textContent = message;
            element.style.display = 'block';
            setTimeout(() => {
                element.style.display = 'none';
            }, 3000);
        };

        loginForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();
            
            if (!email || !password) {
                showMessage(errorMsg, 'Email dan password harus diisi.');
                return;
            }
            
            if (email == "admin@trainity.com" && password === "admin123") {
                sessionStorage.setItem('loggedInUser',JSON.stringify({
                    "username": "Admin Trainity",
                    "email": "admin@trainity.com",
                    "password": "admin123"
                })
            );
                sessionStorage.setItem("Authenticated", "True");
                showCustomAlert('Login berhasil! Mengarahkan ke dashboard...', true);
                showMessage(successMsg, 'Berhasil masuk');

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);
                return;
            }

            const users = JSON.parse(localStorage.getItem('users')) || [];

            const user = users.find(u => u.email === email);

            if (user && user.password === password) {
                
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
                sessionStorage.setItem("Authenticated", "True");
                showCustomAlert('Login berhasil! Mengarahkan ke dashboard...', true);
                showMessage(successMsg, 'Berhasil masuk');

                setTimeout(() => {
                    window.location.href = 'dashboard.html';
                }, 1500);

            } else {
                    showMessage(errorMsg, 'Email atau kata sandi tidak valid');
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
   

