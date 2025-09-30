const carousel = document.getElementById("carousel");

function renderCarousel(data){
    data.forEach(item => {
        const card = document.createElement("div");
        card.className = "carousel-card";

        card.innerHTML = `
            <button class="carousel-body" data="${item.link}">
                <img src="https://img.youtube.com/vi/${item.link}/hqdefault.jpg" alt="${item.title}">
                <h3>${item.title}</h3>
                <a href="#" class="btn-link">Klik disini</a>
            </button>
        `;
        carousel.appendChild(card);
    });

    Iframe(data[0].link);

    document.querySelectorAll(".carousel-body").forEach(btn => {
        btn.addEventListener("click", () => {
            const link = btn.getAttribute("data");
            renderIframe(link);
        });
    });
}

function Iframe(link){
    document.getElementById("video").innerHTML = `
        <iframe 
        id="youtube"
        width="560" 
        height="315" 
        src="https://www.youtube.com/embed/${link}" 
        title="YouTube video player" 
        frameborder="0" 
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
        allowfullscreen>
        </iframe>
    `;
}

function renderIframe(link){
    console.log("this one",link);

    document.getElementById("youtube").setAttribute(
        "src", 
        `https://www.youtube.com/embed/${link}`
    );
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