document.addEventListener('DOMContentLoaded', () => {
    // ambil elemen tombol tab 
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    // memberikan event listener pada tombol tab
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabPanes.forEach(pane => pane.classList.remove('active'));

            // menambahkan 'active' ke button jika baru di klik oleh pengguna
            button.classList.add('active');

            const targetPane = document.querySelector(button.dataset.target);
            if (targetPane) {
                // tampilkan panel tab nya sesuai denganyang di click
                targetPane.classList.add('active');
            }
        });
    });
});