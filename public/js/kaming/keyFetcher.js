let originalData = {};
const params = new URLSearchParams(window.location.search);

let key = params.get("key");

if(key !== null){
    fetch("./db/database.json")
    .then(res => res.json())
    .then(data => {
        renderCarousel(data[key], key);
    })
    .catch(err => console.error("Error fetching data:", err));
}