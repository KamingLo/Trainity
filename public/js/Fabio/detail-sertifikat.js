document.addEventListener('DOMContentLoaded', function() {
    
    if (sessionStorage.getItem("Authenticated") !== "True") {
        window.location.href = "./login.html";
        return;
    }

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
        downloadBtn.textContent = 'Memproses...';
        downloadBtn.disabled = true;

        html2canvas(sertifikatContainer, { scale: 2 }).then(canvas => {
            const imageData = canvas.toDataURL('image/png');
            const { jsPDF } = window.jspdf;
            
            const doc = new jsPDF({
                orientation: 'landscape',
                unit: 'px',
                format: [sertifikatContainer.offsetWidth, sertifikatContainer.offsetHeight]
            });

            doc.addImage(imageData, 'PNG', 0, 0, sertifikatContainer.offsetWidth, sertifikatContainer.offsetHeight);
            const namaFile = `Sertifikat-${judulKursus.trim()}.pdf`;
            doc.save(namaFile);

            downloadBtn.innerHTML = "<i class='bx bxs-download'></i> Unduh PDF";
            downloadBtn.disabled = false;
        });
    });
});

