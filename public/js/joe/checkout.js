document.addEventListener("DOMContentLoaded", () => {
    const methods = document.querySelectorAll(".payment-method");
    const placeOrderBtn = document.getElementById("place-order");
    const agreeCheckbox = document.getElementById("agree-checkbox");
    const loadingScreen = document.getElementById("loading-screen");
    const checkoutContent = document.querySelector(".checkout-container");

    // Mapping harga kursus
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

    // === Payment methods ===
    methods.forEach(method => {
        const checkbox = method.querySelector(".payment-check");
        const body = method.querySelector(".payment-body");
        const input = method.querySelector(".payment-input");

        if (!checkbox) return;

        checkbox.addEventListener("change", () => {
            if (checkbox.checked) {
                // reset semua
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

    // === Voucher langsung aktif saat load ===
    const voucherMethod = Array.from(methods).find(
        m => m.querySelector("img")?.alt === "FREE"
    );
    if (voucherMethod) {
        const voucherCheckbox = voucherMethod.querySelector(".payment-check");
        voucherCheckbox.checked = true;
        voucherCheckbox.addEventListener("click", e => e.preventDefault()); // cegah uncheck

        voucherMethod.classList.add("active");
        const voucherBody = voucherMethod.querySelector(".payment-body");
        if (voucherBody) voucherBody.style.display = "block";
        activeMethod = voucherMethod;

        // disable payment lain
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

    // === Ambil data kursus dari URL ===
    const params = new URLSearchParams(window.location.search);
    const kursusKey = params.get("key");

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

                    // ambil harga berdasarkan key
                    const price = coursePrices[kursusKey] || 0;

                    // update order details
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
                // kasih delay + animasi fade
                setTimeout(() => {
                    loadingScreen.classList.add("fade-out");
                    setTimeout(() => {
                        loadingScreen.style.display = "none";
                        // FIX: Gunakan visibility atau class, jangan ubah display
                        checkoutContent.style.visibility = "visible";
                        checkoutContent.style.opacity = "1";
                    }, 500); // waktu fade
                }, 1500); // delay loading 1.5 detik
            });
    } else {
        loadingScreen.style.display = "none";
        checkoutContent.style.visibility = "visible";
        checkoutContent.style.opacity = "1";
    }

    // === Event Place Order (Pop-out) ===
    placeOrderBtn.addEventListener("click", (e) => {
        e.preventDefault();

        // buat / ambil pop-up
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

        // tampilan loading
        popupContent.innerHTML = `
            <div class="anim"></div>
            <p>Pembelian anda sedang diproses</p>
        `;

        // simulasi loading 2 detik → ganti ke sukses
        setTimeout(() => {
            const style = document.createElement("style");
            style.textContent = `
            #backToKursus {
                transition: background 0.3s ease;
            }
            #backToKursus:hover {
                background: #0f4ecf !important;
            }
            `;
            document.head.appendChild(style);

            popupContent.innerHTML = `
                <div style="font-size: 64px; color: limegreen; margin-bottom: 20px;">✓</div>
                <h2>Pembelian Berhasil!</h2>
                <button id="backToKursus" style="
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
            `;

            document.getElementById("backToKursus").addEventListener("click", () => {
                window.location.href = "kursus.html";
            });
        }, 2000);
    });
});