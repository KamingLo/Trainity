document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.querySelector('.form-box form');
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const passwordInput = document.getElementById('password-input');
    const togglePassword = document.getElementById('togglePassword');

    loginForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        if (username && password) {
           
            console.log('Login berhasil! Menyimpan status autentikasi.');
            sessionStorage.setItem("Authenticated", "True");

            alert('Login berhasil! Anda akan diarahkan ke dashboard.');
            window.location.href = './dashboard.html';
        } else {
            alert('Username dan Password harus diisi.');
        }
    });

    togglePassword.addEventListener('click', function() {
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        this.classList.toggle('bx-show');
        this.classList.toggle('bx-hide');
    });
});