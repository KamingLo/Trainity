document.addEventListener("DOMContentLoaded", () => {
const footerNav = document.getElementById("footer-nav");
const loginLink = document.getElementById("footer-login");
const signupLink = document.getElementById("footer-signup");

const isAuthenticated = true;

if (isAuthenticated) {
    signupLink?.remove();
    loginLink?.remove();

    const logout = document.createElement("a");
    logout.href = "#";
    logout.textContent = "Logout";
    
    const history = document.createElement("a");
    history.href = "./dashboard.html";
    history.textContent = "History";
    
    const checkout = document.createElement("a");
    checkout.href = "./checkout.html";
    checkout.textContent = "Checkout";

        logout.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.removeItem("authenticated");
            window.location.href = "./index.html";
        });

    footerNav.appendChild(checkout);
    footerNav.appendChild(history);
    footerNav.appendChild(logout);
}
});