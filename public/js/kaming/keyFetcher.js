let originalData = {};
const params = new URLSearchParams(window.location.search);

let key = params.get("key");

if(key !== null){
    fetch("./db/database.json")
    .then(res => res.json())
    .then(data => {
        console.log(key);
        console.log(data[key].videos);
        renderCarousel(data[key].videos);
    })
    .catch(err => console.error("Error fetching data:", err));
}