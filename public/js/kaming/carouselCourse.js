const carousel = document.getElementById("carousel");

function renderCarousel(data, key){
    
    const certificate = document.createElement("div");
    certificate.className = "carousel-card";
    console.log(data);
    certificate.innerHTML = `
            <div class="carousel-body" data-link="certificate">
                <img src="https://img.youtube.com/vi/${data.videos[0].link}/hqdefault.jpg">
                <h3>Ambil Sertifikat ${key}</h3>
                <a class="btn-link" href="sertifikat.html?key=${key}">Klik disini</a>
            </div>
    `;
    
    data.videos.forEach(item => {
        const card = document.createElement("div");
        card.className = "carousel-card";
        console.log("ini terpanggil");
        card.innerHTML = `
            <button class="carousel-body" data-link="${item.link}" data-title="${item.title}" >
                <img src="https://img.youtube.com/vi/${item.link}/hqdefault.jpg" alt="${item.title}">
                <h3>${item.title}</h3>
                <a class="btn-link">Klik disini</a>
            </button>
        `;
        carousel.appendChild(card);
    });

    carousel.appendChild(certificate);

    Iframe(data.videos[0].link);
    renderDetail(data, data.videos[0].title);
    
    
    document.querySelectorAll(".carousel-body").forEach(btn => {
        btn.addEventListener("click", () => {
            const link = btn.getAttribute("data-link");
            console.log(link);
            if(link == "certificate"){
                window.location.href = `sertifikat.html?key=${key}`;
            }

            const title = btn.getAttribute("data-title");
            renderDetail(data, title);
            renderIframe(link);
        });
    });
}

const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");

const cardWidth = 300;

prevBtn.addEventListener("click", () => {
carousel.scrollBy({ left: -cardWidth, behavior: "smooth" });
});

nextBtn.addEventListener("click", () => {
carousel.scrollBy({ left: cardWidth, behavior: "smooth" });
});