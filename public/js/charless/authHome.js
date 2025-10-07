document.addEventListener('DOMContentLoaded', () => {
    const isLoggedIn = sessionStorage.getItem("Authenticated") === "True";

    if (isLoggedIn) {
        const actionSection = document.querySelector('.action-section');
        if (actionSection) {
            actionSection.style.display = 'none';
        }

        const signUpButton = document.querySelector('.hero-buttons a.btn-primary');
        const journeyButton = document.querySelector('.hero-buttons a.btn-secondary');

        if (signUpButton && journeyButton) {

            signUpButton.style.display = 'none';
        }
    }
});