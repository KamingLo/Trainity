document.addEventListener('DOMContentLoaded', function() {
    
    if (sessionStorage.getItem("authenticated") !== "true") {
        window.location.href = "./login.html";
        return;
    }
    
    /* CATATAN PENTING:
    Kode di bawah ini mengasumsikan bahwa di halaman login/kursus,
    teman Anda sudah menyimpan data sertifikat ke sessionStorage seperti ini:

    const sertifikatInfo = {
        namaPeserta: "Fabio",
        judulKursus: "Dasar-Dasar HTML & CSS",
        namaInstruktur: "Kaming Lo",
        tandaTanganUrl: "https://via.placeholder.com/150x50/FFFFFF/000000?text=K.Lo",
        tanggalLulus: "02 Oktober 2025",
        sertifikatId: "TRN-HTML-54321"
    };
    sessionStorage.setItem('sertifikatDetail', JSON.stringify(sertifikatInfo));
    */

    const dataString = sessionStorage.getItem('sertifikatDetail');
    if (dataString) {
        const data = JSON.parse(dataString);

        document.getElementById('nama-peserta').textContent = data.namaPeserta;
        document.getElementById('judul-kursus').textContent = data.judulKursus;
        document.getElementById('nama-instruktur').textContent = data.namaInstruktur;
        document.getElementById('tanda-tangan').src = data.tandaTanganUrl;
        document.getElementById('tanggal-lulus').textContent = `Tanggal Kelulusan: ${data.tanggalLulus}`;
        document.getElementById('sertifikat-id').textContent = `ID Sertifikat: ${data.sertifikatId}`;
    } else {
        document.getElementById('nama-peserta').textContent = "DATA TIDAK DITEMUKAN";
        document.getElementById('judul-kursus').textContent = "Silakan kembali ke halaman kursus.";
    }

    const downloadBtn = document.getElementById('downloadBtn');
    const sertifikatElement = document.getElementById('sertifikat-body');

    downloadBtn.addEventListener('click', function() {
        downloadBtn.textContent = 'Memproses...';
        downloadBtn.disabled = true;

        // Gunakan html2canvas untuk "memfoto" elemen sertifikat
        html2canvas(sertifikatElement, { scale: 2 }).then(canvas => {
            // Dapatkan data gambar dari hasil "foto"
            const imageData = canvas.toDataURL('image/png');
            
            // Siapkan library jsPDF
            const { jsPDF } = window.jspdf;
            
            // Buat dokumen PDF dengan ukuran sama persis seperti elemen sertifikat
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [sertifikatElement.offsetWidth, sertifikatElement.offsetHeight]
            });

            // Tambahkan gambar ke PDF dan simpan
            doc.addImage(imageData, 'PNG', 0, 0, sertifikatElement.offsetWidth, sertifikatElement.offsetHeight);
            const namaFile = `Sertifikat-${document.getElementById('judul-kursus').textContent.trim()}.pdf`;
            doc.save(namaFile);

            // Kembalikan tombol ke keadaan semula
            downloadBtn.innerHTML = "<i class='bx bxs-download'></i> Unduh PDF";
            downloadBtn.disabled = false;
        });
    });
});
