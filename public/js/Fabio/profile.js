document.addEventListener('DOMContentLoaded', function() {
    
    const userDataString = sessionStorage.getItem('loggedInUser');
    
    const namaDiHeader = document.querySelector('.user-info h1');
    const emailDiHeader = document.querySelector('.user-info p');
    const inputNamaLengkap = document.getElementById('fullName');
    const inputEmail = document.getElementById('email');
    const profileAvatar = document.getElementById('profile-avatar');

    if (userDataString) {
        const user = JSON.parse(userDataString);

        namaDiHeader.textContent = user.username;
        emailDiHeader.textContent = user.email;
        inputNamaLengkap.value = user.username;
        inputEmail.value = user.email;
    }

    const savedAvatar = sessionStorage.getItem('profileAvatar');
    if (savedAvatar) {
        profileAvatar.src = savedAvatar;
    }

    const avatarContainer = document.getElementById('avatar-container');
    const fileInput = document.getElementById('file-input');

    avatarContainer.addEventListener('click', function() {
        fileInput.click();
    });

    fileInput.addEventListener('change', function(event) {
        const file = event.target.files[0];
        
        if (file) {
            const reader = new FileReader();
            
            reader.onload = function(e) {
                const imageUrl = e.target.result;
                profileAvatar.src = imageUrl;
                sessionStorage.setItem('profileAvatar', imageUrl);
            };
            
            reader.readAsDataURL(file);
        }
    });

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

