document.addEventListener("DOMContentLoaded", () => {
const navbar = document.getElementById("nav-menu");
const loginLink = document.getElementById("login-link");
const signupLink = document.getElementById("signup-link");
const lainnyaLink = document.getElementById("lainnya-link");

const isAuthenticated = sessionStorage.getItem("Authenticated") === "True";

if (isAuthenticated) {
    loginLink?.remove();
    signupLink?.remove();
    lainnyaLink?.remove();

    const logout = document.createElement("a");
    logout.href = "#";
    logout.textContent = "Logout";
    logout.className = "btn-logout";
    
    const dashboard = document.createElement("a");
    dashboard.href = "./dashboard.html";
    dashboard.textContent = "Dashboard";
    dashboard.className = "nav-link";
    
    const profile = document.createElement("a");
    profile.href = "./profile.html";
    profile.textContent = "Profil";
    profile.className = "nav-link";

    const checkout = document.createElement("a");
    checkout.href = "./checkout.html";
    checkout.textContent = "Checkout";
    checkout.className = "nav-link";
    
    const lainnya = document.createElement("a");
    lainnya.href = "./lainnya.html";
    lainnya.textContent = "Lainnya";
    lainnya.className = "nav-link";
    

        logout.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.removeItem("Authenticated");
            window.location.href = "./login.html";
        });

    navbar.appendChild(dashboard);
    navbar.appendChild(checkout);
    navbar.appendChild(profile);
    navbar.appendChild(lainnya);
    navbar.appendChild(logout);
}
});