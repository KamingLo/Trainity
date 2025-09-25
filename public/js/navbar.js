document.addEventListener("DOMContentLoaded", () => {
const navbar = document.getElementById("nav-menu");
const loginLink = document.getElementById("login-link");
const signupLink = document.getElementById("signup-link");

const isAuthenticated = false;

if (isAuthenticated) {
    loginLink?.remove();
    signupLink?.remove();

    const logout = document.createElement("a");
    logout.href = "#";
    logout.textContent = "Logout";
    logout.className = "btn-logout";
    
    const history = document.createElement("a");
    history.href = "./history.html";
    history.textContent = "History";
    history.className = "nav-link";
    
    const checkout = document.createElement("a");
    checkout.href = "./checkout.html";
    checkout.textContent = "Checkout";
    checkout.className = "nav-link";

        logout.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.removeItem("authenticated");
            window.location.href = "./index.html";
        });

    navbar.appendChild(checkout);
    navbar.appendChild(history);
    navbar.appendChild(logout);
}
});