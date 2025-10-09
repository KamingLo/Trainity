document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const judulKursus = urlParams.get('key') || "Nama Kursus";

    const userDataString = sessionStorage.getItem('loggedInUser');
    let namaPeserta = "[Nama Peserta]";
    if (userDataString) {
        const user = JSON.parse(userDataString);
        namaPeserta = user.username;
    }

    const namaInstruktur = "Fabio";
    const tandaTanganUrl = "./public/assets/Signature.png";
    
    const tanggalLulus = new Date().toLocaleDateString('id-ID', {
        day: 'numeric', month: 'long', year: 'numeric'
    });

    const randomIdPart = Math.floor(10000 + Math.random() * 90000);
    const sertifikatId = `TRN-${judulKursus.toUpperCase().substring(0,4)}-${randomIdPart}`;
    const sertifikatContainer = document.getElementById('sertifikat-body');

    const sertifikatInnerHTML = `
        <div class="sertifikat-container-design">
            <div class="header-sertifikat">
                <img src="./public/assets/TrainityFullWhite.png" alt="Logo Trainity" class="logo-sertifikat">
                <p>CERTIFICATE OF COMPLETION</p>
            </div>
            <div class="content-sertifikat">
                <h2>INI DIBERIKAN KEPADA</h2>
                <h1 id="nama-peserta">${namaPeserta}</h1>
                <p class="kursus-desc">Atas keberhasilannya menyelesaikan kursus:</p>
                <p class="kursus-title" id="judul-kursus">${judulKursus}</p>
            </div>
            <div class="footer-sertifikat">
                <div class="signature">
                    <img id="tanda-tangan" src="${tandaTanganUrl}" alt="Tanda Tangan Instruktur">
                    <p id="nama-instruktur">${namaInstruktur}</p>
                    <span>Instruktur Utama Trainity</span>
                </div>
                <div class="date-id">
                    <p id="tanggal-lulus">Tanggal Kelulusan: ${tanggalLulus}</p>
                    <p id="sertifikat-id">ID Sertifikat: ${sertifikatId}</p>
                </div>
            </div>
            <div class="background-pattern"></div>
        </div>
    `;

    sertifikatContainer.innerHTML = sertifikatInnerHTML;

    const downloadBtn = document.getElementById('downloadBtn');
    downloadBtn.addEventListener('click', function() {
        const originalContent = downloadBtn.innerHTML;
        downloadBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Memproses...';
        downloadBtn.disabled = true;

        // Simpan transform scale sementara
        const originalTransform = sertifikatContainer.style.transform;
        const originalMargin = sertifikatContainer.style.margin;
        
        // Reset transform untuk capture yang tepat
        sertifikatContainer.style.transform = 'scale(1)';
        sertifikatContainer.style.margin = '0';
        sertifikatContainer.style.width = '1123px';
        sertifikatContainer.style.height = '794px';

        html2canvas(sertifikatContainer, { 
            scale: 2,
            useCORS: true,
            logging: false,
            width: 1123,
            height: 794,
            scrollX: 0,
            scrollY: 0
        }).then(canvas => {
            // Kembalikan transformasi
            sertifikatContainer.style.transform = originalTransform;
            sertifikatContainer.style.margin = originalMargin;
            sertifikatContainer.style.width = '';
            sertifikatContainer.style.height = '';

            const imageData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;

            const pdfWidth = canvas.width;
            const pdfHeight = canvas.height;
            
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [pdfWidth, pdfHeight]
            });

            doc.addImage(imageData, 'PNG', 0, 0, pdfWidth, pdfHeight);
            const namaFile = `Sertifikat-${judulKursus.replace(/\s+/g, '_')}.pdf`;
            doc.save(namaFile);

            downloadBtn.innerHTML = originalContent;
            downloadBtn.disabled = false;
        }).catch(error => {
            console.error('Error generating PDF:', error);
            alert('Terjadi error saat mengunduh sertifikat. Silakan coba lagi.');
            downloadBtn.innerHTML = originalContent;
            downloadBtn.disabled = false;
            
            // Kembalikan transformasi jika error
            sertifikatContainer.style.transform = originalTransform;
            sertifikatContainer.style.margin = originalMargin;
            sertifikatContainer.style.width = '';
            sertifikatContainer.style.height = '';
        });
    });
});