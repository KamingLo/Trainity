let originalData = {};

fetch("./db/database.json")
    .then(res => res.json())
    .then(data => {
        originalData = data;
        renderCards(data);
    })
    .catch(err => console.error("Error fetching data:", err));