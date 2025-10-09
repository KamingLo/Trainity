document.addEventListener('DOMContentLoaded', function() {
    const userDataString = sessionStorage.getItem('loggedInUser');
    
    const namaDiHeader = document.querySelector('.user-info h1');
    const emailDiHeader = document.querySelector('.user-info p');
    const inputNamaLengkap = document.getElementById('fullName');
    const inputEmail = document.getElementById('email');
    const profileAvatar = document.getElementById('profile-avatar');

    function showAlert(message, type = 'success') {
        const existingAlert = document.getElementById('custom-alert');
        if (existingAlert) {
            existingAlert.remove();
        }

        const alert = document.createElement('div');
        alert.id = 'custom-alert';
        alert.className = `custom-alert ${type}`;
        
        const iconClass = type === 'success' ? 'bx-check-circle' : 'bx-error-circle';
        
        alert.innerHTML = `
            <div class="alert-content">
                <i class='bx ${iconClass}'></i>
                <span>${message}</span>
            </div>
        `;

        document.body.appendChild(alert);

        setTimeout(() => {
            alert.classList.add('show');
        }, 10);

        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => {
                alert.remove();
            }, 300);
        }, 3000);
    }

    function updateUserData(newUsername) {
        if (userDataString) {
            const user = JSON.parse(userDataString);
            user.username = newUsername;
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        }
    }

    function updateHeaderDisplay(username, email) {
        namaDiHeader.textContent = username;
        emailDiHeader.textContent = email;
    }

    if (userDataString) {
        const user = JSON.parse(userDataString);
        updateHeaderDisplay(user.username, user.email);
        inputNamaLengkap.value = user.username;
        inputEmail.value = user.email;
    }

    const savedAvatar = sessionStorage.getItem('profileAvatar');
    if (savedAvatar) {
        profileAvatar.src = savedAvatar;
    }

    const avatarContainer = document.getElementById('avatar-container');
    const fileInput = document.getElementById('file-input');

    avatarContainer.addEventListener('mouseenter', function() {
        this.querySelector('.avatar-overlay').style.opacity = '1';
    });

    avatarContainer.addEventListener('mouseleave', function() {
        this.querySelector('.avatar-overlay').style.opacity = '0';
    });

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
                showAlert('Foto profil berhasil diubah!');
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
        const newUsername = inputNamaLengkap.value;

        if (newPasswordValue !== '' && newPasswordValue !== confirmPasswordValue) {
            showAlert('Password baru dan konfirmasi password tidak cocok!', 'error');
            return;
        }

        updateUserData(newUsername);
        updateHeaderDisplay(newUsername, inputEmail.value);

        if (newPasswordValue !== '') {
            const userDataString = sessionStorage.getItem('loggedInUser');
            if (userDataString) {
                const user = JSON.parse(userDataString);
                user.password = newPasswordValue;
                sessionStorage.setItem('loggedInUser', JSON.stringify(user));
            }
        }

        showAlert('Pengaturan berhasil disimpan!');

        newPasswordInput.value = '';
        confirmPasswordInput.value = '';
    });

    inputNamaLengkap.addEventListener('input', function() {
        const newUsername = this.value;
        if (userDataString) {
            const user = JSON.parse(userDataString);
            user.username = newUsername;
            sessionStorage.setItem('loggedInUser', JSON.stringify(user));
        }
        namaDiHeader.textContent = newUsername;
    });
});