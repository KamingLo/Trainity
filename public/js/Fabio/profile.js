document.addEventListener('DOMContentLoaded', function() {
    if (sessionStorage.getItem("authenticated") !== "true") {
        window.location.href = "./login.html";
        return;
    }

    const userDataString = localStorage.getItem('loggedInUser');

    if (userDataString) {
        const user = JSON.parse(userDataString);

        const namaDiHeader = document.querySelector('.user-info h1');
        const emailDiHeader = document.querySelector('.user-info p');
        const inputNamaLengkap = document.getElementById('fullName');
        const inputEmail = document.getElementById('email');

        namaDiHeader.textContent = user.namaLengkap;
        emailDiHeader.textContent = user.email;
        inputNamaLengkap.value = user.namaLengkap;
        inputEmail.value = user.email;
    }
    
    const settingsForm = document.getElementById('settingsForm');
    const newPasswordInput = document.getElementById('newPassword');
    const confirmPasswordInput = document.getElementById('confirmPassword');

    settingsForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const newPasswordValue = newPasswordInput.value;
        const confirmPasswordValue = confirmPasswordInput.value;

        if (newPasswordValue !== '' && newPasswordValue !== confirmPasswordValue) {
            alert('Password baru dan konfirmasi password tidak cocok!');
            return;
        }

        alert('Pengaturan berhasil disimpan!');

        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
    });
});