document.getElementById("search").addEventListener("input", (e) => {
    const query = e.target.value.toLowerCase();
    const filtered = Object.keys(originalData)
        .filter(key => 
            key.toLowerCase().includes(query) ||
            originalData[key].short_description.toLowerCase().includes(query)
        )
        .reduce((obj, key) => {
            obj[key] = originalData[key];
            return obj;
        }, {});
    
    renderCards(filtered);
});
