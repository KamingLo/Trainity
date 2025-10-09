document.addEventListener("DOMContentLoaded", () => {
    const methods = document.querySelectorAll(".payment-method");
    const placeOrderBtn = document.getElementById("place-order");
    const agreeCheckbox = document.getElementById("agree-checkbox");
    const loadingScreen = document.getElementById("loading-screen");
    const checkoutContent = document.querySelector(".checkout-container");

    const coursePrices = {
        "Laravel 8": 150000,
        "HTML": 200000,
        "PHP": 175000,
        "React": 180000,
        "Golang": 120000,
        "NodeJS": 160000,
        "Javascript": 140000,
        "CSS": 130000
    };

    let activeMethod = null;

    function showPopup(contentHtml, redirectTo = null, delay = 2000) {
        let popup = document.getElementById("order-popup");
        if (!popup) {
            popup = document.createElement("div");
            popup.id = "order-popup";
            popup.className = "order-popup";
            popup.innerHTML = `<div class="popout"></div>`;
            document.body.appendChild(popup);
        }

        const popupContent = popup.querySelector(".popout");
        popup.style.display = "flex";

        popupContent.innerHTML = `
            <div class="anim"></div>
            <p>Pembelian anda sedang diproses</p>
        `;

        setTimeout(() => {
            popupContent.innerHTML = contentHtml;

            if (redirectTo) {
                document.getElementById("popupRedirect").addEventListener("click", () => {
                    window.location.href = redirectTo;
                });
            }
        }, delay);
    }

    methods.forEach(method => {
        const checkbox = method.querySelector(".payment-check");
        const body = method.querySelector(".payment-body");
        const input = method.querySelector(".payment-input");

        if (!checkbox) return;

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                methods.forEach(m => {
                    const c = m.querySelector(".payment-check");
                    const b = m.querySelector(".payment-body");
                    m.classList.remove("active");
                    if (b) b.style.display = "none";
                    if (c) c.checked = false;
                });

                method.classList.add("active");
                if (body) body.style.display = "block";
                checkbox.checked = true;
                activeMethod = method;
            } else {
                method.classList.remove("active");
                if (body) body.style.display = "none";
                activeMethod = null;
            }
            validateForm();
        });

        if (input) {
            input.addEventListener("input", validateForm);
        }
    });

    agreeCheckbox.addEventListener("change", validateForm);

    function validateForm() {
        let valid = true;

        if (!activeMethod) {
            valid = false;
        } else {
            const input = activeMethod.querySelector(".payment-input");
            if (input && input.value.trim() === "") {
                valid = false;
            }
        }

        if (!agreeCheckbox.checked) {
            valid = false;
        }

        placeOrderBtn.disabled = !valid;
    }

    const voucherMethod = Array.from(methods).find(
        m => m.querySelector("img")?.alt === "FREE"
    );
    if (voucherMethod) {
        const voucherCheckbox = voucherMethod.querySelector(".payment-check");
        voucherCheckbox.checked = true;
        voucherCheckbox.addEventListener("click", e => e.preventDefault());

        voucherMethod.classList.add("active");
        const voucherBody = voucherMethod.querySelector(".payment-body");
        if (voucherBody) voucherBody.style.display = "block";
        activeMethod = voucherMethod;

        methods.forEach(m => {
            if (m !== voucherMethod) {
                m.classList.add("payment-disabled");
                const c = m.querySelector(".payment-check");
                const i = m.querySelector(".payment-input");
                if (c) c.disabled = true;
                if (i) i.disabled = true;
            }
        });
    }

    const params = new URLSearchParams(window.location.search);
    const kursusKey = params.get("key");

    if (!kursusKey) {
        setTimeout(() => {
            loadingScreen.classList.add("fade-out");
            setTimeout(() => {
                loadingScreen.style.display = "none";
                showPopup(`
                    <div style="font-size: 64px; color: orange; margin-bottom: 20px;">⚠</div>
                    <h2>Akses Ditolak!</h2>
                    <p>Silakan pilih kursus terlebih dahulu</p>
                    <button id="popupRedirect" style="
                        margin-top: 20px; 
                        padding: 10px 20px; 
                        border: none; 
                        border-radius: 6px; 
                        background: #1369ff; 
                        color: white; 
                        cursor: pointer;
                        z-index: 99999;
                    ">
                        Pergi ke Kursus
                    </button>
                `, "kursus.html", 0);
            }, 500);
        }, 1000);
        return;
    }

    if (kursusKey) {
        fetch("./db/database.json")
            .then(res => res.json())
            .then(data => {
                const kursus = data[kursusKey];
                if (kursus) {
                    const orderItem = document.querySelector(".order-item");
                    orderItem.innerHTML = `
                        <img src="https://img.youtube.com/vi/${kursus.videos[0].link}/hqdefault.jpg" 
                             alt="Preview Video" class="order-img">
                        <h2 class="order-title">Kursus ${kursusKey}</h2>
                    `;

                    const price = coursePrices[kursusKey] || 0;

                    const orderDetails = document.querySelector(".order-details");
                    orderDetails.innerHTML = `
                        <div style="display: flex;">
                            <p>Price:</p>
                            <p style="margin-left: auto;">Rp ${price.toLocaleString()}</p>
                        </div>
                        <div style="display: flex; border-bottom: 2px solid #333333; padding-bottom: 10px; margin-bottom: 10px;">
                            <p>Diskon:</p>
                            <p style="margin-left: auto;">100%</p>
                        </div>
                        <div style="display: flex;">
                            <h4>Total:</h4>
                            <h4 style="margin-left: auto;">Gratis</h4>
                        </div>
                    `;
                }
            })
            .catch(err => console.error("Error loading course:", err))
            .finally(() => {
                setTimeout(() => {
                    loadingScreen.classList.add("fade-out");
                    setTimeout(() => {
                        loadingScreen.style.display = "none";
                        checkoutContent.style.visibility = "visible";
                        checkoutContent.style.opacity = "1";
                    }, 500);
                }, 1500);
            });
    }

    const STORAGE_KEY = "courses_order";

    function tambahKursus(user, kursusBaru) {
        let data = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
        let existingUser = data.find(u => u.user === user);

        if (existingUser) {
            if (existingUser.kursus.includes(kursusBaru)) {
                showPopup(`
                    <div style="font-size: 64px; color: red; margin-bottom: 20px;">⚠</div>
                    <h2>Oops!</h2>
                    <p>Anda sudah membeli produk ini</p>
                    <button id="popupRedirect" style="
                        margin-top: 20px; 
                        padding: 10px 20px; 
                        border: none; 
                        border-radius: 6px; 
                        background: #1369ff; 
                        color: white; 
                        cursor: pointer;
                        z-index: 99999;
                    ">
                        Kembali ke Kursus
                    </button>
                `, "kursus.html");
                return false;
            } else {
                existingUser.kursus.push(kursusBaru);
            }
        } else {
            data.push({
                user: user,
                kursus: [kursusBaru]
            });
        }

        localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
        return true;
    }

    placeOrderBtn.addEventListener("click", (e) => {
        e.preventDefault();

        const loggedInUser = JSON.parse(sessionStorage.getItem("loggedInUser"));
        const currentUser = loggedInUser ? loggedInUser.username : null;

        if (!sessionStorage.getItem("Authenticated") || !currentUser) {
            alert("Silakan login terlebih dahulu!");
            return;
        }

        const success = tambahKursus(currentUser, kursusKey);
        if (!success) return;

        loadingScreen.classList.add("fade-out");

        showPopup(`
            <div style="font-size: 64px; color: limegreen; margin-bottom: 20px;">✓</div>
            <h2>Pembelian Berhasil!</h2>
            <button id="popupRedirect" style="
                margin-top: 20px; 
                padding: 10px 20px; 
                border: none; 
                border-radius: 6px; 
                background: #1369ff; 
                color: white; 
                cursor: pointer;
                z-index: 99999;
            ">
                Kembali ke Dashboard
            </button>
        `, "dashboard.html");
    });
});