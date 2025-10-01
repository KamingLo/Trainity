const carousel = document.getElementById("carousel");

function renderCarousel(data){
    data.videos.forEach(item => {
        const card = document.createElement("div");
        card.className = "carousel-card";

        card.innerHTML = `
            <button class="carousel-body" data-link="${item.link}" data-title="${item.title}" >
                <img src="https://img.youtube.com/vi/${item.link}/hqdefault.jpg" alt="${item.title}">
                <h3>${item.title}</h3>
                <a class="btn-link">Klik disini</a>
            </button>
        `;
        carousel.appendChild(card);
    });

    Iframe(data.videos[0].link);
    renderDetail(data, data.videos[0].title);
    
    
    document.querySelectorAll(".carousel-body").forEach(btn => {
        btn.addEventListener("click", () => {
            const link = btn.getAttribute("data-link");
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