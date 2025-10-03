const container = document.getElementById("content");

function renderCards(data) {
    container.innerHTML = "";
    container.classList = "cards";

    Object.keys(data).forEach(key => {
        const section = data[key];
        let button;
        let order = localStorage.getItem("courses_order");
        if(order && sessionStorage.getItem("Authenticated") === "True") {
            for(let obj of JSON.parse(order)){
                if(obj.kursus.includes(key)){
                    button = `<p class="blocked">Kamu sudah punya kursus ini</p>`;
                } else{
                    button = `<a href="./checkout.html?key=${key}">Beli Kursus</a>`;
                }
            }
        };

        const card = document.createElement("div");
        card.classList.add("card");
        card.innerHTML = `
            <img src="https://img.youtube.com/vi/${section.videos[0].link}/hqdefault.jpg" alt="Foto Default ${key}">
            <h3>${key}</h3>
            <div>
                <p>${section.short_description}</p>
            </div>
            ${button}
        `;
        container.appendChild(card);
    });
}