document.addEventListener('DOMContentLoaded', () => {
    // melakukan pengecekan apakah user sudah log in atau belum
    const isLoggedIn = sessionStorage.getItem("Authenticated") === "True";

    // if statemenet jika user sudah login
    if (isLoggedIn) {
        // mencari section call to action yang berada di akhir halaman
        const actionSection = document.querySelector('.action-section');
        if (actionSection) {
            // menyembunyikan section tersebut jika user sudah log in
            actionSection.style.display = 'none';
        }

        // mengambil document  button dari hero section
        const signUpButton = document.querySelector('.hero-buttons a.btn-primary');
        const journeyButton = document.querySelector('.hero-buttons a.btn-secondary');

        // if statement untuk cek jika kedua tombol di temukan, maka sembunyikan tombol "daftar"
        if (signUpButton && journeyButton) {
            signUpButton.style.display = 'none';
        }
    }
});