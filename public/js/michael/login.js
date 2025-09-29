document.addEventListener('DOMContentLoaded', function() {
    // Menemukan elemen form dan input dari HTML
    const loginForm = document.querySelector('.form-box form');
    const usernameInput = document.querySelector('input[placeholder="Username"]');
    const passwordInput = document.getElementById('password-input');
    const togglePassword = document.getElementById('togglePassword');

    // Menambahkan event listener saat form login disubmit
    loginForm.addEventListener('submit', function(event) {
        // Mencegah form mengirim data dan me-reload halaman
        event.preventDefault();

        // Mengambil nilai dari input username dan password
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();

        // Validasi sederhana: pastikan kedua field tidak kosong
        if (username && password) {
            // Jika valid, set item di sessionStorage
            // Ini menandakan bahwa pengguna sudah terautentikasi
            console.log('Login berhasil! Menyimpan status autentikasi.');
            sessionStorage.setItem("Authenticated", "True");

            // Beri notifikasi dan arahkan ke halaman dashboard
            alert('Login berhasil! Anda akan diarahkan ke dashboard.');
            window.location.href = './dashboard.html'; // Ganti dengan nama file dashboard Anda
        } else {
            // Jika salah satu field kosong, tampilkan alert
            alert('Username dan Password harus diisi.');
        }
    });

    // Event listener untuk ikon mata (show/hide password)
    togglePassword.addEventListener('click', function() {
        // Mengubah tipe input dari 'password' ke 'text' atau sebaliknya
        const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
        passwordInput.setAttribute('type', type);

        // Mengganti ikon mata (dari 'show' ke 'hide' atau sebaliknya)
        // Pastikan Anda memiliki class 'bx-hide' di library Boxicons
        this.classList.toggle('bx-show');
        this.classList.toggle('bx-hide');
    });
});