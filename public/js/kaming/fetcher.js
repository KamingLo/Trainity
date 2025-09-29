fetch("./db/database.json")
    .then(res => res.json())
    .then(data => {
        renderCards(data);
    })
    .catch(err => console.error("Error fetching data:", err));

function renderCards(data) {
    const container = document.getElementById("content");
    container.innerHTML = "";
    container.classList= "cards"

    Object.keys(data).map(key => {
        const section = data[key];
        const card = document.createElement("div");
        card.classList.add("card");
        card.id = "card";
        card.innerHTML = `
            <img src="https://img.youtube.com/vi/${section.videos[0].link}/hqdefault.jpg" alt="Foto Default ${key}">
            <h3>${key}</h3>
            <div>
                <p>${section.short_description}</>
            </div>
            <a href="./checkout.html?key=${key}">Beli Kursus</a>
        `;

        container.appendChild(card);
    });
}
