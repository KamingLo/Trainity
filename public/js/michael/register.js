document.addEventListener('DOMContentLoaded', function() {
    const registerForm = document.querySelector('.form-box-right form');
    
    if (registerForm) {
        const usernameInput = registerForm.querySelector('input[placeholder="Username"]');
        const emailInput = registerForm.querySelector('input[placeholder="Email"]');
        const passwordInput = registerForm.querySelector('#password-input');
        const togglePassword = registerForm.querySelector('#togglePassword');

        registerForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const username = usernameInput.value.trim();
            const email = emailInput.value.trim();
            const password = passwordInput.value.trim();

            if (username && email && password) {
                alert('Registrasi berhasil! Anda akan diarahkan ke halaman login.');
                window.location.href = 'login.html';
            } else {
                alert('Mohon lengkapi semua kolom pendaftaran.');
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
    } else {
        console.error("Form registrasi tidak ditemukan.");
    }
});

