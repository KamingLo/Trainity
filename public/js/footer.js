document.addEventListener("DOMContentLoaded", () => {
    const footerNav = document.getElementById("footer-nav");
    const loginLink = document.getElementById("footer-login");
    const signupLink = document.getElementById("footer-signup");
    const lainnyaLink = document.getElementById("footer-lainnya");

    const isAuthenticated = sessionStorage.getItem("Authenticated") === "True";

    if (isAuthenticated) {
        signupLink?.remove();
        loginLink?.remove();
        lainnyaLink?.remove();

        const dashboard = document.createElement("a");
        dashboard.href = "./dashboard.html";
        dashboard.textContent = "Dashboard";
        
        const profile = document.createElement("a");
        profile.href = "./profile.html";
        profile.textContent = "Profile";

        const checkout = document.createElement("a");
        checkout.href = "./checkout.html";
        checkout.textContent = "Checkout";
        
        const lainnya = document.createElement("a");
        lainnya.href = "./Lainnya.html";
        lainnya.textContent = "lainnya";

        footerNav.appendChild(dashboard);
        footerNav.appendChild(checkout);
        footerNav.appendChild(profile);
        footerNav.appendChild(lainnya);
    }
});